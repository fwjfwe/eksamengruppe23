import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import SanityEventDetails from './components/SanityEventDetails'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sanity-event/:slug" element={<SanityEventDetails />} />
      </Routes>
    </>
  )
}

export default App


//TEST123
//TEST2123
//TEST3123