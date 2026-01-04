import { ActionColumn } from '@/components/DataGridCommon/ActionConfig';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import RenderHTML from '@/components/DataGridCommon/RenderHTML';
import TextFieldCustomDataGrid from '@/components/DataGridCommon/TextFieldCustomDataGrid';
import { readStateFromStorage, STORAGE_NAMESPACE, writeStateToStorage } from '@/utils/MetodosAuxiliares';

import {
  Column,
  FilteringState,
  IntegratedPaging,
  PagingState,
  CustomPaging, // ✅ NUEVO
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

// ✅ NUEVO (Opcional)
type PaginationInfo = {
  totalItems: number;
  pageNumber: number; // 1-based (API)
  pageSize: number;
};

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

  // ✅ NUEVO (Opcional): paginación remota
  pagination?: PaginationInfo;
  onPaginationChange?: (pageNumber: number, pageSize: number) => void;
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
  backgroundColor: theme.palette.grey[200],
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 8px',
  textAlign: align,
}));

const StyledTableCell = styled(Table.Cell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 8px',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  fontSize: '0.875rem',
}));

const StyledTableRow = styled(Table.Row)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
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
  gridId = "",

  // ✅ NUEVO
  pagination,
  onPaginationChange,
}: Props<T>) => {

  // ✅ remoto solo si vienen los 2
  const isRemotePagination = !!pagination && typeof onPaginationChange === 'function';

  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0); // 0-based en UI
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState<any[]>([]);
  const [filteredRowsNumber, setFilteredRowsNumber] = useState<any[]>([]);

  // ✅ para evitar múltiples restores
  const restoredOnceRef = useRef(false);

  // ✅ Valores efectivos: si es remoto, manda el backend
  const effectiveCurrentPage = isRemotePagination
    ? Math.max((pagination?.pageNumber ?? 1) - 1, 0)
    : currentPage;

  const effectivePageSize = isRemotePagination
    ? (pagination?.pageSize ?? 5)
    : pageSize;

  const totalCount = isRemotePagination
    ? (pagination?.totalItems ?? 0)
    : filteredRowsNumber.length;

  const columnVisible = useMemo(() => {
    const visible = columns.filter(col => !columsHide.includes(col.name));
    if (!addNumeration) return visible;

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
  }, [columns, columsHide, addNumeration, widthNumeration]);

  const updateFilteredRows = (rowsData: any[]) => {
    rowsData = Array.isArray(rowsData) ? rowsData : [];

    let rowsNumbered: any[] = [];

    if (filters.length === 0) {
      rowsNumbered = rowsData.map((row, index) => ({ rowNumber: index + 1, ...row }));
    }

    if (filters.length > 0) {
      filters.forEach(filter => {
        rowsNumbered = rowsData.filter(row =>
          String(row[filter.columnName])
            .toLowerCase()
            .includes(String(filter.value ?? '').toLowerCase())
        );
        rowsData = rowsNumbered;
      });
    } else {
      rowsNumbered = rowsData;
    }

    rowsNumbered = rowsNumbered.map((row, index) => ({ rowNumber: index + 1, ...row }));
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
        if (typeof action.hidden === 'function') return !action.hidden(row);
        return !action.hidden;
      });

      return (
        <Table.Cell {...props} style={commonStyle} key={`row-${Math.random()}`}>
          <ActionColumn row={row} actions={filteredActions} />
        </Table.Cell>
      );
    }

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

  // ✅ RESTORE: igual que tu lógica, pero si es remoto dispara fetch
  useEffect(() => {
    if (!maintainFilter) return;
    if (!rows) return;
    if (restoredOnceRef.current) return;
    restoredOnceRef.current = true;

    type Persisted = { filters?: any[]; pageSize?: number; currentPage?: number };
    const restored = readStateFromStorage<Persisted>(storageKey);

    const restoredPage = restored?.currentPage ?? 0;
    const restoredFilters = restored?.filters ?? [];
    const restoredPageSize = restored?.pageSize ?? 5;

    setFilters(restoredFilters);

    if (isRemotePagination) {
      // remoto: pedir al backend lo restaurado
      onPaginationChange?.(restoredPage + 1, restoredPageSize);
    } else {
      setCurrentPage(restoredPage);
      setPageSize(restoredPageSize);
    }
  }, [maintainFilter, storageKey, isRemotePagination, onPaginationChange, rows]);

  const handleFilterChange = useCallback((values: any[]) => {
    const nextFilters = (values ?? []).filter(f => f && f.value != null && String(f.value).trim() !== "");
    const nextPage = 0;

    onChangeFilters?.(nextFilters);
    setFilters(nextFilters);

    // ✅ guardar SIEMPRE (tu lógica pero ahora también remoto)
    if (maintainFilter) {
      writeStateToStorage(storageKey, { filters: nextFilters, pageSize: effectivePageSize, currentPage: nextPage });
    }

    // reset paginación
    if (isRemotePagination) {
      onPaginationChange?.(1, effectivePageSize);
    } else {
      setCurrentPage(nextPage);
    }

    updateFilteredRows(rows);
  }, [rows, storageKey, onChangeFilters, maintainFilter, isRemotePagination, onPaginationChange, effectivePageSize]);

  const guardarPaginacion = useCallback((page: number) => {
    // ✅ guardar SIEMPRE (local y remoto)
    if (maintainFilter) {
      writeStateToStorage(storageKey, { filters, pageSize: effectivePageSize, currentPage: page });
    }

    if (isRemotePagination) {
      onPaginationChange?.(page + 1, effectivePageSize);
      return;
    }

    setCurrentPage(page);
  }, [filters, storageKey, maintainFilter, isRemotePagination, onPaginationChange, effectivePageSize]);

  const onPageSizeChange = useCallback((size: number) => {
    const nextPage = 0;

    // ✅ guardar SIEMPRE (local y remoto)
    if (maintainFilter) {
      writeStateToStorage(storageKey, { filters, pageSize: size, currentPage: nextPage });
    }

    if (isRemotePagination) {
      onPaginationChange?.(1, size);
      return;
    }

    setPageSize(size);
    setCurrentPage(nextPage);
  }, [filters, storageKey, maintainFilter, isRemotePagination, onPaginationChange]);

  const FilterCellComponent = useMemo(() => {
    return (props: any) => {
      const { column, filter } = props;

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
              currentPage={effectiveCurrentPage}
              onCurrentPageChange={guardarPaginacion}
              pageSize={effectivePageSize}
              onPageSizeChange={onPageSizeChange}
            />
          )}

          {/* ✅ LOCAL: igual que antes */}
          {hasPagination && !isRemotePagination && <IntegratedPaging />}

          {/* ✅ REMOTO: usa totalCount */}
          {hasPagination && isRemotePagination && <CustomPaging totalCount={totalCount} />}

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
