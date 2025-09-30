import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <Router>
        <div>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-event' element={<EventForm />} />
            <Route path='/all-events' element={<EventList />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App