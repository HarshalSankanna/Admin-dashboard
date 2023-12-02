import axios from 'axios';

// Function to fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    return response.data; 
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};
