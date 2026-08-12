import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({
  currentPage,
  setCurrentPage,
  setCallApi,
  totalPage,
  handlePageClick,
}) => {
  return (
    <>
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={currentPage <= 1} className="page-item">
          <PaginationLink
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              setCallApi(true);
            }}
            first
            href="javascript:void(0);"
          />
        </PaginationItem>

        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage - 1);
              setCallApi(true);
            }}
            previous
            href="javascript:void(0);"
          />
        </PaginationItem>
        {[...Array(totalPage)]?.map((page, i) => (
          <PaginationItem
            className="page-item"
            active={i === currentPage - 1}
            key={i}
          >
            <PaginationLink
              className="page-link"
              onClick={(e) => handlePageClick(e, i)}
              href="javascript:void(0);"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          disabled={currentPage >= totalPage}
          className="page-item"
        >
          <PaginationLink
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage + 1);
              setCallApi(true);
            }}
            next
            href="javascript:void(0);"
          />
        </PaginationItem>
        <PaginationItem
          disabled={currentPage >= totalPage}
          className="page-item"
        >
          <PaginationLink
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(totalPage);
              setCallApi(true);
            }}
            last
            href="javascript:void(0);"
          />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default PaginationComponent;
