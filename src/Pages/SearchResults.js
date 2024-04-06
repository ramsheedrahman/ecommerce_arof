import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSelector } from "react-redux";
import { searchReducer } from "../redux/store"
import SearchInput from "../Components/Forms/SerachInput";
import { useNavigate } from "react-router-dom";
const SearchResults = () => {
  const navigate=useNavigate()
const results = useSelector((state) => state.search.results);
console.log(results);
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <div className="input" style={{margin:'auto',width:'60%'}}>
            <SearchInput  />

            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {results.length < 1
              ? "No Products Found"
              : `Found ${results.length}`}
          </h6>
          <div className="col-12">
          <div className="col-md-12 d-flex justify-content-center ">
            {results.map((p) => (
              <div className="card m-2  "style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-description">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹{p.price}</p>
                  <button class="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;