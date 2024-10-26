import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero'
import Navbar from '../components/navbar'
import ExploreProjects from '../components/exploreProjects'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        {/* <ExploreProjects /> */}
        {/* <Link to="/projects">Project</Link> */}
    </div>
  )
}
export default Home;