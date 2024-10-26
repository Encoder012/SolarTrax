import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero'
import Navbar from '../components/navbar'
import ExploreProjects from '../components/exploreProjects'
import {Dashboard} from '../components/dashboard'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        {/* <ExploreProjects /> */}
        {/* <Link to="/projects">Project</Link> */}
        <Dashboard />
    </div>
  )
}
export default Home;