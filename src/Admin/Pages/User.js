import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./User.css";
import AHeader from "./AHeader";
import Afooter from "./Afooter";
import {
  ShippingRegView,
  orderview,
  shippingregdelete,
  shippingregedit,
  tracking,
} from "../../service/allApi";
import { Col, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../service/baseUrl";

const User = () => {
  const { userId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showNonDocumentFields, setShowNonDocumentFields] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusValues, setStatusValues] = useState({});
  const [orderStatus, setOrderStatus] = useState({});
  const [trackingStatus, setTrackingStatus] = useState({});
  const orderStatusOptions = [
    "Placed",
    "Collected",
    "Shipped",
    "Delivered",
    "Returned",
  ];
  const [trackingDetails, setTrackingDetails] = useState({}); // Define trackingDetails state
  const [orders, setOrders] = useState([]);
  const { id } = useParams(); // Extracting user_id from route params

  useEffect(() => {
    const fetchShippingRegistrationAndInitializeStatus = async () => {
      try {
        const response = await ShippingRegView(userId, {});
        setEmployees(response.data || []);

        const initialStatusValues = {};
        response.data.forEach((employee) => {
          initialStatusValues[employee.id] = employee.status;
        });
        setStatusValues(initialStatusValues);
      } catch (error) {
        console.error("Error fetching shipping registration data:", error);
      }
    };

    fetchShippingRegistrationAndInitializeStatus();
  }, [userId]);

  useEffect(() => {
    fetchOrders(userId);
  }, [userId]);

  const fetchOrders = async (userId) => {
    try {
      const data = await orderview(userId);
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };
  const handleConsignmentChange = (event) => {
    setShowNonDocumentFields(event.target.value === "Non-Document");
    // Add any other handling if needed
  };

  const handleAcceptReject = async (registrationId, action) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/shipping-registration/${registrationId}/accept-reject/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );
      if (response.ok) {
        // Handle success
        toast.success(`Action ${action} successful`);
        // Update status in UI
        setStatusValues((prevStatusValues) => ({
          ...prevStatusValues,
          [registrationId]: action,
        }));
      } else {
        // Handle failure
        toast.error("Action failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOrderStatusValues = async () => {
      try {
        const data = await orderview(userId);
        // Extract status values from the response data
        const orderStatusFromApi = {};
        data.forEach((order) => {
          orderStatusFromApi[order.tracking_id] = order.status;
        });
        setOrderStatus(orderStatusFromApi);

        // Fetch tracking status for each order
        const trackingStatusFromApi = {};
        for (const order of data) {
          const { tracking_id } = order;
          const trackingData = await tracking(tracking_id);
          trackingStatusFromApi[tracking_id] = trackingData.status;
        }
        setTrackingStatus(trackingStatusFromApi);
      } catch (error) {
        console.error("Error fetching order status values:", error);
      }
    };

    fetchOrderStatusValues();
  }, [userId]);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const trackingDetailsData = {};
        // Fetch tracking details for each employee's tracking ID
        for (const employee of employees) {
          const { tracking_id } = employee;
          const data = await tracking(tracking_id);
          trackingDetailsData[tracking_id] = data;
        }
        console.log("Fetched tracking details data:", trackingDetailsData); // Add this line
        setTrackingDetails(trackingDetailsData);
      } catch (error) {
        console.error("Error fetching tracking details:", error);
      }
    };

    fetchTrackingDetails();
  }, [employees]);

  const handleOrderStatusChange = async (newOrderStatus, tracking_id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/update-tracking-status/${tracking_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newOrderStatus }),
        }
      );
      if (response.ok) {
        // Update order status state after successful API call
        setOrderStatus((prevOrderStatus) => ({
          ...prevOrderStatus,
          [tracking_id]: newOrderStatus,
        }));

        // Update statusValues state with the new order status
        setStatusValues((prevStatusValues) => ({
          ...prevStatusValues,
          [tracking_id]: newOrderStatus,
        }));

        // Show success toast notification
        toast.success("Order status updated successfully!");

        // Fetch updated tracking details from the tracking API
        const updatedTrackingDetails = await tracking(tracking_id);
        // Handle the updated tracking details as needed
        console.log("Updated Tracking Details:", updatedTrackingDetails);

        // Update the state or data structure containing the order status information
        // For example:
        // setOrderStatusDetails((prevDetails) => ({
        //   ...prevDetails,
        //   [tracking_id]: updatedTrackingDetails,
        // }));
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state
  };

  const handleSortByDate = () => {
    // Toggle between ascending and descending order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleStatusChange = async (id, value) => {
    try {
      // Update the status value in the state
      setStatusValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));

      // Call the API to update the status
      if (value === "accept" || value === "reject") {
        await handleAcceptReject(id, value);
      }
    } catch (error) {
      console.error("Error handling status change:", error);
      // Handle error if needed
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowConfirmation(true); // Update showConfirmation state to true
  };

  const handleEditModalOpen = (employee) => {
    setEditEmployeeData(employee); // Set employee data to populate edit modal fields
    setShowEditModal(true); // Open edit modal
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setShowNonDocumentFields(e.target.value === "Non-Document");
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [id]: typeof value === "string" ? value.trim() : value,
    }));
  };

  const editEmployee = async (e) => {
    e.preventDefault();
    if (!editEmployeeData || !userId) return;

    // Check if delivery date is not selected
    if (!e.target.Delivery_date.value) {
      // Show alert message
      alert("Please select the delivery date.");
      return;
    }

    try {
      const formData = new FormData(e.target);
      Object.entries(editEmployeeData).forEach(([key, value]) => {
        if (!formData.get(key)) {
          // If the key is Delivery_date, format the date before appending
          if (key === "Delivery_date") {
            const formattedDate = new Date(value).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
            formData.append(key, formattedDate);
          } else if (key === "packing" || key === "packing_cover") {
            // If packing or packing_cover is empty, set it to null
            if (value.trim() === "") {
              formData.append(key, null);
            } else {
              formData.append(key, value);
            }
          } else {
            formData.append(key, value);
          }
        }
      });
      const response = await shippingregedit(editEmployeeData.id, formData);
      console.log("Employee updated successfully:", response);
      setShowEditModal(false);
      fetchShippingRegistrationData(userId);
      // Show success toast notification for edit
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating User:", error);
      // Show error toast notification
      toast.error("Error updating User. Please try again.");
    }
  };

  const fetchShippingRegistrationData = async (userId) => {
    // Accept userId as a parameter
    try {
      const response = await ShippingRegView(userId, {}); // Pass userId to API function
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching shipping registration data:", error);
    }
  };

  // Check if employees is defined before filtering
  const filteredEmployees = employees.filter((employee) => {
    const searchFields = [
      employee.Shipping_Through?.toLowerCase() || "",
      employee.Content_Type?.toLowerCase() || "",
      employee.Reciepient_Name?.toLowerCase() || "",
      employee.City?.toLowerCase() || "",
      employee.Address?.toLowerCase() || "",
      String(employee.Pin_Code)?.toLowerCase() || "",
      String(employee.Mobile)?.toLowerCase() || "",
      employee.Booking_date?.toLowerCase() || "",
      employee.Consignment?.toLowerCase() || "",
      employee.Number_of_box?.toLowerCase() || "",
      employee.Declared_value?.toLowerCase() || "",
      employee.Delivery_date?.toLowerCase() || "",
      employee.tracking_id?.toLowerCase() || "",
    ];
    return searchFields.some((field) =>
      field.includes(searchQuery.toLowerCase())
    );
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const dateA = new Date(a.Booking_date);
    const dateB = new Date(b.Booking_date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleDelete = async (id) => {
    try {
      const headers = {}; // Optionally, you may include headers if required by your API
      await shippingregdelete(headers, id);
      console.log("Shipping registration deleted successfully");
      // Close the confirmation modal
      setShowConfirmation(false);
      // Show success toast notification
      toast.success("Shipping registration deleted successfully!");
      // Refresh data after deletion
      await fetchShippingRegistrationData(userId); // Assuming fetchShippingRegistrationData is an async function
      // Optionally, you may perform additional actions after successful deletion, such as updating the state or refreshing the UI
    } catch (error) {
      console.error("Error deleting shipping registration:", error);
      // Handle error (e.g., show error message)
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the employees array to get the current page's items
  const currentItems = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const handlePaymentChange = async (id, value) => {
    try {
      // Fetch existing data for the given ID
      const response = await fetch(
        `${BASE_URL}/api/ShippingRegEditView/${id}/`
      );
      const existingData = await response.json();

      // Update the payment status field in the existing data
      existingData.payment_status = value;

      // Format the date if provided (assuming value is the new payment status)
      if (value === "Not Collected" || value === "Collected") {
        // Format the current date in YYYY-MM-DD format
        existingData.Delivery_date = new Date().toISOString().split("T")[0];
      } else {
        // Set Delivery_date field to an empty string if null is not allowed
        existingData.Delivery_date = ""; // Or set to null if null is allowed
      }

      // Make a PUT request to update the shipping registration data
      const putResponse = await fetch(
        `${BASE_URL}/api/ShippingRegEditView/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(existingData),
        }
      );

      // Check if the request was successful
      if (putResponse.ok) {
        // Show success toast notification
        toast.success("Payment status updated successfully!");
        // Optionally, you may perform additional actions after successful update
      } else {
        throw new Error("Failed to update shipping registration data");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      // Handle error if needed
      // Show error toast notification
      toast.error("Error updating payment status. Please try again.");
    }
  };

  return (
    <div>
      <AHeader />
      <div className="container">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input2"
          />
          <button className="sort-button" onClick={handleSortByDate}>
            Sort by Booking Date{" "}
            <span
              className={`sort-icon ${sortOrder === "asc" ? "asc" : "desc"}`}
            ></span>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Shipping Through</th>
                <th>Recipient</th>
                <th>City</th>
                <th>Recipient Address</th>
                <th>Pincode</th>
                <th>Recipient Phone</th>
                <th>Booking Date</th>
                <th>Consignment</th>
                <th>Content Type</th>
                <th>No of Boxes</th>
                <th>Declared Value</th>
                <th>Delivery Date</th>
                <th>Tracking Code</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Order Status</th>
                <th>Actions</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="16" className="no-data-cell">
                    No data
                  </td>
                </tr>
              ) : (
                currentItems.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.Shipping_Through}</td>
                    <td>{employee.Reciepient_Name}</td>
                    <td>{employee.City}</td>
                    <td>{employee.Address}</td>
                    <td>{employee.Pin_Code}</td>
                    <td>{employee.Mobile}</td>
                    <td>{employee.Booking_date}</td>
                    <td>{employee.Consignment}</td>
                    <td>{employee.Content_Type}</td>
                    <td>{employee.Number_of_box}</td>
                    <td>{employee.Declared_value}</td>
                    <td>{employee.Delivery_date}</td>
                    <td>{employee.tracking_id}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <select
                        value={statusValues[employee.id] || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(employee.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="accept">Accept</option>
                        <option value="reject">Reject</option>
                      </select>
                      <>
                        {
                          orders.find(
                            (order) =>
                              order.tracking_id === employee.tracking_id
                          )?.registration_status
                        }
                      </>{" "}
                    </td>
                    <td>
                      <select
                        value={statusValues[employee.id]}
                        onChange={(e) =>
                          handlePaymentChange(employee.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Collected">Collected</option>
                        <option value="Not Collected">Not Collected</option>
                      </select>

                      <>
                        {console.log("trackingDetails:", trackingDetails)}
                        {trackingDetails[employee.tracking_id] ? (
                          <>
                            {console.log(
                              "status:",
                              trackingDetails[employee.tracking_id]
                                .payment_status
                            )}
                            <span>
                              {
                                trackingDetails[employee.tracking_id]
                                  .payment_status
                              }
                            </span>
                          </>
                        ) : (
                          <span>Loading...</span>
                        )}
                      </>
                    </td>

                    <td style={{ whiteSpace: "nowrap" }}>
                      <select
                        value={orderStatus[employee.tracking_id] || "Placed"}
                        onChange={(e) =>
                          handleOrderStatusChange(
                            e.target.value,
                            employee.tracking_id
                          )
                        }
                      >
                        {orderStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <>
                        {console.log("trackingDetails:", trackingDetails)}
                        {trackingDetails[employee.tracking_id] ? (
                          <>
                            {console.log(
                              "status:",
                              trackingDetails[employee.tracking_id].status
                            )}
                            <span>
                              {trackingDetails[employee.tracking_id].status}
                            </span>
                          </>
                        ) : (
                          <span>Loading...</span>
                        )}
                      </>
                    </td>

                    <td>
                      <a
                        className="edit"
                        data-toggle="modal"
                        data-target="#editEmployeeModal"
                        onClick={() => handleEditModalOpen(employee)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a onClick={() => handleDeleteConfirmation(employee.id)}>
                        <i
                          style={{ marginLeft: "150%" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          &#xE872;
                        </i>
                      </a>
                    </td>
                    <td>
                      <Link to={`/label/${userId}/${employee.id}`}>
                        <button className="btn btn-outline">
                          <i className="fa-solid fa-print"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="clearfix">
        <div className="hint-text">
          Showing <b>{currentItems.length}</b> out of <b>{employees.length}</b>{" "}
          entries
        </div>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(i + 1)}>
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
      {/* edit */}
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
      </div>
      {/* Delete Employee Modal */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this Shipping?</p>
            <div>
              <button onClick={() => handleDelete(deleteId)}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <Afooter />
    </div>
  );
};

export default User;
