export const loginAndGetToken = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5296/api/Account/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const token = await response.text();
        return token;
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  export const loginByToken = async (username, password) => {
  try {
    const token = await loginAndGetToken(username, password);
    const response = await fetch('http://localhost:5296/api/Account/LoginByToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify()
    });

    if (response.ok) {
      const data = await response.text();
    //   console.log("Đăng nhập bằng token thành công");
      return data;
    } else {
      throw new Error('Failed to login by token');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const getCurrentUser = async (token) => {
    try {
      const response = await fetch('http://localhost:5296/api/User/GetCurrentUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
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
  };
  export const signup = async (userName, passWord, rePass) => {
    try {
      const response = await fetch('http://localhost:5296/api/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          passWord,
          rePass
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to signup');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  export const getBoxsCurrentUser = async (token) => {
    try {
      const response = await fetch('http://localhost:5296/api/Box/GetBoxsCurrentUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to get boxes of current user');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  export const getSharedBoxs = async (token) => {
    try {
      const response = await fetch('http://localhost:5296/api/BoxInteract/GetBoxShareCurrentUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
      console.log(data);
      return data;
      } else {
        throw new Error('Failed to get boxes of current user');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  export const createBox = async (token, title, content, file, img) => {
  try {
    const formData = new FormData();
    formData.append('Title', title);
    if (content) {
      formData.append('Content', content);
    }
    
    if (img) {
      formData.append('Img', img);
    }
    
    if (file.length > 0) {
      const filesArray = Array.isArray(file) ? file : Array.from(file);
      filesArray.forEach((file, i) => {
        formData.append('Files', file, file.name);
      });
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
    }

    const response = await fetch('http://localhost:5296/api/Box/CreateBox', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.text();
      console.log(data);
      return data;
    } 
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getBoxDetail = async (token, boxId) => {
  try {
    const response = await fetch(`http://localhost:5296/api/Box/GetBoxDetail?${boxId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to get box detail');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};