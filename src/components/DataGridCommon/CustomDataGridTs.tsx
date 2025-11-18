import { ActionColumn } from '@/components/DataGridCommon/ActionConfig';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import RenderHTML from '@/components/DataGridCommon/RenderHTML';
import TextFieldCustomDataGrid from '@/components/DataGridCommon/TextFieldCustomDataGrid';
import { readStateFromStorage, STORAGE_NAMESPACE, writeStateToStorage } from '@/utils/MetodosAuxiliares';

import {
  Column,
  FilteringState,
  IntegratedPaging,
  PagingState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableFilterRow,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface ColumnExtension {
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface StyledTableHeaderCellProps {
  align?: 'left' | 'center' | 'right';
}

interface ColumnExtended extends Column {
  fontSize?: string;
}
interface Props<T = any> {
  rows: T[];
  columns: Column[];
  getRowId?: (row: T) => string | number;
  columsHide?: string[];
  actions?: IActionConfig<T>[];
  hiddenFilterColumn?: string[];
  onChangeFilters?: <T>(filter: T[]) => void | undefined;
  gridId: string;
  titleEmptyTable?: string;
  iconDirectionFilter?: 'start' | 'end';
  heightBodyEmptyData?: string;
  hasPagination?: Boolean;
  addNumeration?: Boolean;
  hasFilters?: Boolean;
  searchLabel?: String;
  widthNumeration?: string;
  maintainFilter?: boolean;
}

const StyledTableHeaderCell = styled(
  TableHeaderRow.Cell
)<StyledTableHeaderCellProps>(({ theme, align = 'left' }) => ({
  fontWeight: 'bold',
  backgroundColor: 'white',
  padding: '12px 0px',
  textAlign: align,

  '& .Title-title': {
    display: 'flex',
    alignItems: align,
    justifyContent: align,
    width: '100%'
  }
}));

const FilterCell = (props: any) => {
  const { column } = props;
  if (column?.hiddenFilterColumn) {
    return (
      <Table.Cell
        value={null}
        row={props.row}
        column={props.column}
        tableRow={props.tableRow}
        tableColumn={props.tableColumn}
        style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
      />
    );
  }

  return (
    <TableFilterRow.Cell
      {...props}
      style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
    >
      <TextFieldCustomDataGrid {...props} />
    </TableFilterRow.Cell>
  );
};

const LoadingContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  zIndex: 10,
});

const StyledHeaderCell = styled(TableHeaderRow.Cell)(({ theme, align }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200], // Color de fondo sutil y profesional
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 8px',
  textAlign: align,
}));

const StyledTableCell = styled(Table.Cell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`, // Borde sutil entre filas
  padding: '12px 8px', // Espaciado consistente
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  fontSize: '0.875rem',
}));

const StyledTableRow = styled(Table.Row)(({ theme }) => ({
  // Efecto Zebra para mejor legibilidad
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Efecto Hover para interactividad
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
}));


const CustomDataGridTs = <T,>({
  rows,
  columns,
  getRowId,
  columsHide = [],
  actions = [],
  titleEmptyTable = 'Tabla sin datos',
  heightBodyEmptyData = '',
  onChangeFilters = () => { },
  hasPagination = true,
  addNumeration = false,
  hasFilters = true,
  searchLabel = '',
  widthNumeration = '65px',
  maintainFilter = false,
  gridId = ""
}: Props<T>) => {
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([]);
  const [filteredRowsNumber, setFilteredRowsNumber] = useState<any[]>([]);

  const columnVisible = useMemo(() => {
    const visible = columns.filter(col => !columsHide.includes(col.name));
    if (!addNumeration) {
      return visible;
    }
    return [
      {
        name: 'rowNumber',
        title: 'Nro.',
        width: widthNumeration,
        hiddenFilterColumn: true,
        align: 'right'
      },
      ...visible
    ];
  }, [columns, columsHide]);

  const updateFilteredRows = (rowsData: any[]) => {
    let rowsNumbered = [];
    if (filters.length === 0) {
      rowsNumbered = rowsData.map((row, index) => {
        const rowNumbered = { rowNumber: index + 1, ...row };
        return rowNumbered;
      });
    }
    if (filters.length > 0) {
      filters.forEach(filter => {
        rowsNumbered = rowsData.filter(row =>
          String(row[filter.columnName])
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        );
        rowsData = rowsNumbered;
      });
    } else {
      rowsNumbered = rowsData;
    }

    rowsNumbered = rowsNumbered.map((row, index) => {
      return { rowNumber: index + 1, ...row };
    });

    setFilteredRowsNumber(rowsNumbered);
  };

  useEffect(() => {
    updateFilteredRows(rows);
  }, [rows, filters]);

  const columnExtensions = useMemo(() => {
    return columnVisible.map(column => {
      const columnWithExtension = column as Column & ColumnExtension;
      return {
        columnName: column.name,
        width: columnWithExtension.width || 'auto',
        align: columnWithExtension.align || 'left',
        wordWrapEnabled: true,
      };
    });
  }, [columnVisible]);



  const CustomHeaderCell = (props: any) => {
    const { column } = props;
    const align = column.alignHeader || 'left';
    const fontSizeHeader = column.fontSizeHeader || '14px';

    return (
      <StyledTableHeaderCell
        {...props}
        align={align}
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #ccc',
          textAlign: align,
          fontSize: fontSizeHeader
        }}
      />
    );
  };

  const ActionCell = (props: any) => {
    const { column, row, value } = props;

    const columnDef = columnVisible.find(
      c => c.name === column.name
    ) as ColumnExtended;

    const commonStyle = {
      fontSize: columnDef?.fontSize || '13px',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      padding: '8px'
    };

    if (column.name === 'actions') {
      const filteredActions = actions.filter(action => {
        if (typeof action.hidden === 'function') {
          return !action.hidden(row);
        }
        return !action.hidden;
      });

      return (
        <Table.Cell {...props} style={commonStyle} key={`row-${Math.random()}`}>
          <ActionColumn row={row} actions={filteredActions} />
        </Table.Cell>
      );
    }

    // 👇 Usar el valor que viene de DevExpress (ya con getCellValue aplicado)
    const cellValue = value ?? row[column.name];
    const containsHTML =
      typeof cellValue === 'string' && /<[a-z][\s\S]*>/i.test(cellValue);

    return (
      <Table.Cell {...props} style={commonStyle}>
        {containsHTML ? <RenderHTML html={cellValue} /> : cellValue}
      </Table.Cell>
    );
  };

  const theme = useTheme();

  theme.components.MuiTable = {
    styleOverrides: {
      root: {
        '& thead .MuiTableCell-head': {
          backgroundColor: '#e8e8e8',
          border: 'none',
          fontSize: 'clamp(0.825rem, 0.650rem + 0.25vi, 2.75rem) !important',
          fontWeight: 'bold'
        },
        ...(heightBodyEmptyData && {
          '& .TableNoDataCell-text': {
            padding: `${heightBodyEmptyData} 0 !important`,
            fontSize: 'clamp(0.625rem, 0.596rem + 0.29vi, 2.75rem) !important'
          }
        })
      }
    }
  };

  theme.components.MuiTableCell = {
    styleOverrides: {
      body: {
        fontSize: 'clamp(0.625rem, 0.594rem + 0.25vi, 2.75rem) !important',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        padding: '8px'
      }
    }
  };

  theme.components.MuiInputLabel = {
    styleOverrides: {
      root: {
        fontSize: 'clamp(0.625rem, 0.594rem + 0.25vi, 2.75rem) !important',
        top: '0px',
        marginTop: '8px'
      }
    }
  };


  const storageKey = useMemo(() => `${STORAGE_NAMESPACE}:${gridId}`, [gridId]);

  const handleFilterChange = useCallback((values: any[]) => {
    const nextFilters = (values ?? []).filter(f => f && f.value != null && String(f.value).trim() !== "");
    const nextPage = 0;

    onChangeFilters?.(nextFilters);
    setFilters(nextFilters);
    setCurrentPage(nextPage);
    if (maintainFilter) {
      writeStateToStorage(storageKey, { filters: nextFilters, pageSize, currentPage: nextPage });
    }
    updateFilteredRows(rows);
  }, [pageSize, rows, storageKey, onChangeFilters]);


  const guardarPaginacion = useCallback((page: number) => {
    if (maintainFilter) {
      writeStateToStorage(storageKey, { filters, pageSize, currentPage: page });
    }
    setCurrentPage(page);
  }, [filters, pageSize, storageKey]);

  const onPageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    if (maintainFilter) {
      writeStateToStorage(storageKey, { filters, pageSize: size, currentPage });
    }
  }, [filters, currentPage, storageKey]);


  useEffect(() => {
    if (rows.length > 0 && maintainFilter) {
      type Persisted = { filters?: any[]; pageSize?: number; currentPage?: number };
      const restored = readStateFromStorage<Persisted>(storageKey);
      setCurrentPage(restored?.currentPage ?? 0);
      setFilters(restored?.filters ?? [])
      setPageSize(restored?.pageSize ?? 5);
    }
  }, [rows]);


  const FilterCellComponent = useMemo(() => {
    return (props: any) => {
      const { column, value, filter } = props;

      if (column?.hiddenFilterColumn) {
        return (
          <Table.Cell
            value={filter?.value ?? ''}
            row={props.row}
            column={props.column}
            tableRow={props.tableRow}
            tableColumn={props.tableColumn}
            style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
          />
        );
      }

      return (
        <TableFilterRow.Cell
          {...props}
          style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
        >
          <TextFieldCustomDataGrid {...props} searchLabel={searchLabel} />
        </TableFilterRow.Cell>
      );
    };
  }, [searchLabel]);



  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ padding: 0, width: '100%' }}>
        <Grid
          rows={filteredRowsNumber}
          columns={columnVisible}
          getRowId={getRowId || (row => (row as any).id)}
        >
          {hasFilters && (
            <FilteringState
              defaultFilters={[]}
              filters={filters}
              onFiltersChange={handleFilterChange}
            />
          )}

          {hasPagination && (
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={guardarPaginacion}
              pageSize={pageSize}
              onPageSizeChange={onPageSizeChange}
            />
          )}
          {hasPagination && <IntegratedPaging />}

          <Table
            cellComponent={ActionCell}
            columnExtensions={columnExtensions}
            messages={{ noData: titleEmptyTable }}
          />
          <TableHeaderRow cellComponent={CustomHeaderCell} />
          {hasFilters && (
            <TableFilterRow
              iconComponent={SearchIcon}
              cellComponent={FilterCellComponent}
            />
          )}
          {hasPagination && (
            <PagingPanel pageSizes={pageSizes} messages={{ rowsPerPage: '' }} />
          )}
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default CustomDataGridTs;
