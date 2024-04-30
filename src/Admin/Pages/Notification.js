import React, { useState, useEffect } from 'react';
import './Notification.css';
import AHeader from './AHeader';
import Afooter from './Afooter';
import { notifaction, deletenotifaction } from '../../service/allApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await notifaction({});
      const formattedNotifications = response.data.map(notification => ({
        ...notification,
        timestamp: formatTimestamp(notification.timestamp)
      }));
      setNotifications(formattedNotifications.reverse() || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString('en-GB');
    return `${formattedTime} ${formattedDate}`;
  };

  const filteredNotifications = notifications.filter(notification =>
    (notification.username && notification.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await deletenotifaction({}, deleteId);
      fetchNotifications();
      setShowConfirmation(false);
      toast.success("Notification deleted successfully!");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification.");
    }
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredNotifications.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <AHeader />
      <div style={{ display: "flex"}}>
        <input
          style={{marginLeft:'5%'}}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input2"
        />
      </div>
      <div className="container notifications-container shadow mt-4">
        <div id='iop'>
          <div className="row header">
            <div className="col-7">
            <p className="title">
  Notifications
  <span className="unread-notifications-number">{filteredNotifications.length}</span>
</p>

            </div>
           
          </div>
          <div className="row notifications">
            <div className="col-12">
              {currentOrders.map((notification, index) => (
                <div key={index} className={`row single-notification-box ${notification.read ? 'read' : 'unread'}`}>
                  <div className="col-11 notification-text">
                    <p>
                      <span href="#" className="link name">{notification.username}</span>
                      <span className="description">{notification.message}</span>
                      <span className="unread-symbol">•</span>
                    </p>
                    <p className="time">{notification.timestamp}</p>
                  </div>
                  <div className="col-1 delete-button-container">
                    <button className="btn btn-danger" onClick={() => handleDeleteConfirmation(notification.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="clearfix mt-3">
        <div className="hint-text">
          Showing <b>{currentOrders.length}</b> out of <b>{filteredNotifications.length}</b> entries
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
            { length: Math.ceil(filteredNotifications.length / itemsPerPage) },
            (_, i) => {
              const pageNumber = i + 1;
              const isCurrentPage = pageNumber === currentPage;
              const showPageNumber =
                pageNumber === 1 ||
                pageNumber === Math.ceil(filteredNotifications.length / itemsPerPage) ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

              return (
                <>
                  {showPageNumber && (
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
              currentPage === Math.ceil(filteredNotifications.length / itemsPerPage)
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
      <Afooter />
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this notification?</p>
            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Notification;
