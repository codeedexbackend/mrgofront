// ProductList.js

import React, { useState, useEffect } from 'react';
import "./Product.css";
import AHeader from './AHeader';
import 'react-toastify/dist/ReactToastify.css';
import { invoicenumber } from '../../service/allApi';
import { Link } from 'react-router-dom';

function ProductList() {
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
        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };
  
    fetchData();
  }, [userId]); // Trigger the effect when the user parameter changes
  
  return (
    <div>
      <AHeader />
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
            <div className="col col-2">REF ID</div>
            <div className="col col-2">INVOICE No</div>
            <div className="col col-2">Booking Date</div>
          </li>
          {invoiceData.invoice_numbers && invoiceData.invoice_numbers.map((invoice, index) => {
            if (!invoice) return null; // Skip rendering if invoice is null
            return (
              <li className="table-row" key={index}>
                <div className="col col-1" data-label="Reference ID">{index + 1}</div>
                <div className="col col-2" data-label="Invoice Number">
                  {/* Modify Link component to include invoice number in URL */}
                  <Link to={`/product/${userId}/${invoice}`} style={{ textDecoration: "none", whiteSpace: 'nowrap' }}>
                    <b>{invoice}</b>
                  </Link>
                </div>
                <div className="col col-2" data-label="Booking Date">
                  {invoiceData.booking_dates[invoice] && invoiceData.booking_dates[invoice].join(", ")}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
