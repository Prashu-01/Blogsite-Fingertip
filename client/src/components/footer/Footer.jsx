import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/footer.css'
import { Categories } from '../../constants/data.js';

import git from '../images/github.png'
import linkd from '../images/linkedin.png'
import insta from '../images/insta.png'

export default function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className="cont">
          <div className="about">
            <h4 className="title" style={{ textAlign: 'left' }}>What for you ?</h4>
            <p>
              At Blog Website, we understand that today's readers are seeking more than just information; they crave meaningful and relatable stories that resonate with their everyday lives. That's why we are committed to delivering high-quality content that not only informs but also entertains and sparks conversation. <br />
              Thank you for choosing our blog website as your source of information and inspiration. We hope you enjoy your time here and find our articles thought-provoking, entertaining, and useful. Make sure to subscribe to our newsletter and follow us on social media to stay up-to-date with the latest updates and new content.
            </p>
          </div>
          <div className="more">
            <h4 className="title" style={{ textAlign: 'left' }}>Categories</h4>
            <ul className="links">
              {
                Categories.slice(7, 14).map(category => (
                  <Link to={`?category=${category.type}`} key={category.id}>
                    <a href="/" className="link">{category.type}</a><br />
                  </Link>
                ))
              }
            </ul>
          </div>
          <div className="qlinks">
            <h4 className="title" style={{ textAlign: 'left' }}>Quick links</h4>
            <ul className="links">
              <Link to='/allpost' className="link">All posts</Link><br />
              <Link to='/create' className="link">Create post</Link><br />
              <Link to='/login' className="link">Signup</Link><br />
            </ul>
            <span>Get in Touch</span>
            <div className="social">
              <a target="_blank" rel="noopener noreferrer" href='https://github.com/Prashu-01'><img src={git} alt="" className="s-icon" /></a>
              <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/prashu-verma-517890227/'><img src={linkd} alt="" className="s-icon" /></a>
              <a target="_blank" rel="noopener noreferrer" href='https://instagram.com/prashu_v1202/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D'><img src={insta} alt="" className="s-icon" /></a>
            </div>
          </div>
        </div>
      </footer>
      <div className="cred">Designed by &#9829; <a href='https://github.com/Prashu-01' style={{ color: 'white' }}>Prashu</a>. All &copy; copyrights reserved.</div>
    </>
  )
}
