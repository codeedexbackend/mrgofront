import React, { useState, useEffect } from "react";
import AHeader from "./AHeader";
import Afooter from "./Afooter";
import {
  addnewuser,
  allprofileviewApi,
  usercontrolEditApi,
  userdelete,
} from "../../service/allApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserControl = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [loading, setLoading] = useState(false); // State for loading
  
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    mobile: "",
    primary_address: "",
    secondary_address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page
  useEffect(() => {
    fetchEmployeeData(); // Fetch employee data when component mounts
  }, [currentPage]);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await allprofileviewApi(currentPage, itemsPerPage); // Call your API function
      if (response && response.data && Array.isArray(response.data)) {
        // Sort the data based on the ID in descending order to display newer users first
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setEmployees(sortedData); // Set employees state with sorted data
        console.log(sortedData);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };
  

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await addnewuser(user);
      console.log("Response from add new user API:", response);

      // Retrieve the user ID from the allprofileviewApi
      const profileResponse = await allprofileviewApi();
      const userId = profileResponse.data.find(profile => profile.full_name === user.full_name)?.id;

      // Navigate to Booking component with user ID and replace the current entry in the history stack
      navigate(`/admin/Booking?userId=${userId}&userName=${user.full_name}`, { replace: true });

      // Optionally handle success response here (e.g., show success message)
      setShowAddModal(false); // Close the modal after adding the user
    } catch (error) {
      console.error("Error adding new user:", error);
      // Handle error
    }
  };


  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
    
  };

  const editEmployee = async (e) => {
    e.preventDefault();
    try {
        if (!editEmployeeData || !editEmployeeData.id) {
            throw new Error("editEmployeeData or its ID is undefined.");
        }

        const formData = new FormData(e.target);
        Object.entries(editEmployeeData).forEach(([key, value]) => {
            if (!formData.get(key)) {
                formData.append(key, value);
            }
        });

handleclose()
        const response = await usercontrolEditApi(
            editEmployeeData.id,
            formData
        );
        console.log("User updated successfully:", response);

        fetchEmployeeData();

        // Show success toast
        toast.success('User updated successfully');
    } catch (error) {
        console.error("Error updating employee:", error);
        // Handle error
    }
};



  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const deleteEmployee = async (id) => {
    try {
      const headers = {};
      const response = await userdelete(headers, id);
  
      if (response && response.status === 204) {
        setEmployees(employees.filter((employee) => employee.id !== id));
        console.log("User deleted successfully.");
        setShowConfirmation(false);
  
        // Show success toast
        toast.success('User deleted successfully');
      } else {
        console.error("Error deleting user:", response);
        // Optionally handle error message
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state
  };
  const handleclose=(e)=>{
    setShowEditModal(false); 
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  // Calculate index of the first and last items for the current page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

// Modify currentItems to include filtering based on searchQuery
const filteredEmployees = employees.filter((employee) =>
  employee.full_name && employee.full_name.toLowerCase().includes(searchQuery.toLowerCase())
);


// Slice the filteredEmployees array to get the current page's items
const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      
      <AHeader />
      {loading && ( // Conditionally render loading animation
        <div className="loading-overlay">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      <div className="container">
      <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input2"
          />
         
        </div>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-xs-6">
                  <h2>
                    Manage <b>Users</b>
                  </h2>
                </div>
                <div className="col-xs-6">
                  <button
                    className="btn btn-success"
                    data-target="#addEmployeeModal"
                    data-toggle="modal"
                    onClick={() => setShowAddModal(true)}
                    style={{ marginTop: "-3%" }}
                  >
                    <i className="material-icons"></i>{" "}
                    <span>Add New Users</span>
                  </button>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee) => (
                  <tr key={employee.id}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {employee.full_name}
                    </td>
                    <td>{employee.email} </td>
                    <td>
                      {employee.primary_address} , {employee.secondary_address}{" "}
                      {employee.state} , {employee.city} <br />{" "}
                      {employee.pincode}
                    </td>
                    <td>{employee.mobile}</td>

                    <td>
                      <a
                        className="edit"
                        data-toggle="modal"
                        data-target="#editEmployeeModal"
                        onClick={() => {
                          setEditEmployeeData(employee); // Set the employee data to editEmployeeData
                          setShowEditModal(true); // Show the edit modal
                        }}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a
                        className="delete"
                        onClick={() => handleDeleteConfirmation(employee.id)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="clearfix">
              <div className="hint-text">
                Showing <b>{currentItems.length}</b> out of{" "}
                <b>{employees.length}</b> entries
              </div>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(employees.length / itemsPerPage) },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(employees.length / itemsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Add Employee Modal */}
        <div
          className={`modal ${showAddModal ? "show" : ""}`}
          id="addEmployeeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addEmployeeModalLabel"
          aria-hidden={!showAddModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={addEmployee}>
                <div className="modal-header">
                  <h5 className="modal-title" id="addEmployeeModalLabel">
                    Add User
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowAddModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={user.full_name}
                      onChange={(e) =>
                        setUser({ ...user, full_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={user.mobile}
                      onChange={(e) =>
                        setUser({ ...user, mobile: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Primary Address</label>
                    <textarea
                      className="form-control"
                      required
                      value={user.primary_address}
                      onChange={(e) =>
                        setUser({ ...user, primary_address: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Secondary Address</label>
                    <textarea
                      className="form-control"
                      required
                      value={user.secondary_address}
                      onChange={(e) =>
                        setUser({ ...user, secondary_address: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                    type="text"
                      className="form-control"
                      required
                      value={user.state}
                      onChange={(e) =>
                        setUser({ ...user, state: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                    type="text"
                      className="form-control"
                      required
                      value={user.city}
                      onChange={(e) =>
                        setUser({ ...user, city: e.target.value })
                      }
                    ></input>{" "}
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                    type="text"
                      className="form-control"
                      required
                      value={user.pincode}
                      onChange={(e) =>
                        setUser({ ...user, pincode: e.target.value })
                      }
                    ></input>{" "}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* edit modal */}
        <div
          className={`modal ${showEditModal ? "show" : ""}`}
          id="editEmployeeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editEmployeeModalLabel"
          aria-hidden={!showEditModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={editEmployee}>
                <div className="modal-header">
                  <h5  className="modal-title" id="editEmployeeModalLabel">
                    Edit user
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editEmployeeData ? editEmployeeData.full_name : ""}
                      onChange={handleInputChange}
                      id="full_name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editEmployeeData ? editEmployeeData.email : ""}
                      onChange={handleInputChange}
                      id="email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Primary Address</label>
                    <textarea
                      className="form-control"
                      value={
                        editEmployeeData ? editEmployeeData.primary_address : ""
                      }
                      onChange={handleInputChange}
                      id="primary_address"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Secondary Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        editEmployeeData
                          ? editEmployeeData.secondary_address
                          : ""
                      }
                      onChange={handleInputChange}
                      id="secondary_address"
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editEmployeeData ? editEmployeeData.state : ""}
                      onChange={handleInputChange}
                      id="state"
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editEmployeeData ? editEmployeeData.city : ""}
                      onChange={handleInputChange}
                      id="city"
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editEmployeeData ? editEmployeeData.pincode : ""}
                      onChange={handleInputChange}
                      id="pincode"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => handleclose()}
                  >
                    Cancel
                  </button>
                  <button  type="submit" className="btn btn-info">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Delete Employee Modal */}
        <div
          className={`modal ${showDeleteModal ? "show" : ""}`}
          id="deleteEmployeeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteEmployeeModalLabel"
          aria-hidden={!showDeleteModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={deleteEmployee}>
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteEmployeeModalLabel">
                    Delete Employee
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete these Records?</p>
                  <p className="text-warning">
                    <small>This action cannot be undone.</small>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Employee Modal */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this Shipping?</p>
            <div>
              <button onClick={() => deleteEmployee(deleteId)}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};
export default UserControl;
