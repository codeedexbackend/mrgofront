import React from 'react' 
import './Footer.css' 
import { Link } from 'react-router-dom' 
 
function Footer() { 
  return ( 
    <div className='footer ' style={{marginTop:''}}> 
         <footer className="footer"> 
      <div className="column img4"> 
        <img id='foo' style={{marginTop:'-11%',marginRight:'90%'}} src="https://i.postimg.cc/7ZDTGbFg/auto-group-2qzw.png" 
              width="50px" 
              height="52px" 
              
              className="d-inline-block align-top" 
              alt="React Bootstrap logo"  /> 
              <p className='mns' id='mnss' style={{marginTop:'-32px'}} >r. Go</p> 
              <p className='bb' id='njk'>Courier Services</p> 
              <p className='bbb' id='njkk'>Swift deliveries, boundless connections. Our courier service is not just about packages; it's the heartbeat of seamless connections</p> 
         
      </div> 
      <div className="column"> 
       <p className='fc2' id='fcv' style={{color:"red"}}><b id='jk'>Services</b></p> 
        <p className='fc21'>Courier Service </p> 
        <p className='fc21'>Food Courier</p> 
        <p className='fc21'>Whole Sales Courier</p> 
        <p className='fc21'>E-device Courier</p> 
 
      </div> 
      <div className="column"> 
      <p className='fc2' id='op' style={{color:"red"}}><b id='e3'>Navigations</b></p> 
<Link to={'/'} style={{textDecoration:"none"}}> 
          <p className='fc21' id='g1'>Home </p> 
   
</Link>       
<Link to={'/aboutus'} style={{textDecoration:"none"}} > 
    <p className='fc21' id='g2'>About</p> 
   
</Link>      
<Link to={''} style={{textDecoration:"none"}}> 
     <p className='fc21' id='g3'>Package & Pricing</p> 
   
</Link>   
<Link to={'/'} style={{textDecoration:"none"}}> 
        <p className='fc21' id='g4'>Orders</p> 
   
</Link> 
      </div> 
      <div className="column" id='fw'> 
      <p className='fc2' style={{color:"red"}}><b id='ji'>Contact</b></p> 
        <p className='fc21'>Kochi, C port Airport Road 
Ernamkulam </p> 
        <p className='fc21'>mr.go.couriers.com</p> 
        <p className='fc21'>+91 6583376363</p> 
      </div> 
    </footer> 
    </div> 
  ) 
} 
 
export default Footer