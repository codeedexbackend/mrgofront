import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./Order.css";
import AHeader from "./AHeader";
import Afooter from "./Afooter";
import { BASE_URL } from "../../service/baseUrl";

const Order = () => {
  const { id } = useParams(); // Extracting user_id from route params
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterSidebar, setShowFilterSidebar] = useState(false); // State to manage filter sidebar visibility
  const [selectedOption, setSelectedOption] = useState("");
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [startDate, setStartDate] = useState(null); // Start date for filtering
  const [endDate, setEndDate] = useState(null); // End date for filtering

  useEffect(() => {
    if (startDate && endDate) {
      fetchOrdersWithDateRange();
    } else {
      fetchOrders();
    }
  }, [id, startDate, endDate]);

  const fetchOrders = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(
        `${BASE_URL}/api/Shipping_get_View/`
      );

      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();
        // Update the orders state with the fetched data
        setOrders(data || []);

        // Calculate total pages
        const totalPages = Math.ceil(data.length / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        // If response is not ok, throw an error
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders data:", error);
      // Handle error
    }
  };

  const fetchOrdersWithDateRange = async () => {
    try {
      // Format start and end dates in the expected format '%d/%m/%Y'
      const formattedStartDate = startDate ? formatDate(startDate) : '';
      const formattedEndDate = endDate ? formatDate(endDate) : '';
  
      // Make a GET request to the API endpoint with start and end dates as query parameters
      const response = await fetch(
        `${BASE_URL}/api/shipping-registrations/search/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      );
  
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
       // Parse the JSON response
const responseData = await response.json();

// Check if responseData contains orders property
if (responseData && responseData.orders) {
  // Update the orders state with the fetched data
  setOrders(responseData.orders);
console.log(responseData);
  // Calculate total pages
  const totalPages = Math.ceil(responseData.orders.length / itemsPerPage);
  setTotalPages(totalPages);
} else {
  // Handle case where responseData.orders is undefined or missing
  throw new Error("Invalid response format: orders property is missing");
}
      } else {
        // If response is not ok, throw an error
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders data:", error);
      // Handle error
    }
  };
  
  
  // Function to format date as 'dd/mm/yyyy'
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  const filteredOrders = orders.filter((order) =>
    order.Reciepient_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.tracking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.Booking_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.Delivery_date.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page to 1 when search query changes
  };

  // Handle start date change
  const handleStartDateChange = (e) => {
    setStartDate(new Date(e.target.value));
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const filterByDateRange = async (range) => {
    try {
      // Construct the API endpoint URL based on the selected range
      const endpoint = `${BASE_URL}/api/shipping-registrations/filter/?filter_type=${range}`;
  
      // Make a GET request to the constructed API endpoint
      const response = await fetch(endpoint);
  
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const responseData = await response.json();
  
        // Extract the orders array from the nested structure
        const ordersArray = responseData.shipping_registrations || [];
  
        // Update the orders state with the fetched data
        setOrders(ordersArray);
  
        // Calculate total pages
        const totalPages = Math.ceil(ordersArray.length / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        // If response is not ok, throw an error
        throw new Error("Failed to fetch filtered orders");
      }
    } catch (error) {
      console.error("Error fetching filtered orders data:", error);
      // Handle error
    }
  };
  
  
  
  

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    filterByDateRange(selectedValue);
  };

  const toggleSidebar = () => {
    setShowFilterSidebar(!showFilterSidebar);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Number of visible page numbers

    // If there are less than or equal to maxVisiblePages, show all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => paginate(i)}>
              {i}
            </button>
          </li>
        );
      }
    } else {
      // Show first page
      pageNumbers.push(
        <li
          key={1}
          className={`page-item ${currentPage === 1 ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => paginate(1)}>
            {1}
          </button>
        </li>
      );

      // Show ellipsis if there are pages before current page
      if (currentPage > maxVisiblePages - 1) {
        pageNumbers.push(
          <li key="ellipsis1" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      // Show pages around the current page
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(
            <li
              key={i}
              className={`page-item ${currentPage === i ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(i)}>
                {i}
              </button>
            </li>
          );
        }
      }

      // Show ellipsis if there are pages after current page
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <li key="ellipsis2" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      // Show last page
      pageNumbers.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => paginate(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
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
          <Row style={{ whiteSpace: "nowrap" }}>
            <Col>
              <div className="input-container">
                <label>Start Date:</label>
                <input
                  className="input"
                  type="date"
                  onChange={handleStartDateChange}
                />
              </div>
            </Col>
            <Col id="lplpk">
              <div id="lplpk" className="input-container">
                <label>End Date:</label>
                <input
                  className="input"
                  type="date"
                  onChange={handleEndDateChange}
                />
              </div>
            </Col>
          </Row>
          <button
            style={{ height: "10%" }}
            className="btn btn-secondary"
            onClick={toggleSidebar}
          >
            Filter
          </button>
        </div>
        {showFilterSidebar && (
          <div className={`sidebar ${showFilterSidebar ? "show" : ""}`}>
            <div className="sidebar-header">
              <h3>Filter</h3>
              <i
                className="fas fa-times close-button"
                onClick={toggleSidebar}
              ></i>
            </div>
            <select
              className="select-dropdown"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Choose an option</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last_7_days">Last 7 days</option>
              <option value="last_30_days">Last 30 days</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              
            </select>
          </div>
        )}

        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-xs-6">
                  <h2>
                    <b>Orders</b>
                  </h2>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th style={{ whiteSpace: "nowrap" }}>Recipient Name</th>
                  <th>Address</th>
                  <th>Tracking ID</th>
                  <th>Booking Date</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={index}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <b>{order.username}</b>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <b>{order.Reciepient_Name}</b>
                    </td>
                    <td>{order.Address}</td>
                    <td>{order.tracking_id}</td>
                    <td>{order.Booking_date}</td>
                    <td>{order.Delivery_date}</td>
                    <td>{order.registration_status}</td>
                    <td>{order.final_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="clearfix">
              <div className="hint-text">
                Showing <b>{currentOrders.length}</b> out of{" "}
                <b>{filteredOrders.length}</b> entries
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
                {renderPageNumbers()}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
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
      </div>
      <Afooter />
    </div>
  );
};

export default Order;
