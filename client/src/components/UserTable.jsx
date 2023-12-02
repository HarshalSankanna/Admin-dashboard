import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../api/api';
import UserRow from './UserRow'; 
import SearchBar from './SearchBar';
import { Nav, NavItem, Button, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "./style.css"

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredUserData, setFilteredUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        const userDataWithSelection = data.map(user => ({ ...user, selected: false }));
        setUserData(userDataWithSelection);
        setOriginalUserData(userDataWithSelection);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (filteredUserData.length > 0 ? filteredUserData : userData)
    .slice(indexOfFirstItem, indexOfLastItem);


  // Handle changing page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleEdit = (id, editedData) => {
    const updatedUserData = userData.map(user => {
      if (user.id === id) {
        return { ...user, ...editedData };
      }
      return user;
    });
    setUserData(updatedUserData);
  };
  

  const handleDelete = () => {
    const updatedUserData = userData.filter(user => !user.selected);
    setUserData(updatedUserData);
    setSelectAll(false);
    console.log('Deleted selected users');
  };

  const handleSelectAll = () => {
    const updatedCurrentItems = currentItems.map(user => ({ ...user, selected: !selectAll }));
    const updatedUserData = userData.map(user => {
      const index = updatedCurrentItems.findIndex(item => item.id === user.id);
      if (index !== -1) {
        return updatedCurrentItems[index];
      }
      return user;
    });
    setUserData(updatedUserData);
    setSelectAll(prevSelectAll => !prevSelectAll);
  };  

  const handleSelect = (id) => {
    const updatedUserData = userData.map(user => {
      if (user.id === id) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setUserData(updatedUserData);
  };

  const handleSearch = (searchTerm) => {
    const filteredData = originalUserData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUserData(filteredData); 
    setCurrentPage(1); 
  };

  return (
    <div>
      <Nav className='search-delete'>
      <NavItem><SearchBar onSearch={handleSearch} /></NavItem>
      <NavItem>
        <Button onClick={handleDelete} color="danger" size="sm">Delete Selected</Button>
      </NavItem>
      </Nav>
      <Table hover responsive>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(user => (
            <UserRow
              className={user.selected ? 'selected-row' : ''}
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          ))}
        </tbody>
      </Table>
      <Pagination className='navigation-btns'>
        <PaginationItem>
          <PaginationLink
            first
            onClick={() => paginate(1)} className='first-page'
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => paginate(currentPage - 1)} className='previous-page'
            previous
          />
        </PaginationItem>
          {Array.from({ length: Math.ceil(userData.length / itemsPerPage) }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => paginate(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationLink
            onClick={() => paginate(currentPage + 1)} className='next-page' 
            next
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => paginate(Math.ceil(userData.length / itemsPerPage))} className='last-page'
            last
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default UserTable;




