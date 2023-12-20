import React, { useState } from 'react';
import { addBoxShare, deleteFile } from './APIController';
import { useSelector } from 'react-redux';

function ShareBoxForm() {
  const token = useSelector(state => state.user.token);
  const [Id, setId] = useState('');
  const [boxId, setBoxId] = useState('');
  const [userName, setUserName] = useState('');
  const [fileName, setFileName] = useState('');

  const handleDeleteFile = async () => {
    try {
      const result = await deleteFile(token, Id,boxId, fileName, userName);
      console.log('File deleted successfully:', result);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <label>
         ID:
        <input type="text" value={Id} onChange={(e) => setId(e.target.value)} />
      </label>
      <label>
        Box ID:
        <input type="text" value={boxId} onChange={(e) => setBoxId(e.target.value)} />
      </label>
      <label>
        filename:
        <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
      </label>
      <br />
      <label>
        User Name:
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <br />
      <button onClick={handleDeleteFile}>delete</button>
    </div>
    );
}

export default ShareBoxForm;
