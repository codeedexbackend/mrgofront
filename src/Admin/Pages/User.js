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
import { Button, Col, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../service/baseUrl";

const User = () => {
  const { userId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showNonDocumentFields, setShowNonDocumentFields] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusValues, setStatusValues] = useState({});
  const [orderStatus, setOrderStatus] = useState({});
  const [trackingStatus, setTrackingStatus] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    // const { userId, invoice } = useParams();
    const [endDate, setEndDate] = useState(null);
    const [shippingRegistrations, setShippingRegistrations] = useState([]);
    const [startDate, setStartDate] = useState(null);

    // Function to handle all selection change
    const handleAllSelectionChange = (e) => {
      const { checked } = e.target;
      setIsAllSelected(checked);
      if (checked) {
        const allIds = currentItems.map((item) => item.id);
        setSelectedIds(allIds);
      } else {
        setSelectedIds([]);
      }
    };
  
    // Function to handle individual row selection change
const handleSelectionChange = (id, checked) => {
  // Update selectedIds based on the checkbox status of the row
  if (checked) {
    setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
  } else {
    setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((selectedId) => selectedId !== id));
  }

  // Update the status of the table head checkbox based on the selectedIds
  const allSelected = currentItems.every((item) => selectedIds.includes(item.id));
  setIsAllSelected(allSelected);
  
  // If any row is deselected, uncheck the table head checkbox
  if (!checked) {
    setIsAllSelected(false);
  }
};


  
    // Function to determine if a row is selected
    const isSelected = (id) => selectedIds.includes(id);
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
      // Clear existing orders data before updating state
      setOrders([]); // Clear existing data
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
        // Skip if the value is empty or null
        if (value === "" || value === null) {
          return;
        }

        // If the key is Delivery_date, format the date before appending
        if (key === "Delivery_date") {
          const formattedDate = new Date(value).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
          formData.append(key, formattedDate);
        } else {
          formData.append(key, value);
        }
      });

      // Append an empty string value for payment_status if not present
      if (!formData.has('payment_status')) {
        formData.append('payment_status', '');
      }

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



 const fetchShippingRegistrations = async () => {
  try {
    // Format start and end dates to yyyy-mm-dd format
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Make API request with formatted start and end dates
    const response = await fetch(
      `${BASE_URL}/api/shipping-registrations/search/${userId}/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
    if (response.ok) {
      const data = await response.json();
      // Set the shipping registrations data to the fetched data
      setShippingRegistrations(data.orders);
      // Clear the existing employees data
      setEmployees([]);
      console.log("Shipping registrations data fetched successfully.");
    } else {
      console.error("Failed to fetch shipping registrations");
    }
  } catch (error) {
    console.error("Error fetching shipping registrations:", error);
  }
};

  

// Define the formatDate function in the global scope
const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

// Initialize sortedEmployees variable outside the conditional block
let sortedEmployees = [];

// Check if shippingRegistrations is defined and iterable
if (shippingRegistrations && typeof shippingRegistrations[Symbol.iterator] === 'function') {
  // Combine employees and shippingRegistrations arrays
  const allData = [...employees, ...shippingRegistrations];

  // Filter allData by date range and search query
  const filteredData = allData.filter((item) => {
    // Convert search fields to lowercase for case-insensitive filtering
    const searchFields = [
      item.Shipping_Through?.toLowerCase() || "",
      item.Content_Type?.toLowerCase() || "",
      item.Reciepient_Name?.toLowerCase() || "",
      item.City?.toLowerCase() || "",
      item.Address?.toLowerCase() || "",
      String(item.Pin_Code)?.toLowerCase() || "",
      String(item.Mobile)?.toLowerCase() || "",
      item.Booking_date || "", // Assuming Booking_date is properly formatted
      item.Consignment?.toLowerCase() || "",
      item.Number_of_box?.toLowerCase() || "",
      item.Declared_value?.toLowerCase() || "",
      item.Delivery_date?.toLowerCase() || "",
      item.tracking_id?.toLowerCase() || "",
    ];

    // Filter based on search query and fields
    const containsSearchQuery = searchFields.some((field) =>
      field.includes(searchQuery.toLowerCase())
    );

    // Check if the Booking_date falls within the specified date range
    const bookingDate = new Date(item.Booking_date); // Assuming Booking_date is properly formatted
    const isWithinDateRange =
    (!fromDate || bookingDate >= new Date(fromDate)) &&
    (!toDate || bookingDate <= new Date(toDate));

    return containsSearchQuery && isWithinDateRange;
  });

  sortedEmployees = filteredData;
} else {
  console.error("shippingRegistrations is not defined or not iterable");
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// Slice the employees array to get the current page's items
const currentItems = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);

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



  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (startDate && endDate) {
      fetchShippingRegistrations();
    }
  }, [startDate, endDate]);

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
 

   
  

  const handleDeleteSelected = async () => {
    try {
      const headers = {}; // Optionally, you may include headers if required by your API
      const response = await fetch(`${BASE_URL}/api/shipping-registrations/bulk-delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ registration_ids: selectedIds }), // Send selected IDs in the request body
      });
  
      if (response.ok) {
        // Handle success
        console.log("Selected shipping registrations deleted successfully");
        // Close the confirmation modal
        setShowConfirmation(false);
        // Show success toast notification
        toast.success("Selected shipping registrations deleted successfully!");
        // Refresh data after deletion
        await fetchShippingRegistrationData(userId);
        // Clear selectedIds
        setSelectedIds([]);
      } else {
        // Handle failure
        console.error("Failed to delete selected shipping registrations");
        // Show error toast notification
        toast.error("Failed to delete selected shipping registrations. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting selected shipping registrations:", error);
      // Handle error (e.g., show error message)
      // Show error toast notification
      toast.error("Error deleting selected shipping registrations. Please try again.");
    }
  };
  
  const calculateFinalAmount = () => {
    // Parse values to ensure they are numeric
    const totalPrice = parseFloat(document.getElementById('Total_price').value) || 0;
    const packing = parseFloat(document.getElementById('packing').value) || 0;
    const packingCover = parseFloat(document.getElementById('packing_cover').value) || 0;
    
    // Calculate the final amount
    const finalAmount = totalPrice + packing + packingCover;
    // Update the final amount input
    document.getElementById('final_amount').value = finalAmount.toFixed(2); // Adjust to your desired formatting
      // Update state with the new values
      handleInputChange({
        target: {
          id: "packing",
          value: packing.toString(), // Convert to string since handleInputChange might expect string values
        },
      });

      handleInputChange({
        target: {
          id: "packing_cover",
          value: packingCover.toString(), // Convert to string since handleInputChange might expect string values
        },
      });
      handleInputChange({
        target: {
          id: "final_amount",
          value: finalAmount.toString(), // Convert to string since handleInputChange might expect string values
        },
      });
  }
 
 
    
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
        <div className="container">
 <Row style={{whiteSpace:'nowrap'}}>
    <Col>
      <div className="input-container">
        <label>Start Date:</label>
        <input
          className="input"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
    </Col>
    <Col id="lplpk">
      <div id="lplpk" className="input-container">
        <label>End Date:</label>
        <input
          className="input"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </Col>
 </Row>
</div>


       {selectedIds.length > 0 && (
  <button
    className="sort-button"
    onClick={handleDeleteSelected}
  >
    Delete
  </button>
)}


          {/* <button className="sort-button" onClick={handleSortByDate}>
            Sort by Booking Date{" "}
            <span
              className={`sort-icon ${sortOrder === "asc" ? "asc" : "desc"}`}
            ></span>
          </button> */}
        </div>
        <div className="table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
              <th>
  <input
    type="checkbox"
    checked={isAllSelected}
    onChange={handleAllSelectionChange}
  />
</th>
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
                <th>Invoice number</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Order Status</th>
                <th>Actions</th>
                <th>Print</th>
                <th>Billing</th>
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
                     <td>
                    <input
                      type="checkbox"
                      checked={isSelected(employee.id)}
                      onChange={(e) =>
                        handleSelectionChange(employee.id, e.target.checked)
                      }
                    />
                  </td>
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
                    <td>{employee.invoice_number}</td>

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
                      <a  onClick={() => handleDeleteConfirmation(employee.id)}>
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
                    <td>
                    <Link to={`/admin/invoice/${userId}/${employee.invoice_number}`}>
  <Button>Billing</Button>
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
  { length: Math.ceil(sortedEmployees.length / itemsPerPage) },
  (_, i) => (
    <li
      key={i}
      className={`page-item ${
        currentPage === i + 1 ? "active" : ""
      }`}
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
  onChange={() => calculateFinalAmount()}
/>
                </div>

                <div className="form-group">
                  <label>Packing Cover</label>
                  <input
  type="text"
  className="form-control"
  id="packing_cover"
  defaultValue={editEmployeeData?.packing_cover || ""}
  onChange={() => calculateFinalAmount()}
/>
                </div>
                <div className="form-group">
                  <label>Final Amount</label>
                  <input
  type="text"
  className="form-control"
  id="final_amount"
  defaultValue={editEmployeeData?.final_amount || ""}
  disabled
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