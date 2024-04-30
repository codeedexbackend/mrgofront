import React, { useEffect, useState } from "react";
import './Atrack.css'
import TrackHead from "./TrackHead";
import { tracking } from "../../service/allApi";
import AHeader from "./AHeader";
import Afooter from "./Afooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function Track() {
  const [loading, setLoading] = useState(false); // State variable for loading
  const [showResults, setShowResults] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState({
    status: "Placed",
    tracking_id: "",
    bookingDate: "",
    address: "",
    pinCode: "",
    city: "",
    placedUpdatedAt: "",
    pickedUpdatedAt: "",
    shippedUpdatedAt: "",
    deliveredUpdatedAt: "",
    shippingThrough: "",
    recipientName: "",
    mobile: "",
    consignment: "",
    contentType: "",
    numberOfBox: "",
    declaredValue: "",
    thirdPartyTrackingId: ""
  });
  const [showTrackingHistory, setShowTrackingHistory] = useState(false);

  const getStatusIndex = (status) => {
    const statuses = ["Placed", "Collected", "Shipped", "Delivered","Returned"];
    return statuses.indexOf(status);
  };

  const calculateProgress = () => {
    if (trackingDetails) {
      const statuses = ["Placed", "Picked", "Shipped", "Delivered","Returned"];
      const currentStatusIndex = statuses.indexOf(trackingDetails.status);
      return ((currentStatusIndex + 1) / statuses.length) * 100;
    }
    return 0;
  };

  useEffect(() => {
    const storedTrackingId = sessionStorage.getItem("trackingid"); // Retrieve tracking ID from session storage
    if (storedTrackingId) {
      fetchTrackingDetails(storedTrackingId); // Fetch tracking details using the retrieved tracking ID
      setShowResults(true); // Update showResults state to true to display the search results
    }
  }, []);
  
  

  const fetchTrackingDetails = async (tracking_id) => {
    try {
      setLoading(true);
      const details = await tracking(tracking_id);
      setTrackingDetails(details);
      setLoading(false); // Set loading to false only on successful response
      console.log(details);
    } catch (error) {
      console.error("Error fetching tracking details:", error);
      setLoading(false); // Set loading to false on error as well
    }
    
  };

 
  const handleShowTrackingHistory = () => {
    setShowTrackingHistory(true);
  };
  const handleButtonClick = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior
    const trackingId = event.target.form[0].value; // Get the value from the input field
    
    try {
      setLoading(true); // Set loading state to true while fetching
      const details = await tracking(trackingId); // Fetch tracking details
      setTrackingDetails(details); // Update tracking details state with fetched data
      setLoading(false); // Set loading state to false after fetching
      setShowResults(true); // Display the search results
      sessionStorage.setItem("trackingid", trackingId); // Save the tracking ID to session storage
    } catch (error) {
      console.error("Error fetching tracking details:", error);
      setLoading(false); // Set loading state to false on error
      toast.error("invalid tracking id");

    }
  };
  
  
  return (
    <div style={{ position: "relative" }}>
      
      <AHeader />
      <div className="search-container">
        <form style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Tracking Code"
            className="search-input"
          />
          <br />
          <button
            onClick={handleButtonClick}
            type="submit"
            className="search-button ms-5"
          >
            <span className="button-text">Search</span>
            <FontAwesomeIcon icon={faSearch} className="ms-3" />
          </button>
        </form>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      {showResults && (
      <div className="search-results">
        <div className="container padding-bottom-3x mb-1" style={{ marginTop: "80px" }}>
          <div className="App">
            <TrackHead />
            <table className="mt-3">
              <thead border="1">
                <tr>
                  <th className="mx-5 pe-5">
                    <b>Tracking No.</b>
                  </th>
                  <th className="pe-5">
                    {trackingDetails ? trackingDetails.tracking_id : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Last Status</b>
                  </td>
                  <td>
                    <i className="fa-solid fa-circle text-success fs-4"></i>{" "}
                    <b style={{ color: "blueviolet" }}>
                      {trackingDetails ? trackingDetails.status : ""}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="mx-5">
                    <b>Booking Date.</b>
                  </td>
                  <td>{trackingDetails ? trackingDetails.bookingDate : ""}</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div>
              <h5 style={{ textDecoration: "underline" }}>Shipment Details</h5>
            </div>
            <hr />
            <div className="table-container" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="mt-3 shipment-details">
                <thead border="1">
                  <tr>
                    <th className="mx-5 pe-5">
                      <b>Shipping through</b>
                    </th>
                    <th className="pe-5">
                      {trackingDetails ? trackingDetails.shippingThrough : ""}
                    </th>
                    <th className="pe-5">
                      <b>Destination City</b>
                    </th>
                    <th className="pe-5">
                      {trackingDetails ? trackingDetails.city : ""}
                    </th>
                    <th className="pe-5">
                      <b>Destination Pincode</b>
                    </th>
                    <th className="pe-5">
                      {trackingDetails ? trackingDetails.pinCode : ""}
                    </th>
                    <th className="pe-5">
                      <b>Destination Address</b>
                    </th>
                    <th className="pe-5">{trackingDetails ? trackingDetails.address : ""}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mx-5">
                      <b>Consignment</b>
                    </td>
                    <td>{trackingDetails ? trackingDetails.consignment : ""}</td>
                    <td>
                      <b>Content Type</b>
                    </td>
                    <td>{trackingDetails ? trackingDetails.contentType : ""}</td>
                  </tr>
                  <tr>
                    <td className="mx-5">
                      <b>Number Of boxes</b>
                    </td>
                    <td className="ps-3">{trackingDetails ? trackingDetails.numberOfBox : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <h5 style={{ textDecoration: "underline" }}>Receiver Details</h5>
            <hr />
            <div className="table-container" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="mt-3 receiver-details">
                <thead border="1">
                  <tr>
                    <th className="mx-5 pe-5">
                      <b>Receiver Name</b>
                    </th>
                    <th className="pe-5">{trackingDetails ? trackingDetails.recipientName : ""}</th>
                    <th className="pe-5">
                      <b>Destination City</b>
                    </th>
                    <th className="pe-5">
                      {trackingDetails ? trackingDetails.city : ""}
                    </th>
                    <th className="pe-5">
                      <b>Destination Pincode</b>
                    </th>
                    <th className="pe-5">
                      {trackingDetails ? trackingDetails.pinCode : ""}
                    </th>
                    <th className="pe-5">
                      <b>Destination Address</b>
                    </th>
                    <th className="pe-5">{trackingDetails ? trackingDetails.address : ""}</th>
                  </tr>
                </thead>
              </table>
            </div>
            <hr />
            <div className="bg-primary d-flex" style={{ height: "50px" }}>
              <span className="d-flex p-1">
                <h5
                  className="p-3 mt-0"
                  style={{ color: "white", textDecoration: "underline white" }}
                  onClick={handleShowTrackingHistory}
                >
                  Track
                </h5>
                <a style={{ marginLeft: "1200px" }} href="">
                  <i className="fa-solid fa-circle-plus fs-2 text-white"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
)}
      {showTrackingHistory && (
  <div className="container padding-bottom-3x mb-1" style={{ marginTop: "80px" }}>
    <div className="card mb-3 trackorder" style={{ width: "100%" }}>
      <div className="" id="vv">
        Track your Order{" "}
      </div>
      <hr />
      <div className="progress-bar" style={{ width: "100%" }}>
        <div
          className="progress-bar__fill"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      <div className="card-body mt-3">
      <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
  {["Placed", "Collected", "Shipped", "Delivered"].map((step, index) => (
    <div
      key={index}
      className={`step ${
        trackingDetails &&
        getStatusIndex(trackingDetails.status) >= index
          ? "completed"
          : ""
      }`}
    >
      <div className="step-icon-wrap">
        <div className="step-icon">
          <i
            className={`fa-solid ${
              getStatusIndex(trackingDetails.status) >= index
                ? "fa-check"
                : ""
            }`}
          ></i>
        </div>
      </div>
      <h4 className="step-title">{step}</h4>
    </div>
  ))}
  {trackingDetails.status === "Returned" && (
    <div
      key="Returned"
      className={`step ${
        trackingDetails &&
        getStatusIndex(trackingDetails.status) >= 4
          ? "completed"
          : ""
      }`}
    >
      <div className="step-icon-wrap">
        <div className="step-icon">
          <i
            className={`fa-solid ${
              getStatusIndex(trackingDetails.status) >= 4
                ? "fa-check"
                : ""
            }`}
          ></i>
        </div>
      </div>
      <h4 className="step-title">Returned</h4>
    </div>
  )}
</div>

        <p id="v">
        {trackingDetails ? (
  trackingDetails.status === "Placed" ? 
    `Your order is placed on ${new Date(trackingDetails.placedUpdatedAt).toLocaleString()}` :
    trackingDetails.status === "Collected" ?
    `Your order is collected on ${new Date(trackingDetails.pickedUpdatedAt).toLocaleString()}` :
    trackingDetails.status === "Shipped" ?
    `Your order is shipped on ${new Date(trackingDetails.shippedUpdatedAt).toLocaleString()}` :
    trackingDetails.status === "Returned" ?
    `Your order is returned on ${new Date(trackingDetails.returnedUpdatedAt).toLocaleString()}` :
    `Your order has been delivered on ${new Date(trackingDetails.deliveredUpdatedAt).toLocaleString()}`
) : ""}

        </p>
      </div>
    </div>
  </div>
)}


      <Afooter />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Track;
