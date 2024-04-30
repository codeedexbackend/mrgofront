// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import "./Booking.css";
// import AHeader from "./AHeader";
// import Form from "react-bootstrap/Form";
// import { Col, Row } from "react-bootstrap";
// import { adminbooking } from "../../service/allApi";

// function Booking() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get("userId");
//   const userName = searchParams.get("userName");
//   useEffect(() => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       Name: userName || "",
//       user: userId,
//     }));
//   }, [userId, userName]);

//   const [formData, setFormData] = useState({
//     Shipping_Through: "",
//     Name: userName || "", // Set initial value of Name to userName from URL params
//     Recipient: "",
//     Mobile: "",
//     Pin_Code: "",
//     City: "",
//     Address: "",
//     Consignment: "",
//     Content_Type: "",
//     Number_of_box: "",
//     Declared_value: "",
//     user: userId,
//   });

//   const [stepNumber, setStepNumber] = useState(1);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     if (id === "Consignment_Choices") {
//       // Only update the Consignment field
//       setFormData({ ...formData, Consignment: value });
//     } else {
//       let parsedValue;
//       if (id === "Number_of_box" || id === "Declared_value" || id === "Mobile" || id === "Pin_Code") {
//         parsedValue = parseInt(value) || ""; // If parsing fails, set to empty string
//       } else {
//         parsedValue = value;
//       }

//       // If the changed input is "user", also update the ID in formData
//       if (id === "user") {
//         setFormData({ ...formData, [id]: parsedValue, id: parsedValue });
//       } else {
//         setFormData({ ...formData, [id]: parsedValue });
//       }
//     }
//   };

//   const handleStepSelect = (selectedStep) => {
//     setStepNumber(selectedStep);
//     // Retrieve existing form data from local storage
//     const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];

//     // Ensure storedFormData is an array
//     const updatedFormData = Array.isArray(storedFormData)
//       ? [...storedFormData]
//       : [];

//     // Ensure that all form data up to the selected step is stored in local storage
//     for (let i = updatedFormData.length + 1; i <= selectedStep; i++) {
//       updatedFormData.push(formData);
//     }

//     // Update the form data and step number
//     setFormData(updatedFormData[selectedStep - 1]);
//     setStepNumber(selectedStep);
//   };
//   const [dropdownOptions, setDropdownOptions] = useState([1]);

//   const handleNextClick = () => {
//     // Check if all fields are filled
//     const isFormFilled =
//       formData.Shipping_Through &&
//       formData.Name &&
//       formData.Recipient &&
//       formData.Mobile &&
//       formData.Pin_Code &&
//       formData.City &&
//       formData.Address &&
//       formData.Consignment &&
//       formData.user &&
//       (formData.Consignment !== "Non-Document" ||
//       (formData.Content_Type &&
//           formData.Number_of_box &&
//           formData.Declared_value));

//     if (!isFormFilled) {
//       // If any field is missing, display an alert or perform any other error handling
//       alert("Please fill all fields before proceeding.");
//       return;
//     }

//     // If all fields are filled, proceed with updating state and local storage
//     setDropdownOptions([...dropdownOptions, dropdownOptions.length + 1]);
//     setFormData({
//       Shipping_Through: "",
//       Name: userName || "",
//       Recipient: "",
//       Mobile: "",
//       Pin_Code: "",
//       City: "",
//       Address: "",
//       user: userId,
//       Consignment: "",
//       Content_Type: "",
//       Number_of_box: "",
//       Declared_value: "",
//     });
//     // Retrieve existing form data from local storage
//     const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
//     // Ensure storedFormData is an array
//     const updatedFormData = Array.isArray(storedFormData)
//       ? [...storedFormData, formData]
//       : [formData];
//     // Store the updated array in local storage
//     localStorage.setItem("formData", JSON.stringify(updatedFormData));
//     // Increment the step number by 1
//     setStepNumber(stepNumber + 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Retrieve current form data from state
//       const currentFormData = formData;

//       // Retrieve form data from local storage
//       const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];

//       // Merge current form data with data from local storage
//       const mergedFormData = [...storedFormData, currentFormData];

//       // Iterate over each form data entry and send it to the server
//       for (const formDataEntry of mergedFormData) {
//         // Call shippingreg API function with formDataEntry
//         const response = await adminbooking(formDataEntry);
//         console.log("API response:", response);
//       }

//       // Clear form data in local storage after successful submission
//       localStorage.removeItem("formData");

//       // Clear form data in the UI and reset the form after successful submission
//       setFormData({
//         Shipping_Through: "",
//         Name: userName || "",
//         Recipient: "",
//         Mobile: "",
//         Pin_Code: "",
//         City: "",
//         Address: "",
//         user: userId,
//         Consignment: "",
//         Content_Type: "",
//         Number_of_box: "",
//         Declared_value: "",
//       });

//       // Reset step number to 1
//       setStepNumber(1);
//       navigate(`/admin/Product/${formData.user}`);
//       // Optionally, perform any other action after successful submission
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Optionally, handle errors and show an error message to the user
//     }
//   };
// console.log(formData.Mobile);
//  console.log(formData.Pin_Code);

//   return (
//     <div>
//       <AHeader></AHeader>
//       <h2 className="text-center">Booking</h2>
//       <div className="container p-5">
//         <div className="row gutters">
//           <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 w-100">
//             <div className="card h-100" style={{ border: "1px solid black" }}>
//               <div className="card-body">
//                 <div className="row gutters p-2">
//                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                     <h6 className="mb-2 text-primary">Customer Details</h6>
//                   </div>
//                   <div className="p-2 position-relative">
//                     <select
//                       className="form-select w-100 "
//                       value={stepNumber}
//                       onChange={(e) =>
//                         handleStepSelect(parseInt(e.target.value))
//                       }
//                     >
//                       {dropdownOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {/* {dropdownOptions.map((option) => (
//                     <FontAwesomeIcon key={option} icon={faEllipsis} className="position-absolute end-0 top-50 translate-middle-y option-icon" />
//                   ))} */}

//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
//                     <div className="">
//                       <Form.Select
//                         id="Shipping_Through"
//                         onChange={handleChange}
//                         value={formData.Shipping_Through}
//                         /* or value="" */
//                       >
//                         <option disabled value="">
//                           Shipping Through
//                         </option>
//                         <option>DTDC</option>
//                         <option>TRACKON</option>
//                         <option>SPEED POST</option>
//                         <option>PROFESSIONAL</option>
//                       </Form.Select>
//                     </div>
//                   </div>

//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                   

//                     <div className="form-group">
//                       <input
//                         type="text"
//                         onChange={handleChange}
//                         value={formData.Recipient}
//                         className="form-control"
//                         id="Recipient"
//                         placeholder="Enter Recipient name"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
//                     <div className="form-group mt-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="Mobile"
//                         placeholder="Phone Number"
//                         onChange={handleChange}
//                         value={formData.Mobile}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
//                     <div className="form-group mt-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="City"
//                         onChange={handleChange}
//                         value={formData.City}
//                         placeholder="City"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
//                     <div className="form-group mt-3">
//                       <input
//                         type="text "
//                         className="form-control"
//                         id="Address"
//                         onChange={handleChange}
//                         value={formData.Address}
//                         placeholder="Address"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
//                     <div className="form-group mt-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="Pin_Code"
//                         onChange={handleChange}
//                         value={formData.Pin_Code}
//                         placeholder="PIN Code"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
//                   <div className="form-group">
//                       <input
//                         type="text"
//                         onChange={handleChange}
//                         value={'UserName : '+formData.Name}
//                         className="form-control"
//                         id="Name"
//                         placeholder="Enter Full Name"
//                         disabled
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row gutters p-2">
//                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                     <h6 className="mt-3 mb-2 text-primary">Consignment</h6>
//                   </div>
//                   <Form className="p-2">
//                     <Row className="mb-3">
//                       <Col>
//                         <Form.Check
//                           type="radio"
//                           id="Consignment_Choices"
//                           label="Document"
//                           name="Consignment"
//                           value="Document"
//                           onChange={handleChange}
//                           checked={formData.Consignment === "Document"}
//                         />
//                       </Col>
//                       <Col>
//                         <Form.Check
//                           type="radio"
//                           id="Consignment_Choices"
//                           label="Non-Document"
//                           name="Consignment"
//                           value="Non-Document"
//                           onChange={handleChange}
//                           checked={formData.Consignment === "Non-Document"}
//                         />
//                       </Col>
//                     </Row>
//                   </Form>
//                   {formData.Consignment === "Non-Document" && (
//                     <div>
//                       <div className="form-group p-2">
//                         <Form.Select
//                           id="Content_Type"
//                           onChange={handleChange}
//                           value={formData.Content_Type}
//                         >
//                           <option>Content Type</option>
//                           <option>ARTIFICIAL JWELLERY</option>
//                           <option>BAGS</option>
//                           <option>BOOKS</option>
//                           <option>CLOTHING</option>
//                           <option>
//                             CORPORATE GIFTS (EG:MOMENTOES/WOODEN PLAQUES)
//                           </option>
//                           <option>LUGGAGE</option>
//                           <option>PERFUMES</option>
//                           <option>PHOTO FRAME</option>
//                           <option>RAKHI</option>
//                           <option>SHOES</option>
//                           <option>SLIPPERS</option>
//                         </Form.Select>
//                       </div>
//                       <div className="form-group p-2">
//                         <input
//                           type="text"
//                           id="Number_of_box"
//                           className="form-control"
//                           onChange={handleChange}
//                           value={formData.Number_of_box}
//                           placeholder="Number of Box"
//                         />
//                       </div>
//                       <div className="form-group p-2">
//                         <input
//                           type="text"
//                           id="Declared_value"
//                           className="form-control"
//                           onChange={handleChange}
//                           value={formData.Declared_value}
//                           placeholder="Declared Value"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="row gutters">
//                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                     <div className="text-right p-3">
                    
//                       <button
//                         type="button"
//                         id="submit"
//                         name="submit"
//                         className="btn btn-secondary me-4"
//                         onClick={handleNextClick}
//                       >
//                         Next
//                       </button>

//                       <button
//                         type="button"
//                         id="submit"
//                         name="submit"
//                         className="btn btn-primary"
//                         onClick={handleSubmit}
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Booking;