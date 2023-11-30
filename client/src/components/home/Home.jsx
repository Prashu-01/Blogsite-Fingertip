import React, { useEffect } from 'react'
import '../styles/home.css'
import '../styles/carousel.css'
// components
import Hero from './Hero.jsx'
import Post from './posts/Post.jsx'
import Footer from '../footer/Footer'


export default function Home(props) {

  useEffect(() => {
    props.togglenav(1)
  }, [])

  return (
    <>

      <Hero />
      {/* <Carousel /> */}
      <Post />
      <Footer />
    </>
  )
}
