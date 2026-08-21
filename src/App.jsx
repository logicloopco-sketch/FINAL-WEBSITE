import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

const Home          = lazy(() => import('./pages/Home'))
const Services      = lazy(() => import('./pages/Services'))
const ManagedHosting = lazy(() => import('./pages/ManagedHosting'))
const Pricing       = lazy(() => import('./pages/Pricing'))
const CaseStudies   = lazy(() => import('./pages/CaseStudies'))
const Contact       = lazy(() => import('./pages/Contact'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', background: '#071d33', display: 'grid', placeItems: 'center' }}>
      <div style={{
        width: 34, height: 34,
        border: '2px solid rgba(243,228,201,0.2)',
        borderTop: '2px solid #F3E4C9',
        borderRadius: '50%',
        animation: 'spin 0.75s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/services"        element={<Services />} />
          <Route path="/managed-hosting" element={<ManagedHosting />} />
          <Route path="/pricing"         element={<Pricing />} />
          <Route path="/case-studies"    element={<CaseStudies />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="*"                element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
