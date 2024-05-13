import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { profileviewApi, userProfileEditApi } from "../service/allApi"; // Import the edit API
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    business_name: "",
    business_details: "",
    address_line1: "",
    address_line2: "",
    state: "",
    city: "",
    pin_code: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userId = getUserId();
      if (userId) {
        const response = await profileviewApi(userId);
        console.log("API Response:", response); // Add this line
        if (response && response.user_data) {
          setUserData(response.user_data);
          localStorage.setItem("userData", JSON.stringify(response.user_data));
        } else {
          console.error("Invalid response format:", response);
        }
      } else {
        console.error("User ID is undefined or null");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    
    try {
      const userId = getUserId();
      if (userId) {
        const response = await userProfileEditApi(userId, userData);
        // Handle successful update response
        console.log("Profile updated successfully:", response);
        // Update local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("Profile updated successfully"); // Display success t
        navigate(`/`);

      } else {
        console.error("User ID is undefined or null");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error updating profile"); // Display error toast

      // Handle error
    }
  };
  return (
    <div>
      <Header />
      <div className="container p-5">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            {/* Profile card */}
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <label htmlFor="avatarInput">
                        <img
                          style={{ cursor: "pointer" }}
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Maxwell Admin"
                        />
                      </label>
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </div>
                    <h5 className="user-name">{userData.full_name}</h5>
                    <h6 className="user-email">{userData.email}</h6>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters p-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input 
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="full_name"
                        placeholder="Enter full name"
                        value={userData.full_name}
                        onChange={handleInputChange}
                        style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        name="email"
                        placeholder="Enter email ID"
                        value={userData.email}
                        onChange={handleInputChange}
                        style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="mobile"
                        placeholder="Enter phone number"
                        value={userData.mobile}
                        onChange={handleInputChange}
                        style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                </div>
                <div style={{marginTop:'-4%'}} className="row gutters p-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="street" ><span style={{marginTop:'1px'}}>Business Name</span></label>
                      <input 
                        type="text"
                        className="form-control"
                        id="businessName"
                        name="business_name"
                        placeholder="Enter Business Name"
                        value={userData.business_name}
                        onChange={handleInputChange}
                        style={{fontSize:'13px',marginTop:'-5px'}}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="street">Business Details</label>
                      <input
                         type="text"
                         className="form-control"
                         id="businessDetails"
                         name="business_details"
                         placeholder="Enter Business Details"
                         value={userData.business_details}
                         onChange={handleInputChange}
                         style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="street">Address Line 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="primary_address"
                        name="primary_address"
                        placeholder="Enter Address"
                        value={userData.primary_address}
                        onChange={handleInputChange}
                        style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="street">Address Line 2</label>
                      <input
                         type="text"
                         className="form-control"
                         id="secondary_address"
                         name="secondary_address"
                         placeholder="Enter Address"
                         value={userData.secondary_address}
                         onChange={handleInputChange}
                         style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        placeholder="Enter State"
                        value={userData.state}
                        onChange={handleInputChange}
                        style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                         type="text"
                         className="form-control"
                         id="city"
                         name="city"
                         placeholder="Enter City"
                         value={userData.city}
                         onChange={handleInputChange}
                         style={{fontSize:'13px',marginTop:'-5px'}}

                         />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="zip">PIN Code</label>
                      <input
                         type="text"
                         className="form-control"
                         id="pincode"
                         name="pincode"
                         placeholder="PIN Code"
                         value={userData.pincode}
                         onChange={handleInputChange}
                         style={{fontSize:'13px',marginTop:'-5px'}}

                      />
                    </div>
                  </div>
                </div>

                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right p-3">
                      <button type="button" className="btn btn-secondary me-4">
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateProfile}
                        id="updatee"
                      >
                        Update
                      </button>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Profile;