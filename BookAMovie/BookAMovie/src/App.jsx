import './App.css';
import { Navbar } from './Navbar';
import { HomePage } from './pages/HomePage';
import { ContentsPage } from './pages/ContentsPage';
import { Book } from './pages/Book';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AboutUs } from './AboutUs';
import { WishList } from './pages/WishList';
import { BookingSuccess } from "./pages/BookingSuccess";
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contents" element={<ContentsPage/>} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element ={<AboutUs/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
