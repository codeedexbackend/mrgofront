import React from 'react';

function Afooter() {
  return (
    <div className='text-center p-4' style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', position: 'sticky', bottom: 0, width: '100%' }}>
      <h6>
        &copy; All rights are reserved to
        <b className='text-danger ms-1'>Mr</b>
        <span className='text-danger'>Go</span> &req:2024
      </h6>
    </div>
  );
}

export default Afooter;
