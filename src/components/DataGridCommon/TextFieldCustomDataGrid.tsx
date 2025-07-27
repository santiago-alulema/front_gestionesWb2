import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

interface TextFieldCustomDataGridProps extends TableFilterRow.CellProps {
  column: any;
  filter: any;
  onFilter: any;
  searchLabel?: String;
}

const TextFieldCustomDataGrid = (props: TextFieldCustomDataGridProps) => {
  const { column, filter, onFilter, searchLabel = '' } = props;
  const handleChange = (value: any) => {
    onFilter({
      ...filter,
      value: value
    });
  };
  return (
    <TextField
      variant="outlined"
      size="small"
      label={searchLabel}
      onChange={({ target }) => {
        handleChange(target.value);
      }}
      fullWidth
      InputProps={{
        [column?.iconPosition === 'start' ? 'startAdornment' : 'endAdornment']:
          <SearchIcon fontSize="small" color="action" />
      }}
      InputLabelProps={{
        sx: {
          left: column?.iconPosition === 'start' ? '20px' : '3px',
          top: '2.5px',
          color: 'text.secondary',
          transition: 'all 0.2s',
          '&.Mui-focused, &.MuiFormLabel-filled': {
            top: '1px',
            left: '5px',
            fontSize: '0.75rem',
            display: 'block'
          }
        }
      }}
      sx={{
        padding: 1,
        '& .MuiOutlinedInput-root': {
          paddingLeft: '1px',
          '& input': {
            paddingLeft: column?.iconPosition === 'start' ? '16px' : '5px'
          }
        },
        '& .MuiOutlinedInput-notchedOutline': {
          '& legend': {
            marginLeft: '1px',
            '& span': {
              paddingLeft: '2px',
              paddingRight: '2px'
            }
          }
        }
      }}
    />
  );
};

export default TextFieldCustomDataGrid;
