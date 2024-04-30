import React, { useState, useEffect } from "react";
import "./UserControl.css";
import { Link } from "react-router-dom";
import { allprofileviewApi, cleanShipping } from "../../service/allApi";

const Request = () => {
  const [employees, setEmployees] = useState([]); // State to hold employees data
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [itemsPerPage] = useState(10); // Set the number of items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await allprofileviewApi();
      if (response && response.data && Array.isArray(response.data)) {
        // Sort the data based on the ID in descending order to display newer users first
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setEmployees(sortedData); // Set employees state with sorted data
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
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchFields = [
      employee.Shipping_Through?.toLowerCase() || "",
      employee.Content_Type?.toLowerCase() || "",
      employee.full_name?.toLowerCase() || "",
      employee.email?.toLowerCase() || "",
      employee.primary_address?.toLowerCase() || "",
      typeof employee.mobile === "string" ? employee.mobile.toLowerCase() : "",
    ];
    return searchFields.some((field) =>
      field.includes(searchQuery.toLowerCase())
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const dateA = new Date(a.Booking_date).getTime();
    const dateB = new Date(b.Booking_date).getTime();
    return dateB - dateA; // Sort in descending order (newest first)
  });
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle clearing data
  const handleClearData = async () => {
    // Show a confirmation dialog
    const confirmClear = window.confirm("Are you sure want to clear 2 months shipping data?");
    // If user confirms, proceed with clearing data
    if (confirmClear) {
      try {
        // Call the cleanShipping API function to clear data
        const response = await cleanShipping(); // Remove bodyData parameter
        console.log("Response from cleanShipping:", response); // Log the response object for debugging
        // If successful response, refetch the data
        if (response && response.data && response.data.message.includes('Deleted')) {
          await fetchData();
          console.log("Data cleared successfully.");
        } else {
          console.error("Failed to clear data. Error:", response && response.data && response.data.message ? response.data.message : "Unknown error occurred");
        }
      } catch (error) {
        console.error("Error clearing data:", error);
      }
    }
  };

  return (
    <div className="container">
        {loading && ( // Conditionally render loading animation
        <div className="loading-overlay">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
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
            <div className="col-xs-6 d-flex justify-content-between align-items-center">
                <h2>User <b>Requests</b></h2>
                <button onClick={handleClearData} className="btn btn-secondary">Clear Data</button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link to={`/admin/${employee.id}`}>
                      {employee.full_name}
                    </Link>
                  </td>
                  <td>{employee.email}</td>
                  <td>
                    {employee.primary_address}, {employee.secondary_address}{" "}
                    {employee.state}, {employee.city} <br /> {employee.pincode}
                  </td>
                  <td>{employee.mobile}</td>
                  <td>
                    <Link
                      to={`/admin/Booking?userId=${employee.id}&userName=${employee.full_name}`}
                      className="btn btn-primary"
                    >
                      <span style={{ color: "white" }}>Booking</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>{currentItems.length}</b> out of{" "}
              <b>{filteredEmployees.length}</b> entries
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
                { length: Math.ceil(filteredEmployees.length / itemsPerPage) },
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
                  currentPage ===
                  Math.ceil(filteredEmployees.length / itemsPerPage)
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
    </div>
  );
};

export default Request;