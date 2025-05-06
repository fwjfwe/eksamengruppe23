import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import EventPage from './EventPage'
import CategoryPage from './CatagoryPage'
import Dashboard from './Dashboard'
import SanityEventDetails from './SanityEventDetails'
import PageTitle from './components/PageTitle'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* må bytte denne */}
        <Route path="/event/:id" element={<EventPage />} /> 
        <Route path="/category/:categorySlug" element={<CategoryPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sanity-event/:slug" element={<SanityEventDetails />} /> {/* må bytte denne */}
      </Routes>
    </Router>
  )
}

export default App

