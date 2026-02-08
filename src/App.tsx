import { useState } from 'react';
import './App.css';
import './index.css'
import ToggleThemeBtn from './components/togglebtn';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import SavedMovies from './pages/savedMovies';
import NoPageFound from './pages/nopageFound';
import Toaster from './toast/toaster';
import MovieDetails from './pages/fetchDetails';

function App() {

  const [isOpen, setOpen] = useState(false);

  return (
    <>
    <div className='flex flex-col min-h-screen'>
  <header className='bg-red-400 dark:bg-gray-700 flex justify-between px-4 py-1 items-center transition-all duration-500 ease-in-out'>
    <button onClick={()=>setOpen(!isOpen)} className='text-4xl h-5 mb-1.5 hover:text-gray-300 text-white inline-flex justify-center items-center md:hidden' title='Open-sidebar' aria-label='Open Sidebar' aria-expanded={isOpen}>≡</button>
    <Sidebar isOpen={isOpen} setIsOpen={setOpen}></Sidebar>
    <h1 className='text-4xl font-bold text-white uppercase'>FilmBox</h1>
    <div className='flex gap-4'>
      <Navbar />
    <ToggleThemeBtn/>
    </div>
  </header>
    <main className='flex-1'>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/aboutus' element={<AboutUs/>} />
      <Route path='/watchlist' element={<SavedMovies />}/>
      <Route path='/moviedetails/:id' element={<MovieDetails/>} />
      <Route path="*" element={<NoPageFound/>}/>
    </Routes>
    <Toaster />
    </main>
    <footer className='bg-red-400 dark:bg-gray-700 flex flex-wrap text-center justify-center mt-8 px-4 py-1 items-center transition-all duration-500 ease-in-out sticky text-white'>
      <p>© {new Date().getFullYear()} <span className="font-bold text-white">FilmBox</span>. Discover movies and curate your perfect watchlist.</p>
    </footer>
    </div>
    </>
  )
}

export default App
