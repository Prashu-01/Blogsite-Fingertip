import React from 'react'
import '../styles/home.css'
import home from '../images/hom1.png'
import home1 from '../images/hom2.png'
import home2 from '../images/hom3.png'

export default function Hero() {
  return (
    <div className='heroUI'>
      <div className="box">
        <div className="Txt">
          <h2 className='h-title'>Get daily blog at your <span style={{ color: '#d9ffe3' }}>fingertip</span></h2>
          <br />
          <p>FingerTip is a free and open blog website where users can create contents that are informative, inspiring, and engaging. Our goal is to provide you with a unique and enriching experience while offering a diverse range of topics that cater to various interests and passions.</p>

        </div>
        {/* <img src={home} alt="" className="homei" /> */}
        <div className='homei'>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" style={{transform:'scale(1.3)',margin:'auto'}}>
              <div className="carousel-item active" data-bs-interval="1000">
                <img src={home} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={home1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={home2} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
