import React, { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5296/api/User/GetCurrentUser");

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          throw new Error('Failed to get current user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
    </div>
  );
}

export default Test;