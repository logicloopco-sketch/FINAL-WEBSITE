import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/global.css'
import './styles/home.css'
import './styles/pages.css'

/* vite-react-ssg mounts on the client (hydrating the prerendered HTML) and is
   also used by the build to render each route to static HTML. Same React app. */
export const createRoot = ViteReactSSG({ routes })
