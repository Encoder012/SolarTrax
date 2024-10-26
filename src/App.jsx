
import './App.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import PostProject from './pages/PostProject';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/login';


import { Dashboard } from './components/dashboard';
function App() {


  return (<div>
    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/post-project" element={<PostProject/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />        <Route path="/projects/post-project" element={<PostProject />} />
      
        

      </Routes>
    </Router>
  </div>
  
  )
}

export default App
