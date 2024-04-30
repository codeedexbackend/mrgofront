import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import "./Booking.css";
import AHeader from "./AHeader";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { adminbooking } from "../../service/allApi";
import { BASE_URL } from "../../service/baseUrl";
import axios from "axios";

function CustomAlert({ message, onClose }) {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error:</strong> {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}
function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Name: userName || "",
      user: userId,
    }));
  }, [userId, userName]);
  const [formData, setFormData] = useState({
    Shipping_Through: "",
    Name: userName || "",
    Reciepient_Name: "",
    Mobile: "",
    Pin_Code: "",
    City: "",
    Address: "",
    Consignment: "",
    Content_Type: "",
    Number_of_box: "",
    Declared_value: "",
    user: userId,
  });
  const [stepNumber, setStepNumber] = useState(1);
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "Pin_Code") {
      // Special handling for pincode field
      handlePincodeChange(e); // Call handlePincodeChange directly
    } else if (id === "Consignment_Choices") {
      // Only update the Consignment field
      setFormData({ ...formData, Consignment: value });
    } else {
      let parsedValue;
      if (id === "Number_of_box" || id === "Declared_value") {
        // Only parse as integer if it's Number_of_box or Declared_value
        parsedValue = parseInt(value) || "";
      } else {
        parsedValue = value;
      }
      setFormData({ ...formData, [id]: parsedValue });
    }
  };
  const handleStepSelect = (selectedStep) => {
    setStepNumber(selectedStep);
    // Retrieve existing form data from local storage
    const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
    // Ensure storedFormData is an array
    const updatedFormData = Array.isArray(storedFormData)
      ? [...storedFormData]
      : [];
    // Ensure that all form data up to the selected step is stored in local storage
    for (let i = updatedFormData.length + 1; i <= selectedStep; i++) {
      updatedFormData.push(formData);
    }
    // Update the form data and step number
    setFormData(updatedFormData[selectedStep - 1]);
    setStepNumber(selectedStep);
  };
  const [dropdownOptions, setDropdownOptions] = useState([1]);
  const handleNextClick = () => {
    // Check if all fields are filled
    const isFormFilled =
      formData.Shipping_Through &&
      formData.Reciepient_Name &&
      formData.Mobile &&
      formData.Pin_Code &&
      formData.City &&
      formData.Address &&
      formData.Consignment &&
      (formData.Consignment !== "Non-Document" ||
        (formData.Content_Type &&
          formData.Number_of_box &&
          formData.Declared_value));

    if (!isFormFilled) {
      // If any field is missing, display an alert or perform any other error handling
      alert("Please fill all fields before proceeding.");
      return;
    }

    // If all fields are filled, proceed with updating state and local storage
    setDropdownOptions([...dropdownOptions, dropdownOptions.length + 1]);

    // Retrieve existing form data from session storage
    const storedFormData = JSON.parse(sessionStorage.getItem("formData")) || [];

    // Ensure storedFormData is an array
    const updatedFormData = Array.isArray(storedFormData)
      ? [...storedFormData, { ...formData }] // Copy formData into the array
      : [{ ...formData }]; // Copy formData into a new array

    // Store the updated array in session storage
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));

    // Increment the step number by 1
    setStepNumber(stepNumber + 1);

    // Reset the formData state to its initial state
    setFormData({
      Shipping_Through: "",
      Name: userName,
      Reciepient_Name: "",
      Mobile: "",
      Pin_Code: "",
      City: "",
      Address: "",
      Consignment: "",
      Content_Type: "",
      Number_of_box: "",
      Declared_value: "",
      user: userId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleNextClick();
    // Retrieve form data from session storage
    const storedFormData = JSON.parse(sessionStorage.getItem("formData"));

    if (!storedFormData || !storedFormData.length) {
      console.error("No form data found in session storage.");
      return;
    }

    try {
      const config = {
        method: "post",
        url: "http://15.207.113.102/api/ShippingRegView/",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(storedFormData),
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // Handle response as needed, for example, show success message
toast.success("Booked Successfully")
      // Clear the form data from session storage after successful submission
      sessionStorage.removeItem("formData");
      sessionStorage.setItem("userId", formData.user);

      // Navigate to the productfinal page with the user ID and invoice number
      navigate(`/admin/Product/${formData.user}`);
    } catch (error) {
      console.error(error);

      // Handle error, show error message, etc.
      alert("Failed to submit form data. Please try again later.");
    }
  };

  const handlePincodeChange = async (e) => {
    let pincode = e.target.value.replace(/\D/g, "").substring(0, 6);

    setFormData((prevFormData) => ({
      ...prevFormData,
      Pin_Code: pincode,
    }));

    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/fetch_location/?pin_code=${pincode}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            const firstResult = data[0];
            const city = firstResult.city;
            const address = firstResult.district;
            setFormData((prevFormData) => ({
              ...prevFormData,
              City: city,
              Address: address,
            }));
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              City: "",
              Address: "",
            }));
          }
        } else {
          console.error("Failed to fetch address details");
        }
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    }
  };

  return (
    <div>
      <AHeader></AHeader>
      {loading && (
        <div className="loading-overlay">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="alert-container">
          <p>{alertMessage}</p>
          <button className="close-button" onClick={() => setShowAlert(false)}>
            <span>&times;</span>
          </button>
        </div>
      )}
      <h2 className="text-center">Booking</h2>
      <div className="container p-5">
        <div className="row gutters">
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 w-100">
            <div className="card h-100" style={{ border: "1px solid black" }}>
              <div className="card-body">
                <div className="row gutters p-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Customer Details</h6>
                  </div>
                  <div className="p-2 position-relative">#{stepNumber}</div>
                  {/* {dropdownOptions.map((option) => (
                    <FontAwesomeIcon key={option} icon={faEllipsis} className="position-absolute end-0 top-50 translate-middle-y option-icon" />
                  ))} */}

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="">
                      <Form.Select
                        id="Shipping_Through"
                        onChange={handleChange}
                        value={formData.Shipping_Through}
                        /* or value="" */
                      >
                        <option disabled value="">
                          Shipping Through
                        </option>
                        <option>DTDC</option>
                        <option>TRACKON</option>
                        <option>SPEED POST</option>
                        <option>PROFESSIONAL</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.Reciepient_Name}
                        className="form-control"
                        id="Reciepient_Name"
                        placeholder="Enter Recipient name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-3">
                      <input
                        type="tel"
                        className="form-control"
                        id="Mobile"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={formData.Mobile}
                        onKeyDown={(e) => {
                          // Allow only numeric keys and certain control keys
                          if (
                            !(
                              e.key === "Backspace" ||
                              e.key === "Tab" ||
                              e.key === "ArrowLeft" ||
                              e.key === "ArrowRight" ||
                              e.key === "Delete" ||
                              (e.key >= "0" && e.key <= "9")
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        id="Pin_Code"
                        onChange={handlePincodeChange}
                        value={formData.Pin_Code}
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        id="City"
                        onChange={handleChange}
                        value={formData.City}
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text "
                        className="form-control"
                        id="Address"
                        onChange={handleChange}
                        value={formData.Address}
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={"UserName : " + formData.Name}
                        className="form-control"
                        id="Name"
                        placeholder="Enter Full Name"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters p-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Consignment</h6>
                  </div>
                  <Form className="p-2">
                    <Row className="mb-3">
                      <Col>
                        <Form.Check
                          type="radio"
                          id="Consignment_Choices"
                          label="Document"
                          name="Consignment"
                          value="Document"
                          onChange={handleChange}
                          checked={formData.Consignment === "Document"}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          id="Consignment_Choices"
                          label="Non-Document"
                          name="Consignment"
                          value="Non-Document"
                          onChange={handleChange}
                          checked={formData.Consignment === "Non-Document"}
                        />
                      </Col>
                    </Row>
                  </Form>
                  {formData.Consignment === "Non-Document" && (
                    <div>
                      <div className="form-group p-2">
                        <Form.Select
                          id="Content_Type"
                          onChange={handleChange}
                          value={formData.Content_Type}
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
                        </Form.Select>
                      </div>
                      <div className="form-group p-2">
                        <input
                          type="text"
                          id="Number_of_box"
                          className="form-control"
                          onChange={handleChange}
                          value={formData.Number_of_box}
                          placeholder="Number of Box"
                        />
                      </div>
                      <div className="form-group p-2">
                        <input
                          type="text"
                          id="Declared_value"
                          className="form-control"
                          onChange={handleChange}
                          value={formData.Declared_value}
                          placeholder="Declared Value"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right p-3" style={{ display: "flex" }}>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-secondary me-4"
                        onClick={handleNextClick}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default Booking;
