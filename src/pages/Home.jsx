import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero'
import Navbar from '../components/navbar'
import ExploreProjects from '../components/exploreProjects'

const Home = () => {
  return (
    <>
        <Hero />
        {/* <ExploreProjects /> */}
        <Link to="/projects">Project</Link>
        {/* <Dashboard /> */}
      </>
  )
}
export default Home;