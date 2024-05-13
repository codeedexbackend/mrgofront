import React from 'react'
import { Accordion } from 'react-bootstrap'
import './freq.css'

function Freaquently() {
  return (
    
    <div >
                <h1 style={{ textAlign: "left", padding: "20px"  }} id='yp'><b>Frequently Asked Questions</b></h1>
              <p style={{ fontSize: "15px",marginTop:"-44px",textAlign:"left" }} className='p-4 container p11 ' ><b >Uncover essential information and solutions in our Frequently Asked Questions (FAQ) section. Get quick and comprehensive responses to common queries, ensuring a seamless experience with our courier service.</b></p>
    
              <Accordion className='container ' style={{marginTop:'-1%'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>1. How can I find where my package is?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}}  defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>2. When will my order arrive with standard shipping?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's easy! Just enter your order number on our website, and you'll get real-time updates on when your order will arrive with standard shipping. </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>3. Can I get my order faster?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>4. Can I pay when I get my package?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered</p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>5. What if I'm not home when my package comes?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered</p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>6. Are there rules for what I can ship?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>7. What if my package is damaged?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>8. Are there extra charges I don't know about?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>9. Can I change where my package gets delivered?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered</p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
                <Accordion className='container ' style={{marginTop:'-18px'}} defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><b className='ft'>10. How do I talk to someone for help?</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p style={{fontSize:'small'}}>It's simple! Just type your tracking number on our website, and you'll see real-time updates about where your package is and when it will be delivered </p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> <br />
            </div>
  )
}

export default Freaquently