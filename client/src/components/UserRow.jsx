import React, { useEffect } from 'react';
import { fetchUserData } from '../api/api'; 

const UserRow = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        console.log(userData); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <></>
  );
};

export default UserRow;
