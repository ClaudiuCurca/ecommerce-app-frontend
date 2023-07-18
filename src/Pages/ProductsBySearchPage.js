import React, { useEffect, useState } from "react";
import PriceFilter from "./Components/PriceFilter";
import RatingFilter from "./Components/RatingFilter";
import CategoryFilter from "./Components/CategoryFilter";
import SortBy from "./Components/SortBy";
import Pagination from "./Components/Pagination";
import ProductList from "./Components/ProductList";

const MAXPRODPRICE = 5000; //TODO:

function ProductsBySearchPage({ searchByTerm }) {
  const [maxPages, setMaxPages] = useState(0);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [filtersShow, setFiltersShow] = useState(false);
  const [filtersHideAnim, setFiltersHideAnim] = useState(false);
  const [sortByShow, setSortByShow] = useState(false);
  const [sortByHideAnim, setSortByHideAnim] = useState(false);

  const [filters, setFilters] = useState({
    term: searchByTerm,
    page: undefined,
    sort: undefined,
    "price[gte]": undefined,
    "price[lte]": undefined,
    "rating[gte]": undefined,
    category: undefined,
  });

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    updateFilter("term", searchByTerm);
  }, [searchByTerm]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 701);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickFilters = (e) => {
    if (sortByShow) {
      setSortByShow(false);
    }

    if (!filtersShow) {
      setFiltersShow(true);
    } else {
      setFiltersHideAnim(true);
      setTimeout(() => {
        setFiltersShow(false);
        setFiltersHideAnim(false);
      }, 300);
    }
  };

  const handleClickSortBy = () => {
    if (filtersShow) {
      setFiltersShow(false);
    }

    if (!sortByShow) {
      setSortByShow(true);
    } else {
      setSortByHideAnim(true);
      setTimeout(() => {
        setSortByShow(false);
        setSortByHideAnim(false);
      }, 300);
    }
  };

  return (
    <>
      <div className="products-page">
        {isSmallScreen ? (
          <div className="filters-small">
            <div className="filters-small__filters">
              <div
                className={`filters-small__filters--header ${
                  filtersShow ? "active" : ""
                }`}
                onClick={handleClickFilters}
              >
                Filters
              </div>
              <div
                className="filters-small__filters--filters"
                style={{
                  display: filtersShow ? "" : "none",
                  animation: filtersHideAnim ? "HideBelow .4s" : "",
                }}
              >
                <PriceFilter
                  updateFilter={updateFilter}
                  MAXPRODPRICE={MAXPRODPRICE}
                />
                <RatingFilter updateFilter={updateFilter} />
                <CategoryFilter updateFilter={updateFilter} />
              </div>
            </div>
            <div className="filters-small__sort-by">
              <div
                className={`filters-small__sort-by--header ${
                  sortByShow ? "active" : ""
                }`}
                onClick={handleClickSortBy}
              >
                Sort by
              </div>
              <div
                className="filters-small__sort-by--sort-by"
                style={{
                  display: sortByShow ? "" : "none",
                  animation: sortByHideAnim ? "HideBelow .4s" : "",
                }}
              >
                <SortBy updateFilter={updateFilter} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div className="filters">
              <SortBy updateFilter={updateFilter} />
              <PriceFilter
                updateFilter={updateFilter}
                MAXPRODPRICE={MAXPRODPRICE}
              />
              <RatingFilter updateFilter={updateFilter} />
              <CategoryFilter updateFilter={updateFilter} />
            </div>
          </>
        )}
        <ProductList
          filters={filters}
          setMaxPages={setMaxPages}
          searchByTerm={searchByTerm}
        />
      </div>
      <Pagination
        maxPages={maxPages > 0 ? maxPages : 1}
        updateFilter={updateFilter}
      />
    </>
  );
}

export default ProductsBySearchPage;
