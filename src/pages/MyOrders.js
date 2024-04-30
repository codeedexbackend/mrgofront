import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { orderview } from "../service/allApi";

const MyOrders = () => {
    const { id } = useParams(); // Extracting user_id from route params
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOrders(id);
    }, [id]);

    const fetchOrders = async (user_id) => {
        try {
            const data = await orderview(user_id); // Using user_id from route params
            setOrders(data || []);
        } catch (error) {
            console.error("Error fetching orders data:", error);
            // Handle error
        }
    };

    // Logic to get current orders based on pagination and search query
    const filteredOrders = orders.filter(order =>
        order.Reciepient_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset current page to 1 when search query changes
    };

    return (
        <div>
            <Header />
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
                                    <h2>My <b>Orders</b></h2>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th style={{whiteSpace:'nowrap'}}>Recipient Name</th>
                                    <th>Address</th>
                                    <th>Tracking ID</th>
                                    <th>Booking Date</th>
                                    <th>Delivery Date</th>
                                    <th>Status</th>
                                    <th>Print</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td style={{ whiteSpace: "nowrap" }}><b>{order.Reciepient_Name}</b></td>
                                        <td>{order.Address}</td>
                                        <td>{order.tracking_id}</td>
                                        <td>{order.Booking_date}</td>
                                        <td>{order.Delivery_date}</td>
                                        <td>{order.registration_status}</td>
                                        <td>
                                            <Link to={`/label/${id}/${order.id}`}>
                                                <button className="btn btn-outline"><i className="fa-solid fa-print"></i></button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     {/* Pagination */}
<div className="clearfix">
<div className="hint-text">
                        Showing <b>{currentOrders.length}</b> out of <b>{filteredOrders.length}</b> entries
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
      { length: Math.ceil(filteredOrders.length / itemsPerPage) },
      (_, i) => {
        const pageNumber = i + 1;
        const isCurrentPage = pageNumber === currentPage;
        const showEllipsis = 
          (pageNumber === currentPage - 2 && currentPage > 3) ||
          (pageNumber === currentPage + 2 && currentPage < Math.ceil(filteredOrders.length / itemsPerPage) - 2);
          
        return (
          <>
            {showEllipsis && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            {!showEllipsis && (
              <li
                key={i}
                className={`page-item ${isCurrentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )}
          </>
        );
      }
    )}
    <li
      className={`page-item ${
        currentPage === Math.ceil(filteredOrders.length / itemsPerPage)
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
        </div>
    );
};

export default MyOrders;
