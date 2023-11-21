import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CreateNew.css';
import { useSelector } from 'react-redux';
import { createBox } from '../../APIController';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';  


const CreateNew = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [response, setResponse] = useState(null);
  const [sharedStatus,setsharedStatus] = useState(false);
  const token = useSelector(state => state.user.token);

  const handleResetForm = () => {
    setTitle('');
    setContent('');
    setFile([]);
    setImage(null);
    setShowAlert(false);
    setResponse(null);
    setsharedStatus(false);
  };
  

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const isSuccess = await createBox(token, title, content, file, image, sharedStatus);
  
      if (isSuccess) {
        setResponse('Tạo mới thành công!');
        setShowAlert(true);
      } else {
        console.error('Tạo mới không thành công!'); 
        setResponse('Tạo mới không thành công!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e, index) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...file];
    updatedFiles[index] = newFiles[0];
    setFile(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setFile(updatedFiles);
  };
  const handleAddFileInput = () => {
    setFile([...file, null]);
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
            <div className='d-flex flex-column gap-3'>
            <span>Chọn tệp</span>
            {file.map((file, index) => (
            <div key={index}>
              <label htmlFor={`fileInput-${index}`} className="">
                <input
                  type="file"
                  id={`fileInput-${index}`}
                  accept="*/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </label>
              {file && (
                <div className="d-flex align-items-center">
                  <p className="me-2">{file.name}</p>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveFile(index)}>
                    Xóa
                  </Button>
                </div>
              )}
            </div>
          ))}</div>
            <button className='btn-add-file' onClick={handleAddFileInput}>
              Thêm tệp
            </button>
          <div className='d-flex flex-column gap-1'>
              <Form.Check
                type="checkbox"
                label="Chia sẻ"
                checked={sharedStatus}
                onChange={() => setsharedStatus(!sharedStatus)}
              />
          </div>
        </div>
        <div className='d-flex justify-content-end pe-5'>
        <button type="submit" className='btn-add'>Tạo mới</button>
        </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={() => {
        handleClose(); 
        handleResetForm();
        window.location.reload(); 
      }}>
          Đóng
        </Button>
        
      </Modal.Footer>
      {showAlert && (
        <Alert
          variant={response === "Tạo mới thành công!" ? "success" : "danger"}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {response}
        </Alert>
      )}
            
    </Modal>
  );
};

export default CreateNew;