import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Product.css";
import AHeader from "./AHeader";
import { shippingregdelete, shippingregedit } from "../../service/allApi";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../service/baseUrl";
import ConfirmationModal from "../../components/ConfirmationModal";
function InProduct({ userName }) {
  const { userId, invoice } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [showNonDocumentFields, setShowNonDocumentFields] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [orders, setOrders] = useState([]);
  // Inside your component

  // Ensure that handleDeleteConfirmation toggles the state correctly
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id); // Set the delete ID
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const handleDeleteConfirmed = async () => {
    try {
      await handleDelete(deleteId); // Call handleDelete with the delete ID
      setShowConfirmationModal(false); // Close the confirmation modal
      // You can add additional actions after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      // You can handle errors here
    }
  };

  const fetchBillingData = async (userId, invoiceNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/billing/${userId}/${invoiceNumber}/`
      );
      if (response.ok) {
        const data = await response.json();

        if (data && data.orders) {
          setOrders(data.orders);
        } else {
          throw new Error("No orders found in the response data");
        }
      } else {
        throw new Error("Failed to fetch invoice data");
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  useEffect(() => {
    fetchBillingData(userId, invoice);
  }, [userId, invoice]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const handleEditModalOpen = (employee) => {
    console.log("Edit modal opened for employee:", employee);
    setEditEmployeeData(employee);
    setShowEditModal(true);
  };
  const [formData, setFormData] = useState({
    Shipping_Through: "",
    Name: "" || "", // Set initial value of Name to userName from URL params
    Reciepient_Name: "",
    Mobile: "",
    Pin_Code: "",
    City: "",
    Address: "",
    Consignment: "",
    Content_Type: "",
    Number_of_box: "",
    Declared_value: "",
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Ensure that value is always treated as a string
    const trimmedValue =
      typeof value === "string"
        ? value.trim()
        : value && value.toString().trim();

    setEditEmployeeData((prevData) => ({
      ...prevData,
      [id]: trimmedValue,
    }));
  };

  const editEmployee = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!editEmployeeData || !userId) return;

    // Check if delivery date is not selected
    if (!editEmployeeData.Delivery_date) {
      // Show an alert
      alert("Please select a delivery date.");
      return;
    }

    try {
      const formData = new FormData(e.target);
      // Check and set payment_status to an empty string if it's "null"
      if (editEmployeeData.payment_status === "null") {
        formData.set("payment_status", ""); // Set payment_status to empty string
      }
      Object.entries(editEmployeeData).forEach(([key, value]) => {
        if (!formData.get(key)) {
          formData.append(key, value);
        }
      });

      // Ensure that you're sending the correct value for payment_status
      if (formData.get("payment_status") === "null") {
        formData.set("payment_status", ""); // Set payment_status to empty string
      }

      const response = await shippingregedit(editEmployeeData.id, formData);
      console.log("Employee updated successfully:", response);

      // Update the state with the edited employee data
      setEditEmployeeData(response); // Assuming the response contains the updated employee data
      setShowEditModal(false);
      fetchBillingData(userId);
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee");
    }
  };

  const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
      <Modal show={isOpen} onHide={onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onRequestClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  
  const handleDelete = async (id) => {
    try {
      // Send a request to delete the item from the backend
      await shippingregdelete({}, id); // Pass an empty object as the first argument
      // Update the state by filtering out the deleted item
      setOrders((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log("Shipping registration deleted successfully");
    } catch (error) {
      console.error("Error deleting shipping registration:", error);
      // You can handle errors here
    }
  };


  const handleWeightOrPriceChange = () => {
    const totalWeight = parseFloat(
      document.getElementById("Total_weight").value
    );
    const pricePerKg = parseFloat(
      document.getElementById("Price_per_kg").value
    );

    // Check if both fields have valid numeric values
    if (!isNaN(totalWeight) && !isNaN(pricePerKg)) {
      const totalPrice = totalWeight * pricePerKg;
      document.getElementById("Total_price").value = totalPrice.toFixed(2); // Assuming you want 2 decimal places

      // Update state with the new values
      handleInputChange({
        target: {
          id: "Total_weight",
          value: totalWeight.toString(), // Convert to string since handleInputChange might expect string values
        },
      });

      handleInputChange({
        target: {
          id: "Price_per_kg",
          value: pricePerKg.toString(), // Convert to string since handleInputChange might expect string values
        },
      });

      handleInputChange({
        target: {
          id: "Total_price",
          value: totalPrice.toFixed(2), // Set the value to the formatted total price
        },
      });
    }
  };
  const handleConsignmentChange = (event) => {
    setShowNonDocumentFields(event.target.value === "Non-Document");
    // Add any other handling if needed
  };
  console.log(userName);
  console.log("userName prop:", userName);

  return (
    <div>
      <AHeader />
      <div className="container">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input2"
          />
          {/* <button className="sort-button" onClick={handleSortByDate}>
            Sort by Booking Date{" "}
            <span
              className={`sort-icon ${sortOrder === "asc" ? "asc" : "desc"}`}
            ></span>
          </button> */}
        </div>
        <h2>Product List</h2>
        <ul className="responsive-table">
          <h4>UserName : {userName}</h4>

          <li className="table-header">
            <div className="col col-1">REF ID</div>
            <div className="col col-2">Recipient Name</div>
            <div className="col col-3">Consignment Type</div>
            <div className="col col-2">Booking Date</div>
            <div className="col col-2">Tracking Code</div>
            <div className="col col-2">Actions</div>
          </li>
          {orders.map((order, index) => (
            <li className="table-row" key={index}>
              <div className="col col-1" data-label="Reference ID">
                {index + 1}
              </div>
              <div className="col col-2" data-label="Customer Name">
                {order.Reciepient_Name}
              </div>
              <div className="col col-3" data-label="Consignment Type">
                {order.Consignment}
              </div>
              <div className="col col-2" data-label="Shipping Through">
                {order.Booking_date}
              </div>
              <div className="col col-2" data-label="Shipping Through">
                {order.tracking_id}
              </div>
              <div className="col col-3" data-label="Actions">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={() => handleEditModalOpen(order)}
                >
                  Edit
                </button>
                {/* <button title="Delete" onClick={(event) => handleDelete(order.id, event)} className='btn btn-danger'>Delete</button>   */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteConfirmation(order.id)}
                >
                  Cancel
                </button>


              </div>{" "}
              {/* Add more table cells here based on your data structure */}
            </li>
          ))}
          <li className="table-row">
            <div className="col col-3" data-label="Reference ID">
              <b>Print Bill</b>{" "}
            </div>
            <div className="col col-1" data-label="Reference ID">
              <Link to={`/admin/invoice/${userId}/${invoice}`}>
                <button type="button" className="btn btn-secondary me-2">
                  {" "}
                  <i class="fa-solid fa-print"></i>
                </button>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <ConfirmationModal
        show={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleDeleteConfirmed}
      />

      {/* edit */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
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
                <h5 className="modal-title" id="editEmployeeModalLabel">
                  Edit
                </h5>
                <button
                  type="button"
                  className="close w-100"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowEditModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <Form.Select
                    className="mt-3"
                    id="Shipping_Through"
                    defaultValue={editEmployeeData?.Shipping_Through || ""}
                    onChange={handleInputChange}
                  >
                    <option disabled value="">
                      Shipping Through
                    </option>
                    <option>TRACKON</option>
                    <option>DTDC</option>
                    <option>SPEED POST</option>
                    <option>PROFESSIONAL</option>
                  </Form.Select>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Reciepient_Name"
                    defaultValue={editEmployeeData?.Reciepient_Name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="City"
                    defaultValue={editEmployeeData?.City || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="Address"
                    defaultValue={editEmployeeData?.Address || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pin code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Pin_Code"
                    defaultValue={editEmployeeData?.Pin_Code || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input
                    type="number"
                    className="form-control"
                    id="Mobile"
                    defaultValue={editEmployeeData?.Mobile || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Booking Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Booking_date"
                    defaultValue={editEmployeeData?.Booking_date || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Consignment</label>
                  <Form className="p-2">
                    <Row className="mb-3">
                      <Col>
                        <Form.Check
                          type="radio"
                          id="Consignment_Choices"
                          label="Document"
                          name="Consignment"
                          value="Document"
                          onChange={handleConsignmentChange}
                          defaultChecked={
                            editEmployeeData?.Consignment === "Document"
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          style={{ whiteSpace: "nowrap" }}
                          type="radio"
                          id="Consignment_Choices"
                          label="Non-Document"
                          name="Consignment"
                          value="Non-Document"
                          onChange={handleConsignmentChange}
                          defaultChecked={
                            editEmployeeData?.Consignment === "Non-Document"
                          }
                        />
                      </Col>
                    </Row>
                  </Form>
                </div>
                {showNonDocumentFields && (
                  <>
                    <div className="form-group">
                      <label>Content type</label>
                      <Form.Select
                        id="Content_Type"
                        defaultValue={editEmployeeData?.Content_Type || ""}
                        onChange={handleInputChange}
                      >
                        <option>Content Type</option>
                        <option>ARTIFICIAL JWELLERY</option>
                        <option>BAGS</option>
                        <option>BOOKS</option>
                        <option>CLOTHING</option>
                        <option>
                          CORPORATE GIFTS (EG:MOMENTOES/WOODEN PLAQUES)
                        </option>
                        <option>LUGGAGE</option>
                        <option>PERFUMES</option>
                        <option>PHOTO FRAME</option>
                        <option>RAKHI</option>
                        <option>SHOES</option>
                        <option>SLIPPERS</option>
                      </Form.Select>{" "}
                    </div>
                    <div className="form-group">
                      <label>Number of box</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Number_of_box"
                        defaultValue={editEmployeeData?.Number_of_box || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Declared value</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Declared_value"
                        defaultValue={editEmployeeData?.Declared_value || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                <div className="form-group">
                  <label>Delivery date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="Delivery_date"
                    defaultValue={editEmployeeData?.Delivery_date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Total weight</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Total_weight"
                    defaultValue={editEmployeeData?.Total_weight || ""}
                    onChange={() => handleWeightOrPriceChange()}
                  />
                </div>
                <div className="form-group">
                  <label>Price per kg</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Price_per_kg"
                    defaultValue={editEmployeeData?.Price_per_kg || ""}
                    onChange={() => handleWeightOrPriceChange()}
                  />
                </div>
                <div className="form-group">
                  <label>Total price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Total_price"
                    defaultValue={editEmployeeData?.Total_price || ""}
                    disabled // Add the disabled attribute here
                  />
                </div>

                <div className="form-group">
                  <label>Packing</label>
                  <input
                    type="text"
                    className="form-control"
                    id="packing"
                    defaultValue={editEmployeeData?.packing || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Packing Cover</label>
                  <input
                    type="text"
                    className="form-control"
                    id="packing_cover"
                    defaultValue={editEmployeeData?.packing_cover || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tracking code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tracking_id"
                    defaultValue={editEmployeeData?.tracking_id || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-info">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div></div>
      <DeleteConfirmationModal
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        onConfirm={handleDeleteConfirmed} // Call handleDeleteConfirmed on confirmation
      />
      <ToastContainer />
    </div>
  );
}

export default InProduct;
