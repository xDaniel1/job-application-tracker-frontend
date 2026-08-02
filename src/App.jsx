import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ApplicationPage from './pages/ApplicationPage'
import CreateApplicationPage from './pages/CreateApplicationPage'
import EditApplicationPage from './pages/EditApplicationPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications/new" element={<CreateApplicationPage />} />
        <Route path="/applications/:id" element={<ApplicationPage />} />
        <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
