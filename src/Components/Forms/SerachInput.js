import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {searchReducer} from "../../redux/reducers/Search.js";
import { setKeyword,setResults } from "../../redux/reducers/Search.js";
const SearchInput = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.keyword);
  const results = useSelector((state) => state.search.results);
  
const navigate=useNavigate()
console.log(searchReducer.actions)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8000/product/search/${keyword}`
      );
      dispatch(setResults(data));
      console.log({data});
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={keyword}
          onChange={(e) => {
            dispatch(setKeyword(e.target.value));
          }}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;