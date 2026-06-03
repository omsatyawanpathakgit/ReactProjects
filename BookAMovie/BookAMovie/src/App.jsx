import './App.css';
import { Navbar } from './Navbar';
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { Book } from './pages/Book';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AboutUs } from './AboutUs';
import { WishList } from './pages/WishList';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element ={<AboutUs/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
      </Routes>
    </div>
  );
}

export default App;
