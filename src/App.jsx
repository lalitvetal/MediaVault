import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/collectionPage'

const App = () => {
   const theme = useSelector((state) => state.theme.mode)

   useEffect(() => {
      document.body.className = theme === 'light' ? 'light' : ''
   }, [theme])

   return (
      <BrowserRouter>
         {/* Ambient background orbs */}
         <div className="orb orb-1" />
         <div className="orb orb-2" />

         <div style={{ position: 'relative', zIndex: 1 }}>
            <Navbar />
            <main className="min-h-[80vh]">
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/collections" element={<CollectionPage />} />
               </Routes>
            </main>
            <Footer />
         </div>
      </BrowserRouter>
   )
}

export default App