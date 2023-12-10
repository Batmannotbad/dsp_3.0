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
  // Tạo Post
export const createBox = async (token, title, content, file, img, sharedStatus) => {
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
    }

    formData.append('SharedStatus', sharedStatus);

    const response = await fetch('http://localhost:5296/api/Box/CreateBox', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


//Lấy thông tin chi tiết của Post
export const getBoxDetail = async (token, boxId) => {
  try {
    const response = await fetch(`http://localhost:5296/api/Box/GetDetailBox?boxId=${boxId}`, {
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


export const getSharedBoxsAndDetails = async (token) => {
  try {
    const sharedBoxs = await getSharedBoxs(token);
    const boxIds = sharedBoxs.map((box) => box.boxId);
    const boxDetails = await Promise.all(boxIds.map((boxId) => getBoxDetail(token, boxId)));
    return boxDetails;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Delete Post
export const deleteBox = async (token, boxId) => {
  try {
    const response = await fetch(`http://localhost:5296/api/Box/DeleteBox?boxId=${boxId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to delete box');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const userLogout = async (token) => {
  try {
    const response = await fetch('http://localhost:5296/api/Account/Logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
    } else {
      throw new Error('Failed to logout');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getBoxShare = async (token, boxId) => {
  try {
    const response = await fetch(`http://localhost:5296/api/BoxInteract/GetUserShareInBox?boxId=${boxId}`, {
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
      throw new Error('Failed to get shared user in POst');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const putUserImg = async (token, image) => {
  try {
    const formData = new FormData();
    formData.append('Img', image);//lỗi ở đây 

    const response = await fetch(`http://localhost:5296/api/User/UpdateImgUser`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.text();
      console.log(data);
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateUserInformation = async (token,username,jobTitle,description) => {
  try {
    const formData = new FormData();
    formData.append('Name',username);
    formData.append('Jobtitle', jobTitle);
    formData.append('description', description);

    const response = await fetch('http://localhost:5296/api/User/UpdateUserInfor',{
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
    if (response.ok) {
      const data = await response.text();
      console.log(data);
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//Get Box Files
export const getBoxFiles = async(token,boxId)  => {
  try {
    const response = await fetch(`http://localhost:5296/api/Box/GetListFileInBox?boxId=${boxId}`, {
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const updatePost = async(token,boxId, title, content, sharedStatus, img) => {
  try {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Content', content);
    formData.append('SharedStatus', sharedStatus);
    if (img) {
      formData.append('Img', img);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const response = await fetch(`http://localhost:5296/api/Box/UpdateBox?Id=${boxId}`,{
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
    body: formData,
      });
      if (response.ok) {
        const data = await response.text();
        console.log(data);
        return data;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  
    

}
export const getAllBoxs = async(token)  => {
  try {
    const response = await fetch(`http://localhost:5296/api/Admin/GetALLBox`, {
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUserList = async(token)  => {
  try {
    const response = await fetch(`http://localhost:5296/api/Admin/GetListUser`, {
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const downloadAllFiles = async (token,boxId) => {
  try {
    const response = await fetch(`http://localhost:5296/api/Box/DowloadAllFile?boxId=${boxId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const blobData = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blobData);
      return downloadUrl;

    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// export const downloadFile = async (token,boxId,fileName) => {
//   try {
//     const response = await fetch(`http://localhost:5296/api/Box/DowloadFile?boxId=${boxId}&fileName=${fileName}`,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (response.ok) {
//       const blobData = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blobData);
//       return downloadUrl;

//     } else {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };
// export const downloadFile = async (token, boxId, fileName) => {
//   try {
//     const response = await fetch(
//       `http://localhost:5296/api/Box/DowloadFile?boxId=${boxId}&fileName=${fileName}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     if (response.ok) {
//       const contentDisposition = response.headers.get('Content-Disposition');
//       const match = contentDisposition && contentDisposition.match(/filename="(.+?)"/);
//       const suggestedFileName = match && match[1];

//       const sanitizedFileName = suggestedFileName || fileName;

//       const blobData = await response.blob();

//       const downloadUrl = window.URL.createObjectURL(blobData);

//       return { downloadUrl, fileName: sanitizedFileName };
//     } else {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };
export const downloadFile = async (token, boxId, fileName) => {
  try {
    const response = await fetch(
      `http://localhost:5296/api/Box/DowloadFile?boxId=${boxId}&fileName=${fileName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      let suggestedFileName = fileName; 

      const contentDisposition = response.headers.get('Content-Disposition');
      console.log('Content-Disposition Header:', contentDisposition);

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/);
        suggestedFileName = match ? match[1] : suggestedFileName;
      }

      const sanitizedFileName = suggestedFileName.trim();

      console.log('Suggested File Name:', sanitizedFileName);

      const blobData = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blobData);
      console.log(fileName);

      return { downloadUrl, fileName: sanitizedFileName };
    } else {
      throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    }
  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
};

