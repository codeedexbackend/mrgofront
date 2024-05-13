import React, { useEffect, useState } from 'react';
import './BPrint.css';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import {  profileviewApi } from '../../service/allApi';
import { BASE_URL } from '../../service/baseUrl';

function Billingprint() {
    const { userId, invoice } = useParams();
    const [orders, setOrders] = useState([]);
    const [issueDate, setIssueDate] = useState("");
    const [userName, setUserName] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount
    const [packing, setPacking] = useState(""); // State to hold packing value
    const [packingCover, setPackingCover] = useState(""); // State to hold packing cover value
    const navigate=useNavigate()
    const fetchBillingData = async (userId, invoiceNumber) => {
        try {
            const response = await fetch(`${BASE_URL}/api/billing/${userId}/${invoiceNumber}/`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.orders && data.orders.length > 0) {
                    setOrders(data.orders);
                    setIssueDate(data.orders[0].Booking_date); // Set the issue date from the first order
                    
                    let total = 0;
                    let totalPacking = 0; // Initialize total packing
                    let totalPackingCover = 0; // Initialize total packing cover
    
                    data.orders.forEach(order => {
                        total += order.Total_price;
                        // Add packing and packing cover values to respective totals
                        totalPacking += parseFloat(order.packing) || 0;
                        totalPackingCover += parseFloat(order.packing_cover) || 0;
                    });
    
                    // Add final amount to the total
                    if (data.final_amount) {
                        total += parseFloat(data.final_amount);
                    }
    
                    // Add packing and packing cover amounts to the total
                    total += totalPacking + totalPackingCover;
    
                    // Set total packing and packing cover to state
                    setPacking(totalPacking);
                    setPackingCover(totalPackingCover);
    
                    // Set the total amount state
                    setTotalAmount(total);
    
                    // Save total amount to session storage
                    sessionStorage.setItem('totalAmount', JSON.stringify(total));
                } else {
                    throw new Error("No orders found in the response data");
                }
            } else {
                throw new Error("Failed to fetch invoice data");
            }
        } catch (error) {
            console.error("Error fetching invoice data:", error);
        }
    };
    
    
    

   

    const fetchUserProfile = async (userId) => {
        try {
            const userData = await profileviewApi(userId);
            if (userData && userData.user_data) {
                const { full_name, mobile } = userData.user_data;
                // Set the user's full name and phone number in state
                setUserName(full_name);
                setUserMobile(mobile);
            } else {
                throw new Error("User data not found in the response");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        // Fetch billing data and user profile
        fetchBillingData(userId, invoice);
        fetchUserProfile(userId);
    
        // Retrieve and set packing data from session storage
        const packingData = JSON.parse(sessionStorage.getItem('packingData')) || {};
        setPacking(packingData.packing || "");
        setPackingCover(packingData.packing_cover || "");
    }, [userId, invoice]);

    const handlePrint = () => {
        window.print();
        navigate('/admin/')
    };
   
    return (
        <div>
            <div className="page-content container mb-5">
                <div className="page-header text-blue-d2">
                    <div className="page-tools">
                    </div>
                </div>
                <div className="container px-0">
                    <div className="row mt-4">
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="text-center text-150">
                                        <span className="text-default-d3"><b className='text-danger'>MrGO</b>.in</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="row brc-default-l1 mx-n1 mb-4" />
                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <span className="text-sm text-grey-m2 align-middle">Name :</span>
                                        <span className="text-600 text-110 text-blue align-middle"> {userName} </span>
                                    </div>
                                    <div className="text-grey-m2">
                                        <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary"></i> <b className="text-600"> {userMobile} </b></div>
                                    </div>
                                </div>
                                <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                    <hr className="d-sm-none" />
                                    <div className="text-grey-m2">
                                        <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                            Invoice
                                        </div>
                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> {invoice} </div>
                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Issue Date:</span> {issueDate}  </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Refrence No</th>
                                            <th>Address</th>
                                            <th>Weight</th>
                                            <th>Amount</th>
                                           

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{order.tracking_id}</td>
                                                <td>{order.Pin_Code},{order.Address},{order.City}</td>
                                                <td>{order.Total_weight}</td>
                                                <td>{order.Total_price}</td>
                                               
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <hr />
                                <div className="row border-b-2 brc-default-l2"></div>
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Additional Charges</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Total Packing </td>
                                                <td>{packing}</td>
                                            </tr>
                                            <tr>
                                            <td>Total Packing Cover </td>
                                                <td>{packingCover}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                                        Extra note such as company or payment information...
                                    </div>
                                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                                        <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                            <div className="col-7 text-right">
                                                Total Amount
                                            </div>
                                            <div className="col-5">
                                                <span className="text-150 text-success-d3 opacity-2">RS.{totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <span className="text-secondary-d1 text-105 hide-on-print">Thank you for your business</span>
                                    <a href="#" onClick={handlePrint} className="btn bg-white btn-light px-4 float-right mt-3 mt-lg-0 "><div className='hide-on-print'><i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                                        Print </div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billingprint;
