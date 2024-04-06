import React from 'react'
import Layout from "../../../Components/Layout/Layout";
import { useParams,useNavigate } from 'react-router-dom';
import Testmenu from '../../../Components/Layout/Testmenu';
import { Select} from 'antd';
import { useState,useEffect } from 'react';
import {toast}from 'react-toastify'; 
import axios from 'axios';
const { Option } = Select;

function UpdateProduct() {
const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllcategory=async()=>{
    try {
     const {data} =await axios.get(`${process.env.REACT_APP_SERVER}/category/get-category`)
     if(data.success){
      setCategories(data.category)
      console.log(data.category);
     }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  }
  useEffect(()=>{
    getAllcategory()}
    ,[])
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.SERVER}/product/get-product/${params.id}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      console.log(data.product.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo && productData.append("photo", photo);
        productData.append("category", category);
        const UpdateProductData= await axios.put(`${process.env.REACT_APP_SERVER}/product/update-product/${params.id}`,productData)
        if(UpdateProductData.data.success){
            toast.error(UpdateProductData.data.message)
        }
    } catch (error) {
      console.log(error.message);
        toast.error("SOMETHING WENT WRONG")
    }
  }
    const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.SERVER}/product/delete-product/${params.id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
 
  return (
    <div>
        <Layout>
       
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Testmenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_SERVER}/product/get-productphoto/${params.id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        </Layout>
    </div>
  )
}

export default UpdateProduct