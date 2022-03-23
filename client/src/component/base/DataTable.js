import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";

const DataTable = styled(DataGrid)({
  border: 0,
  padding: 0,
  ".MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
    "&:focus": {
      outline: "none",
    },
  },
  ".MuiDataGrid-cell--withRenderer": {
    display: "block",
    ".number.current": {
      display: "none",
    },
    ".play": {
      display: "none",
    },
    ".current": {
      display: "initial",
    },
  },
  ".MuiDataGrid-row:hover": {
    ".number": {
      display: "none",
      "&.noPreview": { display: "initial" },
    },
    ".play": {
      display: "initial",
    },
  },

  // ".MuiDataGrid-row.Mui-selected": {
  //   ".number": {
  //     display: "none",
  //   },
  //   ".play": {
  //     display: "initial",
  //   },
  // },
});

export default DataTable;
