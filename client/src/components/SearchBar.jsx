import React, { useState } from 'react';
import { Button, Nav, NavItem } from 'reactstrap';
import "./style.css"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <Nav justified className='search'>
        <NavItem>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                className='search-bar'
            />
        </NavItem>
        <NavItem>
            <Button onClick={handleSearchClick} className='search-icon' color="primary" outline size="sm">Search</Button>
        </NavItem>      
    </Nav>
  );
};

export default SearchBar;
