import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface Props {
  itemsPerPage: number;
  ItemsComponent: React.FC<any>;
  pageCount: number;
  dispatchAction: Function;
  filter?: string;
  setFilter?: Function;
  setItemsPerPage?: Function;
}

const PagintedItems: React.FC<Props> = ({
  itemsPerPage,
  setFilter,
  ItemsComponent,
  pageCount,
  dispatchAction,
  filter,
  setItemsPerPage,
}) => {
  const [initialPage, setInitialPage] = useState(0);
  const handlePageClick = (event: { selected: number }) => {
    setInitialPage(event.selected);
    dispatchAction && dispatchAction(event.selected + 1);
  };
  useEffect(() => {
    if (initialPage + 1 > Math.ceil(pageCount / itemsPerPage)) {
      setInitialPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.ceil(pageCount / itemsPerPage)]);

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <div className="pagination-container">
        <ItemsComponent
          setFilter={setFilter}
          filter={filter}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          page={initialPage + 1}
        />
        <div className="d-flex mt-3 justify-content-end">
          <ReactPaginate
            nextLabel={
              <i
                style={{ marginTop: "2px" }}
                className="icon dripicons-chevron-right"
              ></i>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(pageCount / itemsPerPage) || 1}
            previousLabel={
              <i
                style={{ marginTop: "2px" }}
                className="icon dripicons-chevron-left"
              ></i>
            }
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            forcePage={initialPage}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            marginPagesDisplayed={2}
            // disableInitialCallback={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PagintedItems;
