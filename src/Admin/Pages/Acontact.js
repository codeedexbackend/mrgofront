import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Acontact.css";
import AHeader from "./AHeader";
import { contactusdelete, contactview } from "../../service/allApi";
import Afooter from "./Afooter";
function Acontact() {
  const [contactData, setContactData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [tickedContacts, setTickedContacts] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contactview();
        setContactData(response.data);
        // Calculate the count of unread messages
        const unreadMessages = response.data.filter((contact) => !contact.viewed);
        setUnreadCount(unreadMessages.length);
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const storedTickedContacts =
      JSON.parse(localStorage.getItem("tickedContacts")) || {};
    setTickedContacts(storedTickedContacts);
  }, []);
  const handleTickClick = (id) => {
    const updatedTickedContacts = { ...tickedContacts, [id]: true };
    setTickedContacts(updatedTickedContacts);
    localStorage.setItem(
      "tickedContacts",
      JSON.stringify(updatedTickedContacts)
    );
  };
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };
  const handleDelete = async () => {
    try {
      await contactusdelete({}, deleteId);
      // Filter out the deleted contact from the contactData array
      const updatedData = contactData.filter((contact) => contact.id !== deleteId);
      setContactData(updatedData);
      setShowConfirmation(false); // Close the confirmation dialog after deletion
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  
  const filteredAndPagedOrders = contactData.filter(notification =>
    (notification.username && notification.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (notification.message && notification.message.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const renderPageNumbers = () => {
    const pageNumbers = [];
  
    // Function to determine if a page number should be displayed
    const shouldDisplayPage = (pageNumber) => {
      return (
        pageNumber === 1 || // Always show the first page
        pageNumber === totalPages || // Always show the last page
        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) || // Show pages around the current page
        currentPage === pageNumber // Always show the current page
      );
    };
  
    for (let i = 1; i <= totalPages; i++) {
      if (shouldDisplayPage(i)) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
            <button className="page-link" onClick={() => paginate(i)}>
              {i}
            </button>
          </li>
        );
      } else if (pageNumbers.length > 0 && pageNumbers[pageNumbers.length - 1].key !== "ellipsis") {
        // Add ellipsis if the previous page number is not an ellipsis
        pageNumbers.push(
          <li key="ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }
    return pageNumbers;
  };
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredAndPagedContacts = contactData.filter(contact =>
    (contact.Name && contact.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (contact.message && contact.message.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contactData.length / itemsPerPage);

 

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div>
      <AHeader unreadCount={unreadCount} />
     
      <div>
        {filteredAndPagedContacts?.length > 0 ? (
          <div>
            {filteredAndPagedContacts.map((contact) => (
              <div key={contact.id} className="container2">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/admin/Acontact/${contact.id}`}
                  state={{ contact }}
                >
                  <div className="contact-item">
                    <div
                      className="info-item"
                      onClick={() => handleTickClick(contact.id)}
                    >
                      <strong>Name:</strong> {contact.Name}
                    </div>
                  </div>
                </Link>
                <div style={{ disply: "flex" }}>
                  <button
                    className={`tick-button ${
                      tickedContacts[contact.id] ? "ticked" : ""
                    }`}
                    onClick={() => handleTickClick(contact.id)}
                    disabled={tickedContacts[contact.id]}
                  >
                    {tickedContacts[contact.id] ? "Viewed" : "Mark as read"}
                  </button>
                  <button
                    className="btn btn-danger btn11 text-end"
                    onClick={() => handleDeleteConfirmation(contact.id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
            <br />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
        {/* Pagination */}
      <div className="clearfix mt-3">
        <div className="hint-text">
          Showing <b>{filteredAndPagedContacts.length}</b> out of <b>{contactData.length}</b> entries
        </div>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Previous
            </button>
          </li>
          {renderPageNumbers()}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this contact?</p>
            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer /> 
      <Afooter></Afooter>
    </div>
  );
}

export default Acontact; 



