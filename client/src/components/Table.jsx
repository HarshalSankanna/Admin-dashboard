import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../api/api';
import UserRow from './UserRow'; 
import SearchBar from './SearchBar';

const Table = () => {
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
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleDelete} style={{ float: 'right' }}>
        Delete Selected
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(user => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => paginate(1)}>First</button>
        <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        
        {Array.from({ length: Math.ceil(userData.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)}>Next</button>
        <button onClick={() => paginate(Math.ceil(userData.length / itemsPerPage))}>Last</button>
      </div>

    </div>
  );
};

export default Table;
