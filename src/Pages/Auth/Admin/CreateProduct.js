import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
// import AdminMenu from '../../../Components/Layout/Adminmenu'
import Layout from "../../../Components/Layout/Layout.js";
import Testmenu from "../../../Components/Layout/Testmenu";
import { useNavigate } from "react-router-dom";
function CreateProduct() {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("brand", brand);
      productData.append("size", size);
      productData.append("color", color);

      const authToken = JSON.parse(localStorage.getItem("auth"));
      if (!authToken || !authToken.token) {
        // Handle the case where the token is missing in localStorage
        toast.error("Authentication token not found.");
        return;
      }

      const response = await axios.post(
        `${process.env.SERVER}/product/create-product`,
        productData,
        {
          headers: {
            Authorization: authToken.token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product created successfully");
      } else {
        toast.error(response.data.message || "Product creation failed.");
        navigate("dashboard/admin/products");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row" style={{marginTop:'100px'}}>
          <div className="col-md-3">
            <Testmenu />
          </div>
          <div className="col-md-9">
            <div className="m-1 w-75">
              <h1>Create Product</h1>

              <Select
                bordered={false}
                size="large"
                showSearch
                className="form-select"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {" "}
                {categories.map((c) => (
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                <input
                  type="text"
                  value={brand}
                  placeholder="write a brand"
                  className="form-control"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={size}
                  placeholder="write a size"
                  className="form-control"
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={color}
                  placeholder="write a color"
                  className="form-control"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
