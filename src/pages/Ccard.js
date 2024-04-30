
import React from 'react'
import './csrd.css'
function Ccard() {
  return (
    <div>
    <div className="nextdiv">
    <h2 className="text-start ms-5 pt-3">How Does it Work</h2>
        <div className="card-container">
          <div className="card cardt"> <div className="card-body bh">
                    <h5 className="card-title  vf">Step 1</h5>
                    <div className="rounded-boxr mt-2" id="cd1">
                      <img
                        style={{ zIndex: "1" }}
                        src="https://i.postimg.cc/Hx17XShL/9d6f6359d501f2eac27aea6510b01bfe.png"
                        alt="Card 1"
                      />
                    </div>
                    <p className="card-text text-center  thy">Sign Up In Mr. Go Website</p>
                  </div></div>
          <div className="card cardt"> <div className="card-body bh">
          <h5 className="card-title vf">Step 2</h5>
                    <div className="rounded-boxr mt-2" id="cd2">
                      <img
                        style={{ zIndex: "1" }}
                        src="https://i.postimg.cc/ZKHFZhDx/5e50f5d923e2431de3d76bd6dc2d2721.png"
                        alt="Card 1"
                      />
                    </div>
                    <p className="card-text text-center  thy">Fill the form for shipping your Product. Make Payment</p>
                  </div></div>
          <div className="card cardt"> <div className="card-body bh">
                    <h5 className="card-title vf">Step 3</h5>
                    <div className="rounded-boxr mt-2" id="cd3">
                      <img
                        style={{ zIndex: "1" }}
                        src="https://i.postimg.cc/ZRbMbLxW/5521cf9a493157426eab3d732c95356f.png"
                        alt="Card 1"
                      />
                    </div>
                    <p className="card-text text-center  thy">                  Delivery Boy Pickup Your product at your home
    </p>
                  </div></div>
          <div className="card cardt"> <div className="card-body bh">
                    <h5 className="card-title vf" style={{whiteSpace:'nowrap'}}>Step 4</h5>
                    <div className="rounded-boxr mt-2" id="cd4">
                      <img
                        style={{ zIndex: "1" }}
                        src="https://i.postimg.cc/Y21vKfy6/5300432cf97f0cf631309a568e83a498.png"
                        alt="Card 1"
                      />
                    </div>
                    <p className="card-text text-center  thy">Product will be shipped safely</p>
                  </div></div>
          <div className="card cardt vbnn"> <div className="card-body bh">
                    <h5 className="card-title vf">Step 5</h5>
                    <div className="rounded-boxr mt-2" id="cd5">
                      <img
                        style={{ zIndex: "1" }}
                        src="https://i.postimg.cc/vBFNJsct/b27babf9fd69406afb83b91134d74af4.png"
                        alt="Card 1"
                      />
                    </div>
                    <p className="card-text text-center  thy">Product Receiving at Home</p>
                  </div></div>
        </div>
    </div>
    </div>
  )
}

export default Ccard