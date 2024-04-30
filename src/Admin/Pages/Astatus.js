import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AHeader from "./AHeader";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function Astatus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  const handleStatusSelect = async () => {
    try {
      const response = await fetch('http://15.207.113.102/api/update-tracking-status/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tracking_ids: trackingCode.split(","), // Split trackingCode into an array
          status: selectedStatus
        })
      });

      if (response.ok) {
        // Status updated successfully
        console.log('Status updated successfully');
      } else {
        // Handle error response
        console.error('Failed to update status');
        toast.error("invalid id")
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
      toast.error(error);

    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <AHeader />
      <div className="search-containerr">
        <div className="w-50 container">
          <textarea
            placeholder="Tracking Code "
            className="search-textarea"
            style={{ width: "100%", height: "200px", fontSize: "18px" }}
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
          />
        </div>
        <div className="container" style={{ width: '8%', marginLeft: '61%' }}>
          <button
            onClick={handleButtonClick}
            type="submit"
            className="search-button"
            style={{ fontSize: "14px", padding: "10px" }}
          >
            <span className="button-text text-black">Update</span>
            <FontAwesomeIcon icon={faUpload} className="ms-3" />
          </button>
        </div>
      </div>
      
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="radio"
              id="Placed"
              name="status"
              value="Placed"
              onChange={() => setSelectedStatus("Placed")}
            />
            <label htmlFor="placed">Placed</label>
          </div>
          <div>
            <input
              type="radio"
              id="Shipped"
              name="status"
              value="Shipped"
              onChange={() => setSelectedStatus("Shipped")}
            />
            <label htmlFor="shipped">Shipped</label>
          </div>
          <div>
            <input
              type="radio"
              id="Collected"
              name="status"
              value="Collected"
              onChange={() => setSelectedStatus("Collected")}
            />
            <label htmlFor="collected">Collected</label>
          </div>
          <div>
            <input
              type="radio"
              id="Returned"
              name="status"
              value="Returned"
              onChange={() => setSelectedStatus("Returned")}
            />
            <label htmlFor="returned">Returned</label>
          </div>
          <div>
            <input
              type="radio"
              id="Delivered"
              name="status"
              value="Delivered"
              onChange={() => setSelectedStatus("Delivered")}
            />
            <label htmlFor="delivered">Delivered</label>
          </div>
        </Modal.Body>
        <Button onClick={handleStatusSelect}>Submit</Button>
      </Modal>
      
      <ToastContainer></ToastContainer>
      <Astatus></Astatus>
    </div>
  );
}

export default Astatus;  