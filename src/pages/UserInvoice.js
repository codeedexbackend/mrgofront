import React, { useState, useEffect } from 'react';
import "./invoice.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { invoicenumber } from '../service/allApi';

function UserInvoice() {
  const [invoiceData, setInvoiceData] = useState({
    invoice_numbers: [],
    booking_dates: {}
  });
  const userId = JSON.parse(sessionStorage.getItem("userId")) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await invoicenumber(userId, {});
        console.log("Invoice Data Response:", response.data);
        // Sort the invoices based on their booking dates
        const sortedInvoiceNumbers = response.data.invoice_numbers.sort((a, b) => {
          const bookingDatesA = response.data.booking_dates[a];
          const bookingDatesB = response.data.booking_dates[b];
          // Assuming the booking dates are in ISO date format
          const dateA = new Date(bookingDatesA[0]);
          const dateB = new Date(bookingDatesB[0]);
          return dateA - dateB;
        });
        // Update the state with sorted invoice numbers
        setInvoiceData({
          invoice_numbers: sortedInvoiceNumbers,
          booking_dates: response.data.booking_dates
        });
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };
  
    fetchData();
  }, [userId]); // Trigger the effect when the user parameter changes
  
  return (
    <div>
      <Header />
      <div className="container">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input2"
          />
        </div>
        <h2>INVOICE</h2>
        <ul className="responsive-table">
          
          <li className="table-header">
            <div className="col col-1">Ref ID</div>
            <div className="col col-2">Invoice No</div>
            <div className="col col-3">Booking Date</div>
            {/* Add more columns here if needed */}
          </li>
          {invoiceData.invoice_numbers && invoiceData.invoice_numbers.map((invoice, index) => {
            if (!invoice) return null; // Skip rendering if invoice is null
            return (
              <li className="table-row" key={index}>
                <div className="col col-1" data-label="Ref ID">{index + 1}</div>
                <div className="col col-2" data-label="Invoice No">
                  {/* Modify Link component to include invoice number in URL */}
                  <Link to={`/productfinal/${userId}/${invoice}`} style={{ textDecoration: "none", whiteSpace: 'nowrap' }}>
                    <b>{invoice}</b>
                  </Link>
                </div>
                <div className="col col-3" data-label="Booking Date">
                  {invoiceData.booking_dates[invoice] && invoiceData.booking_dates[invoice].join(", ")}
                </div>
                {/* Add more columns here if needed */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserInvoice;
