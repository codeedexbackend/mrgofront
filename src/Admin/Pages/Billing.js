import React from "react";

import "./Billing.css";
import AHeader from "./AHeader";
import Form from 'react-bootstrap/Form';
import Afooter from "./Afooter";


function Billing() {
  return (
    <div>
      <AHeader></AHeader>
      <div className="container p-5">
        <div className="row gutters">
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 w-100" >
            <div className="card h-100" style={{border:'1px solid black'}}>
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
                        placeholder="Enter full name"
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
                        placeholder="Enter email ID"
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
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters p-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Products</h6>
                  </div>
                  <div >
                                <Form.Select defaultValue="Content Type" /* or value="" */>
                                    <option disabled value="Content Type">
                                        Content Type
                                    </option>
                                    <option>ARTIFICIAL JWELLERY</option>
                                    <option>BAGS</option>
                                    <option>BOOKS</option>
                                    <option>CLOTHING</option>
                                    <option>CORPORATE GIFTS (EG:MOMENTOES/WOODEN PLAQUES)</option>
                                    <option>LUGGAGE</option>
                                    <option>PERFUMES</option>
                                    <option>PHOTO FRAME</option>
                                    <option>RAKHI</option>
                                    <option>SHOES</option>
                                    <option>SLIPPERS</option>
    
    
                                </Form.Select>
                            </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-4">
                      <label htmlFor="street">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-4">
                      <label htmlFor="street">Price Per KG</label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder=""
                      />
                    </div>
                    
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-4">
                      <label htmlFor="street">Total Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder=""
                      />
                    </div>
                    
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-4">
                      <label htmlFor="city">Total price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder=""
                      />
                    </div>
                  </div>
                  
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="zip">PIN Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div> */}
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right p-3">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-secondary me-4"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary"
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
      <Afooter></Afooter>
    </div>
  );
}

export default Billing;
