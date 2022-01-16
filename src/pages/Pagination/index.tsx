import React from "react";
import Pagination from "@mui/material/Pagination";

interface IProps {
  pageCount: number;
  currentPage: number;
  updatePage: (page: number) => void;
}

const AppPagination: React.FC<IProps> = ({
  pageCount,
  currentPage,
  updatePage,
}) => {
  return (
    <Pagination
      count={pageCount}
      variant="outlined"
      shape="rounded"
      size="small"
      page={currentPage}
      onChange={(e, page) => updatePage(page)}
    />
  );
};

export default AppPagination;
