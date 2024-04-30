import React from 'react';
import '../pages/Express.css';

function Card() {
  return (
    <div className="nextdiv">
      <h2 className="text-start ms-5 pt-3">How Does it Work</h2>
      <div className="container mt-4 kl">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-2 col-sm-6 mt-2 gb">
            <div id='jm'
              className="card "
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <div className="card-body">
                <h5 className="card-title">Step1 1</h5>
                <div className="rounded-boxr mt-2" id="cd1">
                  <img
                    style={{ zIndex: "1" }}
                    src="https://i.postimg.cc/Hx17XShL/9d6f6359d501f2eac27aea6510b01bfe.png"
                    alt="Card 1"
                  />
                </div>
                <p className="card-text text-center w-100">Sign Up In Mr. Go Website</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-2 col-sm-6 mt-2">
            <div id='qwe'
              className="card nmh"
              style={{ height: '200px' }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <div className="card-body">
                <h5 className="card-title">Step 2</h5>
                <div className="rounded-boxr mt-2" id="cd2">
                  <img
                    style={{ zIndex: "1" }}
                    src="https://i.postimg.cc/ZKHFZhDx/5e50f5d923e2431de3d76bd6dc2d2721.png"
                    alt="Card 1"
                  />
                </div>
                <p className="card-text" style={{ letterSpacing: "normal", width: '113%', marginLeft: '-3%', textAlign: 'center' }}>
                  Fill the form for shipping your Product. Make Payment
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-2 col-sm-6 mt-2">
            <div id='qwee'
              className="card nmh"
              style={{ height: '200px' }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <div className="card-body">
                <h5 className="card-title">Step 3</h5>
                <div className="rounded-boxr mt-2" id="cd3">
                  <img
                    style={{ zIndex: "1" }}
                    src="https://i.postimg.cc/ZRbMbLxW/5521cf9a493157426eab3d732c95356f.png"
                    alt="Card 1"
                  />
                </div>
                <p className="card-text text-center">
                  Delivery Boy Pickup Your product at your home
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-2 col-sm-6 mt-2">
            <div id='qweee'
              className="card nmh"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <div className="card-body">
                <h5 className="card-title">Step 4</h5>
                <div className="rounded-boxr mt-2" id="cd4">
                  <img
                    style={{ zIndex: "1" }}
                    src="https://i.postimg.cc/Y21vKfy6/5300432cf97f0cf631309a568e83a498.png"
                    alt="Card 1"
                  />
                </div>
                <p className="card-text text-center">Product will be shipped safely</p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-md-2 col-sm-6 mt-2">
            <div id='qws'
              className="card nmh"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <div className="card-body">
                <h5 className="card-title">Step 5</h5>
                <div className="rounded-boxr mt-2" id="cd5">
                  <img
                    style={{ zIndex: "1" }}
                    src="https://i.postimg.cc/vBFNJsct/b27babf9fd69406afb83b91134d74af4.png"
                    alt="Card 1"
                  />
                </div>
                <p className="card-text text-center">Product Receiving at Home</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
