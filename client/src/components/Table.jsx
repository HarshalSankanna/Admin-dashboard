import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../api/api';
import UserRow from './UserRow'; 

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        const userDataWithSelection = data.map(user => ({ ...user, selected: false }));
        setUserData(userDataWithSelection);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

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
    const updatedUserData = userData.map(user => ({ ...user, selected: !selectAll }));
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

  return (
    <div>
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
          {userData.map(user => (
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
    </div>
  );
};

export default Table;
