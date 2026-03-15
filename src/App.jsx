import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import CaseStudies from './pages/CaseStudies'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import { useState } from 'react'

export default function App() {
  const [modalKey, setModalKey] = useState(null)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home openModal={setModalKey} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio openModal={setModalKey} />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      {modalKey && <Modal projectKey={modalKey} onClose={() => setModalKey(null)} />}
    </>
  )
}
