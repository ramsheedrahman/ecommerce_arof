import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import {toast}from 'react-toastify'; 
import Layout from "../../../Components/Layout/Layout";
import AdminMenu from "../../../Components/Layout/Adminmenu";
import Testmenu from "../../../Components/Layout/Testmenu";
import { Modal } from "react-bootstrap";
// import "../Admin/createcategory.css"
const CategoryManager = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState()
  const [newCategoryName, setNewCategoryName] = useState("");
  const [visible,setVisible]=useState(false)
  const[selected,setSelected]=useState('')
  const handleCreateCategory = async (e) => {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    e.preventDefault();
    try {
      
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/category/create-category`, { name }, {
        headers: {
          Authorization: token
        }
      });
      
      if (res.data.success) {
        toast.success(`${name} is created`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUpdateCategory = async (e) => {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER}/category/update-category/${selected._id}`, { name:newCategoryName },{
        headers: {
          Authorization: token
        }
      });
      
      if (res.data.success) {
        toast.success(`${newCategoryName} is updated`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
const confirmDelete=async(e)=>{
  e.preventDefault()
  try {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    const res=await axios.delete(`${process.env.REACT_APP_SERVER}/category/delete-category/${selected._id}`,{
      headers: {
        Authorization: token
      }
    })
    setShowConfirmation(false);

  } catch (error) {
    console.log(error);
  }
}
const cancelDelete = () => {
  // If the user cancels, simply reset the state
  setSelected(null);
  setShowConfirmation(false);
};
const handleDeleteCategory = (category) => {
  setSelected(category);
  setShowConfirmation(true);
};
    const getAllcategory=async()=>{
      try {
       const {data} =await axios.get(`${process.env.REACT_APP_SERVER}/category/get-category`)
       if(data.success){
        setCategories(data.category)
       }
      } catch (error) {
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
      }
    }
    useEffect(()=>{
      getAllcategory()}
      ,[])

  
  return (
    <Layout>
      
    <div className="container-fluid" style={{width:'100%', minHeight:'90vh'
}}>
      <div className="row" style={{marginTop:'100px'}}>
        <div className="col-md-3">
          <Testmenu/>
        </div>

        <div className="col-md-4 my-5">
          <div className="card">
            <div className="card-header" style={{fontWeight:"bold"}}>Create Category</div>
            <div className="card-body">
              <input
                type="text"
                className="form-control"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="btn btn-success mt-3"
                onClick={handleCreateCategory}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5 my-3 ">
          <div className="card">
            <div className="card-header " style={{fontWeight:"bold"}} >Categories</div>
            <div className="card-body">
              <Table className="table" striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        <Button
                          className="mx-3"
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setVisible(true);
                            setNewCategoryName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={()=>handleDeleteCategory(category)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}
      >
        <form onSubmit={handleUpdateCategory}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </div>
    <Modal show={showConfirmation} onHide={cancelDelete}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to delete {selected.name}?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={cancelDelete}>
        No
      </Button>
      <Button variant="danger" onClick={confirmDelete}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
  </Layout>

  );
                  }

export default CategoryManager;
