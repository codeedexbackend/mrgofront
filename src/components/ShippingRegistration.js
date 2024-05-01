import React, { useState } from "react";

import axios from "axios";
import "./Shipping.css";
import { Form, InputGroup, Col, Row } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import { shippingreg } from "../service/allApi";
import { Link, useNavigate } from "react-router-dom";
import { render } from "react-dom";
import { CircleLoader, ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../service/baseUrl";

function ShippingRegistration() {
  const getUserId = () => {
    return localStorage.getItem("id");
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loading spinner visibility

  const [formData, setFormData] = useState({
    Shipping_Through: "",
    Name: "",
    Reciepient_Name: "",
    Mobile: "",
    Pin_Code: "",
    City: "",
    Address: "",
    Consignment: "",
    Content_Type: "",
    Number_of_box: "",
    Declared_value: "",
    user: getUserId(), // Set the user ID here
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

  const handleStepSelect = (selectedStep) => {
    setStepNumber(selectedStep);
    // Retrieve existing form data from local storage
    const storedFormData = JSON.parse(sessionStorage.getItem("formData")) || [];

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
      Name: "",
      Reciepient_Name: "",
      Mobile: "",
      Pin_Code: "",
      City: "",
      Address: "",
      Consignment: "",
      Content_Type: "",
      Number_of_box: "",
      Declared_value: "",
      user: getUserId(),
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
      const userID = getUserId();
      const config = {
        method: "post",
        url: "https://api.mrgo.in/api/ShippingRegView/",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(storedFormData),
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // Handle response as needed, for example, show success message
      toast.success("Form submitted successfully")
      sessionStorage.setItem("userId", formData.user);
      // Clear the form data from session storage after successful submission
      sessionStorage.removeItem("formData");

      // Navigate to the productfinal page with the user ID and invoice number
      navigate(`/invoice/${formData.user}/`);
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
      alert("Failed to submit form data. Please try again later.");
    }
  };

  return (
    <div>
      <Header />
      <div className="shipping-registration">
        {loading && ( // Render spinner if loading state is true
          <div className="loading-spinner">
            <ClipLoader />{" "}
          </div>
        )}
        <div className="container">
          <div className="rows">
            <form className="p-4" onSubmit={handleSubmit}>
              <h3 className="text-center p-2">
                <b>Shipping Registration</b>
              </h3>
              <div className=" p-2">
                <div className="p-2 position-relative">
                  <select
                    className="form-select w-100"
                    value={stepNumber}
                    onChange={(e) => handleStepSelect(parseInt(e.target.value))}
                  >
                    {dropdownOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <Form.Select
                  className="mt-3"
                  id="Shipping_Through"
                  onChange={handleChange}
                  value={formData.Shipping_Through}
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
              <div className="form-group p-2">
                <input
                  type="text"
                  id="Reciepient_Name"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.Reciepient_Name}
                  placeholder="Recipient Name"
                />
              </div>
              <div className="form-group p-2">
                <div className="input-group">
                  <span className="input-group-text">+91</span>
                  <input
                    type="tel"
                    id="Mobile"
                    className="form-control"
                    onChange={(e) => {
                      // Remove non-numeric characters from the input value
                      const numericValue = e.target.value.replace(/\D/g, "");
                      // Update the form data with the numeric value
                      setFormData({ ...formData, Mobile: numericValue });
                    }}
                    value={formData.Mobile}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <InputGroup className=" p-2 container">
                <Form.Control
                  type="text"
                  id="Pin_Code"
                  onChange={handlePincodeChange}
                  value={formData.Pin_Code}
                  aria-label="Pin_Code"
                  placeholder="PIN Code"
                />

                <Form.Control
                  id="City"
                  onChange={handleChange}
                  value={formData.City}
                  aria-label="City"
                  placeholder="City"
                />
              </InputGroup>
              <div className="form-group p-2">
                <input
                  type="text"
                  id="Address"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.Address}
                  placeholder="Address"
                />
              </div>
              <p className="p-2 container">
                <b>Consignment :</b>
              </p>
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
              <div className="p-2 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleNextClick}
                >
                  Next
                </button>
                <Link to={"/productfinal"}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
export default ShippingRegistration;
