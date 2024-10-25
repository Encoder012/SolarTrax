
import './App.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Projects from './pages/Projects';

function App() {


  return (<div>
    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  </div>
  
  )
}

export default App
