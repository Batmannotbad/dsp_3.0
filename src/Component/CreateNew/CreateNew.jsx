import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CreateNew.css';
import { useSelector } from 'react-redux';
import { createBox } from '../../APIController';
import { Alert } from 'react-bootstrap';

const CreateNew = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [response, setResponse] = useState(null);
  const token = useSelector(state => state.user.token);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createBox(token,title, content, file, image);
      console.log(response);
      setResponse(response);
      setShowAlert(true);

    } catch (error) {
      console.error(error);
      

    }
  };
  
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className='modal-custom'>
      <Modal.Header closeButton>
        <Modal.Title>Bài viết mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <div className='d-flex flex-column gap-3 px-4'>
          <input 
            type="text"
            value={title}
             placeholder='Thêm tiêu đề'
             className='create-input-style'
             onChange={e => setTitle(e.target.value)}
             />
          <div className='d-flex flex-column gap-1'>
          <label for="images" class="drop-container" id="dropcontainer">
            <span class="drop-title">Thả ảnh vào đây{" "}</span>
            hoặc {" "}
            <input
               type="file" 
               id="images" 
               accept="image/*" 
              className='img-upload'
              onChange={e => setImage(e.target.files[0])}
              />
          </label>
          </div>
          <label className='create-input-style'>Nội dung bài viết:</label>
          <textarea 
            value={content} 
            className='text-content'
            placeholder='Nhập nội dung bài viết ở đây'
            onChange={e => setContent(e.target.value)}
             />

         
          <label className="">
            <input 
              type="file" 
              id="documents" 
              accept="*/*" 
              multiple 
              onChange={e => setFile(Array.from(e.target.files))}/>
          </label>
          <div>
            {file.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
          </div>
        </div>
        <button type="submit">Tạo mới</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        
      </Modal.Footer>
      {showAlert && (
        <Alert
          variant={response === "1. Create successfully" ? "success" : "danger"}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {response === "1. Create successfully" ? "Tạo mới thành công!" : "Tạo mới không thành công!"}
        </Alert>
      )}
            
    </Modal>
  );
};

export default CreateNew;