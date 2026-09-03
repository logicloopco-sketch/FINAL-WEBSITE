import Layout from './Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import ManagedHosting from './pages/ManagedHosting'
import Pricing from './pages/Pricing'
import CaseStudies from './pages/CaseStudies'
import Contact from './pages/Contact'

/* Route table for vite-react-ssg. Each concrete path is prerendered to static
   HTML at build time, then hydrated by the same React app in the browser. */
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'managed-hosting', element: <ManagedHosting /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'case-studies', element: <CaseStudies /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Home /> },
    ],
  },
]
