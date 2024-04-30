import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// register
export const registerApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/signup/`, body, "");
};

// login
export const loginApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/login/`, body, "");
};
// profile view
// Profile view API function
export const profileviewApi = async (userId) => {
  try {
    const response = await commonApi(
      "GET",
      `${BASE_URL}/api/userprofile/${userId}/`,
      null,
      ""
    );
    return response.data; // Assuming the response contains the user profile data
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};



export const userProfileEditApi = async (userId, updatedUserData) => {
  try {
    // Send a PUT request to the appropriate endpoint with the updated user data
    const response = await commonApi(
      "PUT",
      `${BASE_URL}/api/userprofileedit/${userId}/`,
      updatedUserData
    );

    // Assuming the response contains the updated user profile data
    return response.data;
  } catch (error) {
    // Handle errors if any
    throw new Error("Error updating user profile");
  }
};
export const usercontrolEditApi = async (userId, updatedUserData) => {
  try {
    // Send a PUT request to the appropriate endpoint with the updated user data
    const response = await commonApi(
      "PATCH",
      `${BASE_URL}/api/userprofileedit/${userId}/`,
      updatedUserData
    );

    // Assuming the response contains the updated user profile data
    return response.data;
  } catch (error) {
    // Handle errors if any
    throw new Error("Error updating user profile");
  }
};


// contactus
export const contactus = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/ContactUsView/`, body, "");
};

export const contactview = async (body) => {
  return await commonApi("GET", `${BASE_URL}/api/ContactUsGetView/`, body, "");
};

// delete project
export const contactusdelete = async (headers, id) => {
  return await commonApi(
    "DELETE",
    `${BASE_URL}/api/ContactUsDeleteView/${id}/`,
    {},
    headers
  );
};


export const shippingreg = async (formData, invoiceNumber) => {
  try {
    // Assuming this is your base URL
    // Modify the formData structure if needed to match the expected format on the server
    const requestData = [{
      Shipping_Through: formData.Shipping_Through,
      Name: formData.Name,
      Reciepient_Name: formData.Reciepient_Name,
      Mobile: formData.Mobile,
      Pin_Code: formData.Pin_Code,
      City: formData.City,
      Address: formData.Address,
      Consignment: formData.Consignment,
      Content_Type: formData.Content_Type,
      Number_of_box: formData.Number_of_box,
      Declared_value: formData.Declared_value,
      user: formData.user,
      invoice_number: invoiceNumber, // Include the invoice number in the request data
    }];
    // Make the POST request to the server
    const response = await axios.post(
      `${BASE_URL}/api/ShippingRegView/`,
      requestData
    );
    // Check if the response is not null and contains data
    if (response && response.data) {
      return response.data;
    } else {
      // If response is empty or missing data property, throw an error
      throw new Error("Empty response received from server");
    }
  } catch (error) {
    // Log any errors that occur during the API call
    console.error("Error submitting shipping registration:", error);
    // Throw an error to propagate the error to the caller
    throw new Error("Error submitting shipping registration");
  }
};



// shipping-registrations/<int:pk>/
// http://192.168.1.5:8000/api/ShippingRegEditView/<int:pk>/

// admin request view
// ShippingReggetView/<int:user_id>/

export const ShippingRegView = async (user_id, body) => {
  return await commonApi(
    "GET",
    `${BASE_URL}/api/ShippingReggetView/${user_id}/`,
    body,
    ""
  );
};

// http://192.168.1.19:8000/api/ShippinggetView/
export const ShippingReggView = async () => {
  try {
    // Make GET request to the shipping registration endpoint
    const response = await commonApi(
      "GET",
      `${BASE_URL}/api/ShippinggetView/`,
      {},
      ""
    );

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors (e.g., log them or throw)
    console.error("Error fetching shipping registration data:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

// view all profile
// http://192.168.1.19:8000/api/UserProfileView/
export const allprofileviewApi = async () => {
  return await commonApi("GET", `${BASE_URL}/api/UserProfileView/`, {}, "");
};


// editshippingreg
export const shippingregedit = async (id, data, headers = {}) => {
  if (!id) {
    throw new Error('ID is required for shipping registration edit.');
  }

  try {
    // Include headers in the request
    const response = await commonApi("PUT", `${BASE_URL}/api/ShippingRegEditView/${id}/`, data, headers);
    return response;
  } catch (error) {
    console.error('Error editing shipping registration:', error);
    throw error; // Re-throw the error for handling higher up the call stack if needed
  }
};


// delete shipping reg 
export const shippingregdelete = async (headers, id) => {
  return await commonApi(
    "DELETE",
    `${BASE_URL}/api/shipping-registrations/${id}/`,
    {},
    headers
  );
};

        
// add new user
export const addnewuser = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/adduserview/`, body, "");
};


export const userdelete = async (headers, id) => {
  return await commonApi(
    "DELETE",
    `${BASE_URL}/api/UserDeleteView/${id}/`,
    {},
    headers
  );
};

// admin login
export const adminlogin=async(body)=>{
  return await commonApi('POST',`${BASE_URL}/api/LoginAdmin/`,body,"")
}

// admin booking
export const adminbooking = async (formData) => {
  try {
      // Modify the formData structure if needed to match the expected format on the server
      const requestData = {
          Shipping_Through: formData.Shipping_Through,
          Name: formData.Name,
          Reciepient_Name:formData.Reciepient_Name,
          Mobile: formData.Mobile,
          Pin_Code: formData.Pin_Code,
          City: formData.City,
          Address: formData.Address,
          user:formData.user,
          Consignment: formData.Consignment,
          Content_Type: formData.Content_Type,
          Number_of_box: formData.Number_of_box,
          Declared_value: formData.Declared_value,
          user: formData.user,
      };
      // Make the POST request to the server
      const response = await axios.post(`${BASE_URL}/api/ShippingRegView/`, requestData);
      // Check if the response is not null and contains data
      if (response && response.data) {
          return response.data;
      } else {
          // If response is empty or missing data property, throw an error
          throw new Error('Empty response received from server');
      }
  } catch (error) {
      // Log any errors that occur during the API call
      console.error('Error submitting shipping registration:', error);
      // Throw an error to propagate the error to the caller
      throw new Error('Error submitting shipping registration');
  }
};





export const getProductList = async (user_id) => {
  console.log('user_id:', user_id); // Add this line to check the value of user_id
  try {
    const response = await commonApi('GET', `${BASE_URL}/api/ShippingReggetView/${user_id}/`);
    // Extract the product data from the response
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error; // Re-throw the error for the caller to handle
  }
  
};


// Notification
export const notifaction = async (body) => {
  return await commonApi("GET", `${BASE_URL}/api/shipping-registration/notification/`, body, "");
};


// delete Notification
export const deletenotifaction = async (body , id) => {
  return await commonApi("DELETE", `${BASE_URL}/api/shipping-notifications/${id}/`, body, "");
};



// tracking
// tracking.js

// Assume commonApi function and BASE_URL constant are properly defined elsewhere

export const tracking = async (tracking_id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/tracking-details/${tracking_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
        // Add any additional headers if required
      },
    });
    
    
    
    if (!response.ok) {
      throw new Error('Failed to fetch tracking details');
    }

    const data = await response.json();

    const { tracking_status, shipping_registration } = data;

    const trackingDetails = {
      status: tracking_status.status,
      placedUpdatedAt: tracking_status.Placed_updated_at,
      pickedUpdatedAt: tracking_status.Picked_updated_at,
      shippedUpdatedAt: tracking_status.Shipped_updated_at,
      deliveredUpdatedAt: tracking_status.Delivered_updated_at,
      tracking_id: shipping_registration.tracking_id,
      shippingThrough: shipping_registration.Shipping_Through,
      recipientName: shipping_registration.Reciepient_Name,
      mobile: shipping_registration.Mobile,
      pinCode: shipping_registration.Pin_Code,
      city: shipping_registration.City,
      address: shipping_registration.Address,
      consignment: shipping_registration.Consignment,
      contentType: shipping_registration.Content_Type,
      numberOfBox: shipping_registration.Number_of_box,
      declaredValue: shipping_registration.Declared_value,
      bookingDate: shipping_registration.Booking_date,
      deliveryDate: shipping_registration.Delivery_date,
      thirdPartyTrackingId: shipping_registration.third_party_tracking_id,
    };

    return trackingDetails;
  } catch (error) {
    console.error('Error fetching tracking details:', error);
    throw error;
  }
};

// http://postalpincode.in/api/pincode/678597                                                                

export const address = async (pincode) => {
  try {
    const response = await commonApi("GET", `http://postalpincode.in/api/pincode/${pincode}`, {}, "");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching address data:", error);
    return null;
  }
};


export const orderview = async (user_id) => {
  try {
    if (!user_id) {
      // Handle the case when user_id is undefined (e.g., return an empty array)
      return [];
    }
    
    // Make GET request to the shipping registration endpoint
    const response = await commonApi(
      "GET",
      `${BASE_URL}/api/ShippingReggetView/${user_id}/`,
      {},
      ""
    );
    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors (e.g., log them or throw)
    console.error("Error fetching shipping registration data:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};
// [{"Shipping_Through":"DTDC","Name":"","Reciepient_Name":"hhgjhg","Mobile":"98798789","Pin_Code":"678631","City":"Palakkad","Address":"Palakkad","Consignment":"Document","Content_Type":"","Number_of_box":"","Declared_value":"","user":"42"},{"Shipping_Through":"DTDC","Name":"","Reciepient_Name":"hjhjh","Mobile":"987987","Pin_Code":"678631","City":"Palakkad","Address":"Palakkad","Consignment":"Document","Content_Type":"","Number_of_box":"","Declared_value":"","user":"42"},{"Shipping_Through":"TRACKON","Name":"","Reciepient_Name":"ghhjg","Mobile":"87897987","Pin_Code":"678631","City":"Palakkad","Address":"Palakkad","Consignment":"Non-Document","Content_Type":"CORPORATE GIFTS (EG:MOMENTOES/WOODEN PLAQUES)","Number_of_box":56,"Declared_value":56,"user":"42"}]

export const invoicenumber = async (user, body) => {
  return await commonApi(
    "GET",
    `${BASE_URL}/api/invoicenumbers/${user}/`,
    body,
    ""
  );
};

// clean
export const cleanShipping = async () => {
  return await commonApi("POST", `${BASE_URL}/api/clean-shipping-registrations/`, {}, ""); // Passing an empty object as the request body
};


// reset password
export const otpsend = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/password-reset/`, body, "");
};
// otpverification
export const otpverification = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/password-otp/`, body, "");
};
// change password
export const changepassword = async (body) => {
  return await commonApi("POST", `${BASE_URL}/api/change-password/`, body, "");
};