import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero'
import Navbar from '../components/navbar'

const Home = () => {
  return (
    <div>
        {/* <Navbar /> */}
        <Hero />
        {/* <Link to="/projects">Project</Link> */}
    </div>
  )
}
export default Home;