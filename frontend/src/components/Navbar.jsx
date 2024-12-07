import { FaSun, FaMoon, FaPlus } from "react-icons/fa"; 
import React, { useState } from "react";
import "../styles/Navbar.css";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [searchQuery, setSearchQuery] = useState()
    
    const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.className = isDarkTheme ? "light-theme" : "dark-theme";
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search query:", searchQuery); // Handle search functionality here
    };

    const navigate = useNavigate();

    const handleAddProductClick = (onClick) => {
        navigate ('/create') // Adjust this path to your "Create Product" route
    };


    return (
    <nav className={`navbar ${isDarkTheme ? "dark" : "light"}`}>
        <div className="navbar-left">
            <h1 className="website-name">AdminCart</h1>
        </div>
        <div className="navbar-center">
        <form onSubmit={handleSearchSubmit} className="search-form">
            <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
            />
        </form>
        </div>
        <div className="navbar-right">
            <button onClick={toggleTheme} className="theme-toggle">
            {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button> 
            <button className="add-product-btn" onClick={handleAddProductClick} ><FaPlus/></button>
        </div>
    </nav>
    );
};

export default Navbar;
