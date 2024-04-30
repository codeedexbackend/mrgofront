import React, { useState, useEffect } from 'react';
import './Label.css';
import { useParams } from 'react-router-dom';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BASE_URL } from '../service/baseUrl';

function Label() {
  const [shippingRegistration, setShippingRegistration] = useState(null);
  const [user, setUser] = useState(null);
  const { userId, orderId } = useParams();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [pageSize, setPageSize] = useState('A4'); // State to store selected paper size
  const [labelsPerPage, setLabelsPerPage] = useState(1); // State to store selected number of labels per page
  const [printerSize, setPrinterSize] = useState('A4'); // State to store selected printer size
  const [downloading, setDownloading] = useState(false); // State to track if downloading PDF

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user-details-shipping-registration/${userId}/${orderId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data);
        setShippingRegistration(data.shipping_registration);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId, orderId]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownload = async () => {
    // Calculate dimensions based on selected printer size
    let labelWidth, labelHeight;
    if (printerSize === 'Thermal') {
      labelWidth = labelHeight = 100; // Set label size for Thermal printer
    } else if (printerSize === 'A3') {
      labelWidth = 297; // A3 width: 297mm
      labelHeight = 420; // A3 height: 420mm
    } else {
      labelWidth = 210; // A4 width: 210mm
      labelHeight = 297; // A4 height: 297mm
    }
  
    // Create new jsPDF instance
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [labelWidth, labelHeight]
    });
  
    // Set downloading state to true
    setDownloading(true);
  
    // Hide download button during PDF generation
    const downloadButton = document.getElementById('download-button');
    if (downloadButton) {
      downloadButton.style.display = 'none';
    }
  
    // Convert label container to canvas
    const canvas = await html2canvas(document.querySelector("#label-container"));
    const imgData = canvas.toDataURL('image/jpeg', 0.7); // Example of image compression with quality 0.7
  
    // Loop through labels and add to PDF
    for (let i = 0; i < labelsPerPage; i++) {
      const columnIndex = i % (labelsPerPage > 2 ? 2 : labelsPerPage); // Calculate the column index
      const rowIndex = Math.floor(i / (labelsPerPage > 2 ? 2 : labelsPerPage)); // Calculate the row index
      const x = columnIndex * labelWidth; // Calculate the x position
      const y = rowIndex * labelHeight; // Calculate the y position
      pdf.addImage(imgData, 'JPEG', x, y, labelWidth, labelHeight);
    }
  
    // Compress the PDF
    const compressedPdf = pdf.output('arraybuffer', { compress: true });
  
    // Save compressed PDF
    const compressedPdfBlob = new Blob([compressedPdf], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(compressedPdfBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'labels.pdf';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(downloadUrl);
  
    // Restore download button and set downloading state back to false after PDF generation
    if (downloadButton) {
      downloadButton.style.display = 'block';
    }
    setDownloading(false);
  
    // Close modal after downloading
    handleCloseModal();
  };
  const handleprint   =()=>{
    window.print();
  }


  return (
    <div id="label-container">
      <div className="containerl container w-50">
        <div className="headerpp">
          <div>
            <h1 className="text-danger">
              <b>Mr.Go</b>
            </h1>
            <h7>www.mrgo.com</h7>
          </div>
          {shippingRegistration && <p>Through: {shippingRegistration.Shipping_Through}   {/* Barcode */}
            <div className="barcode-container">
              {shippingRegistration && (
                <div className="barcode">
                  <Barcode value={shippingRegistration.tracking_id} />
                </div>
              )}
            </div></p>}
        </div>
        <hr />
        <div>
          {shippingRegistration && (
            <>
              <p>Order Date : {shippingRegistration.Booking_date}</p>
              <p>AWB No : {shippingRegistration.tracking_id}</p>
            </>
          )}
        </div>
        <hr />
        <div className="ship-to">
          <p>
            <b>Ship To :</b>
          </p>
          {shippingRegistration && (
            <p>
              {shippingRegistration.Reciepient_Name}
              <br />
              {shippingRegistration.City}
              <br />
              {shippingRegistration.Address}
              <br />
              {shippingRegistration.Pin_Code}
            </p>
          )}
        </div>
        <hr />
        <div className="shipped-by">
          <p>
            <b>Shipped By (If undelivered, return to) :</b>
          </p>
          {user && (
            <address>
              {user.full_name}
              <br />
              {user.primary_address}
              <br />
              {user.secondary_address}, {user.city}, {user.state}
              <br />
              {user.pincode}
            </address>
          )}
        </div>
        <div className="order-details">
          {shippingRegistration && (
            <table>
              <tbody>
                <tr>
                  <th>Tracking ID</th>
                  <td>{shippingRegistration.tracking_id}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="disclaimer w-100">
          <p>If any queries :</p>
        </div>
        <div className="powered-by">
          <p>Powered by Mr.Go</p>
        </div>
      </div>

      {/* Download button */}
      <div className={`text-center mb-3 ${downloading ? 'hidden' : ''}`} id="download-button">
        <button className='btn btn-primary' onClick={handleprint}>
          Download
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Select Printer Size</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div>
      <label htmlFor="printerSizeSelect">Printer Size:</label>
      <select id="printerSizeSelect" value={printerSize} onChange={(e) => setPrinterSize(e.target.value)}>
        <option value="A4">A4</option>
        <option value="A3">A3</option>
        <option value="Thermal">Thermal</option>
      </select>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleDownload}>
      Download
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
}

export default Label;
