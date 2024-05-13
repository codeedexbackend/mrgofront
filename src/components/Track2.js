import React, { useEffect, useState } from "react";
import "./Track.css";
import { tracking } from "../service/allApi";
import TrackHead from "../Admin/Pages/TrackHead";
import { ToastContainer, toast } from "react-toastify";

function Track2() {
  const [loading, setLoading] = useState(false); // State variable for loading

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
    const storedTrackingId = localStorage.getItem("tracking_id");
    if (storedTrackingId) {
      fetchTrackingDetails(storedTrackingId);
    }
  }, []);

  const fetchTrackingDetails = async (tracking_id) => {
    try {
      setLoading(true);
      const details = await tracking(tracking_id);
      setTrackingDetails(details);
      setLoading(false); // Set loading to false only on successful response
    } catch (error) {
      console.error("Error fetching tracking details:", error);
      setLoading(false); // Set loading to false on error as well
      toast.error("Invalid Tracking id");

    }
    
  };

 
  const handleShowTrackingHistory = () => {
    setShowTrackingHistory(true);
  };

  return (
    <div style={{ position: "relative" }}>
      
      {loading && (
        <div className="loading-overlay">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
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

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Track2;
