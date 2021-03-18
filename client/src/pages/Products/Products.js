import React, { useEffect, useState } from "react";
import FiltersGroup from "../../components/FiltersGroup/FiltersGroup";
import "./Products.css";
import ProductItem from "../../components/ProductItem/ProductItem";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  getProductsByFilter,
  setProductsForFilter,
  setSortOption,
} from "../../actions/productActions";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import SortIcon from "@material-ui/icons/Sort";

function Products() {
  const dispatch = useDispatch();

  let {
    loading,
    error,
    products,
    processor,
    brands,
    memory,
    storage,
    video,
  } = useSelector((state) => state.productList);

  let { filterData, filterLoading, filterError } = useSelector(
    (state) => state.productFilter
  );

  const sortOption = useSelector((state) => state.sortOption);

  let [filter, setFilter] = useState({});

  const getSortOption = (value) => {
    dispatch(setSortOption(value));

    if (localStorage.getItem("filter")) {
      let filter = JSON.parse(localStorage.getItem("filter"));
      filter.sortValue = value;
      localStorage.setItem("filter", JSON.stringify(filter));
    } else {
      localStorage.setItem("filter", JSON.stringify({ sortValue: value }));
    }
  };

  const removeFilter = () => {
    localStorage.removeItem("filter");
    dispatch(getProductList());
    setFilter({});
    dispatch(setSortOption("A-Z"));
    let emptyProductsState;
    dispatch(setProductsForFilter(emptyProductsState));
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (localStorage.getItem("filter")) {
      filter = JSON.parse(localStorage.getItem("filter"));
      setFilter(filter);
      if (filter.filter) {
        dispatch(getProductsByFilter(filter.filter));
      }
      dispatch(setSortOption(filter.sortValue ? filter.sortValue : sortOption));
    } else {
      dispatch(getProductList());
    }
  }, [dispatch]);

  return (
    <div className="products">
      <div className="products__left__side">
        {localStorage.getItem("filter") ? (
          <div className="removeFilter" onClick={() => removeFilter()}>
            REMOVE FILTERS <HighlightOffIcon />
          </div>
        ) : (
          <></>
        )}

        <FiltersGroup
          // active={true}
          name={"Manufacturer"}
          list={changeValues(
            filter.filterList?.brand ? filter.filterList?.brand : brands,
            brands
          )}
        />
        <FiltersGroup
          name={"Processor"}
          list={changeValues(filter.filterList?.processor, processor)}
        />
        <FiltersGroup
          name={"Memory"}
          list={changeValues(filter.filterList?.memory, memory)}
        />
        <FiltersGroup
          name={"Storage"}
          list={changeValues(filter.filterList?.storage, storage)}
        />
        <FiltersGroup
          name={"Video"}
          list={changeValues(filter.filterList?.video, video)}
        />
      </div>

      <div className="products__right__side">
        <div className="products__right__side__options__bar">
          <div className="sort">
            <SortIcon />
            <select
              value={sortOption}
              onChange={(e) => getSortOption(e.target.value)}
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="1-10">1-10</option>
              <option value="10-1">10-1</option>
            </select>
          </div>
        </div>

        <div className="products__right__side__productList">
          {changeValues(filterLoading, loading) ? (
            <LoadingBox />
          ) : changeValues(filterError, error) ? (
            <MessageBox
              message={error ? error : "Product Not Found"}
              variant="error"
            />
          ) : (
            changeValues(filterData, products)?.map((item, index) => (
              <ProductItem
                key={index}
                _id={item._id}
                images={item.images}
                name={item.name}
                processor={item.processor}
                memory={item.memory}
                video={item.video}
                storage={item.storage}
                price={item.price}
                countInStock={item.countInStock}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const changeValues = (value1, value2) => {
  if (value1) {
    return value1;
  } else {
    return value2;
  }
};

export default Products;
