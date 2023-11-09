async function getCurrentUser() {
    try {
      const response = await fetch("http://localhost:5296/api/User/GetCurrentUser");
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to get current user');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }