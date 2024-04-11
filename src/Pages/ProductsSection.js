// CombinedSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Components/Context/cart';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../Styles/productSection.css'
import { Checkbox, Radio } from 'antd';
import { Prices } from "../Components/Routes/Price";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
const ProductsSection = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [cart, setCart] = useCart();
  
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleCheckboxChange = (value, c) => {
    let all = [...selectedCategories];
    if (value) {
      all.push(c);
    } else {
      all.filter((category) => category !== c);
    }
    setSelectedCategories(all);
  };

  const handleAddtoCart = (p) => {
    const existingProduct = cart.find((item) => item._id === p._id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === p._id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...p, quantity: 1 }];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/category/get-category`)
      if (data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  }

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/product/get-allproducts`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllcategory();
    getAllProducts();
  }, []);

  const handleDropdownChange = (selectedCategoryId) => {
    if (selectedCategoryId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([selectedCategoryId]);
    }
  };

  const getFilteredProducts = async () => {
    try {
      console.log(process.env.NODE_SERVER); // Print the server URL for debugging

      const filter = await axios.post(`${process.env.REACT_APP_SERVER}/product/filter-products`,{ selectedCategories, selectedPrices })
      setProducts(filter.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  useEffect(() => {
    if (!selectedCategories.length || !setSelectedPrices.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (selectedCategories.length || setSelectedPrices.length) getFilteredProducts();
  }, [selectedCategories, selectedPrices]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((p) => (
  <div className="col-12 col-md-3  d-flex justify-content-center" key={p._id}>
                    <div className="card m-2" style={{ width: '16rem' }}>
                      <img
                        src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: '14rem', minHeight: '14rem', maxHeight: '14rem' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="product-card-text">₹{p.price}</p>
                        {p && p._id && (
                          <button className="about-more mx-1" onClick={() => navigate(`/productdetails/${p._id}`)}>
                            About more
                          </button>
                        )}
                        <button className="add-to-cart" onClick={() => handleAddtoCart(p)}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>      
    ));
const clearFilter=()=>{
  window.location.reload();

}
  return (
    
      <div className="container-fluid">
        <div className="row" style={{marginTop:'100px'}}>
          <div className="col-2 filter">
            <div className="">
              <div className="heading">
                <h4 className="text-start">Filter by Categories</h4>
              </div>
              {categories.map((category) => (
                <Checkbox
                  className="checkbox"
                  key={category._id}
                  onChange={(e) => handleCheckboxChange(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <div className="d-flex flex-column">
              <div className="heading">
                <h4 className="text-start">Filter by Prices</h4>
              </div>
              <Radio.Group onChange={(e) => setSelectedPrices(e.target.value)} style={{ textAlign: 'left' }}>
                {Prices.map((price) => (
                  <div key={price._id}>
                    <Radio className="radiobox" value={price.array}>
                      {price.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>

            </div>
            <button style={{marginTop:'1rem'}} className='btn btn-danger w-75' onClick={()=>clearFilter()} >Clear Filter</button>
          </div>
            <div className="col-12 col-md-10 product-section">
              <div className="row">
                {displayProducts}
              </div>
              <div className="pagination-container">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              pageCount={pageCount}
              pageCountClassName={'page-count'}
              pageLinkClassName={'page-count'} // Add your custom class for page numbers
              onPageChange={changePage}
              containerClassName={'pagination'}
              previousLinkClassName={'pagination__link'}
              nextLinkClassName={'pagination__link'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
            />
          </div>
            </div>
          </div>
        </div>
  );
}

export default ProductsSection;
