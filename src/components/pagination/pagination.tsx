import React from "react";

const Pagination = (props: any) => {
  const { page, totalPages, previousHandler, nextHandler } = props;
  return (
    <div>
      {page > 1 ? (
        <button className="page-buttons" onClick={previousHandler}>
          Previous
        </button>
      ) : (
        <></>
      )}{" "}
      <span className="page-num"> {page}</span>
      {page < totalPages ? (
        <button className="page-buttons" onClick={nextHandler}>
          Next
        </button>
      ) : (
        <></>
      )}
      <span className="text-muted">Total {totalPages} Pages</span>
    </div>
  );
};
export default React.memo(Pagination);
