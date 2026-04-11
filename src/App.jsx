import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Modal from './components/Modal'

// Lazy-loaded pages — each page is a separate JS chunk (better Core Web Vitals)
const Home        = lazy(() => import('./pages/Home'))
const Services    = lazy(() => import('./pages/Services'))
const Portfolio   = lazy(() => import('./pages/Portfolio'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const About       = lazy(() => import('./pages/About'))
const FAQ         = lazy(() => import('./pages/FAQ'))
const Contact     = lazy(() => import('./pages/Contact'))

// Minimal loading fallback — matches the site background so there's no flash
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--md, #501010)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '2px solid rgba(201,150,58,0.2)',
        borderTop: '2px solid #D4AF37',
        borderRadius: '50%',
        animation: 'spin 0.75s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  const [modalKey, setModalKey] = useState(null)

  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"             element={<Home openModal={setModalKey} />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/portfolio"    element={<Portfolio openModal={setModalKey} />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about"        element={<About />} />
          <Route path="/faq"          element={<FAQ />} />
          <Route path="/contact"      element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
      {modalKey && <Modal projectKey={modalKey} onClose={() => setModalKey(null)} />}
    </>
  )
}
