import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='*' element={" Not Found"} />
      </Routes>

      {/* Add ToastContainer here to render toasts */}
      <ToastContainer 
      position="bottom-right" // Set default position
      autoClose={3000}     // Set default auto-close duration
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // Optional: "light", "dark", or "colored"
      />
    </div>
    </>
  );
}

export default App;


