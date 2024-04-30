import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
  

function TrackHead() {
  return (
    <MDBNavbar light className='bg-primary d-flex' >
    <MDBContainer fluid>
      <MDBNavbarBrand href='#' className='text-white'> 
    Shipment Summary
      </MDBNavbarBrand>
      <div >
      {/* <a className='text-white mx-5' href=""><i className='fa-solid fa-pen text-white mx-1'></i>Raise Your Query</a>
      <a className='text-white mx-5' href=""><i class="fa-solid fa-envelope text-white mx-1"></i>Mail Me</a>
      <a className='text-white mx-5' href=""><i className='fa-solid fa-print text-white mx-1'></i>print</a> */}
      </div>


    </MDBContainer>
   
  </MDBNavbar>
  )
}

export default TrackHead;