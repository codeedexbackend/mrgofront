import './Trackorder.css'
import TrackHead from './TrackHead';


function TrackingOrder() {
  return (
   <div style={{width:"900px",height:"500px",marginTop:"20px"}}>
        <div className="App">
        <TrackHead/>
        <table className='mt-3'>
          <thead border='1'>
            <tr >
              <th className='mx-5 pe-5'><b>Tracking No.</b></th>
              <th  className='pe-5'>V68865473</th>
              <th className='pe-5'><b>Last Status Date</b></th>
              <th className='pe-5' >26 <sup>th</sup>mar'24</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td  className='mx-5 '><b>Referece No.</b></td>
              <td>126220085505</td>
              <td><b>Last Status</b></td>
              <td>
              <i class="fa-solid fa-circle text-success fs-4"></i><b style={{color:'blueviolet'}} >Successfully Delivered</b>
              </td>
            </tr>
            <tr>
              <td  className='mx-5'><b>Booking Date.</b></td>
              <td>25 <sup>th</sup> mar'24</td>
             
            </tr>
            <tr>
              
            <td  className='mx-5'><b>Customer EDD</b></td>
              <td>26 <sup>th</sup> Mar'24</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div >
        <h5 style={{textDecoration:'underline'}}>Shipment Details</h5>
    
        </div>
        <hr />
        <table className='mt-3'>
          <thead border='1'>
            <tr >
              <th className=' mx-5 pe-5' ><b>Origin</b></th>
              <th className='pe-5' >Palghat</th>
              <th className='pe-5'><b>Destination</b></th>
              <th className='pe-5' >Bangalore</th>
              <th className='pe-5' ><b>Destination <br />Pincode</b></th>
              <th className='pe-5'>560029</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td  className='mx-5 '><b>No.of Pieces</b></td>
              <td>1</td>
              <td><b>Service Type</b></td>
              <td>Green
              </td>
            </tr>
            <tr>
              <td  className='mx-5'><b>Package Contents</b></td>
              <td className='ps-3'>Medical Equipment</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h5 style={{textDecoration:'underline'}} >Receiver Details</h5>
        <hr />
        <table className='mt-3'>
          <thead border='1'>
            <tr >
              <th className='mx-5 pe-5'><b>Receiver Name</b></th>
              <th  className='pe-5'>Singh</th>
              <th className='pe-5'><b>Relationship</b><br />email</th>
              <th className='pe-5' >Office Colleague</th>
            </tr>
          </thead>
          </table>
          <hr />
          <div className='bg-primary d-flex' style={{height:'50px'}}>
            <span className='d-flex p-1'>
            <h5 className='p-3 mt-0' style={{color:'white',textDecoration:'underline white'}}><a href="" style={{color:'white',textDecoration:'underline white'}}>Shipment Tracking History</a></h5>
            <a style={{marginLeft:'1200px'}} href=""><i class="fa-solid fa-circle-plus fs-2  text-white"></i></a>
            </span>
          </div>
          <hr />
    
          <div class="card mb-3 trackorder" style={{ width: "100%" }}>
                  <div class="" id="vv">
                    Track Order{" "}
                  </div>
                  <hr />
                  <p className="vvvv">Order ID: 2527284</p>
                  <div class="card-body mt-3">
                    <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                      <div class="step completed">
                        <div class="step-icon-wrap">
                          <div class="step-icon">
                            <i class="fa-solid fa-check"></i>
                          </div>
                        </div>
                        <h4 class="step-title">Placed</h4>
                      </div>
                      <div class="step completed">
                        <div class="step-icon-wrap">
                          <div class="step-icon">
                            <i class="fa-solid fa-check"></i>
                          </div>
                        </div>
                        <h4 class="step-title">Picked</h4>
                      </div>
    
                      <div class="step">
                        <div class="step-icon-wrap">
                          <div class="step-icon">
                            <i class="fa-solid fa-check"></i>
                          </div>
                        </div>
                        <h4 class="step-title">Shipped</h4>
                      </div>
                      <div class="step">
                        <div class="step-icon-wrap">
                          <div class="step-icon">
                            <i class="fa-solid fa-check"></i>
                          </div>
                        </div>
                        <h4 class="step-title"> Delivered</h4>
                      </div>
                    </div>
                    <p id="v">
                      Customer order has been delivered on 27/07/2024 at 08:00 Am
                    </p>
                  </div>
                </div>
    
          
        </div>
   </div>
  );
}

export default TrackingOrder;
