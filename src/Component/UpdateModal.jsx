import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getBoxDetail, getBoxFiles, getBoxShare, updatePost, uploadFile } from '../APIController';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import FileTable from './FileTable';


const UpdateModal = ({show,handleClose}) => {
    const token = useSelector((state) => state.user.token);
    const postID = useSelector((state) => state.post.selectedPostID);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sharedStatus, setSharedStatus] = useState(false);
    const [img, setImg] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [response, setResponse] = useState(null);
    const [postFiles, setPostFiles] = useState([]);
    const [sharedUsers,setSharedUsers]= useState([]);
    const [postData, setPostData] = useState(null);
    const [file, setFile] = useState([]);




    const handleUpdateBox = async (e) => {
        e.preventDefault();
    
        try {
          const uploadPromises = file.map((fileItem) => {
            if (fileItem) {
              return uploadFile(token, postID, fileItem);
            }
            return null;
          });
    
          const uploadedFiles = await Promise.all(uploadPromises);
    
          const isSuccess = await updatePost(token, postID, title, content, sharedStatus, img, uploadedFiles);
          if (isSuccess) {
            setResponse('Chỉnh sửa thành công!');
            setShowAlert(true);
          } else {
            console.error('Chỉnh sửa không thành công!');
            setResponse('Chỉnh sửa không thành công!');
            setShowAlert(true);
          }
        } catch (error) {
          console.error('Failed to update Box:', error.message);
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
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(postID);
                setSharedUsers([]);
                setPostFiles([]);
                const boxDetailData = await getBoxDetail(token, postID);
                setPostData(boxDetailData);
                console.log(postData);
    
                // const sharedUserData = await getBoxShare(token, postID);
                // setSharedUsers(sharedUserData);

                const postFilesList = await getBoxFiles(token,postID);
                setPostFiles(postFilesList);
                console.log(postFilesList);

                setTitle(boxDetailData.title || '');
                setContent(boxDetailData.content || '');
                setImg(boxDetailData.img || '');
                setSharedStatus(boxDetailData.sharedStatus || false);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [postID]);    


  return (
        <Modal onHide={handleClose} centered size="lg" className='modal-custom' show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin bài viết</Modal.Title>
            </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleUpdateBox} className='d-flex flex-column gap-2'>
                <div className='d-flex flex-column gap-3 px-4'>
                    <input 
                        type="text"
                        value={title}
                        placeholder='Thêm tiêu đề'
                        className='create-input-style'
                        onChange={e => setTitle(e.target.value)}
                        />
                    <div className='d-flex flex-column gap-1'>
                        <img src={`http://localhost:5296/${img}`} alt="post banner" className='update-banner' />
                        <label htmlFor="images" class="drop-container" id="dropcontainer">
                            <span class="drop-title">Chọn ảnh bìa khác{" "}</span>
                            <input
                            type="file" 
                            id="images" 
                            accept="image/*" 
                            className='img-upload'
                            onChange={e => setImg(e.target.files[0])}
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
                    <div className='d-flex flex-column gap-1'>
                        <Form.Check
                            type="checkbox"
                            label="Chia sẻ"
                            checked={sharedStatus}
                            onChange={() => setSharedStatus(!sharedStatus)}
                        />
                    </div>
                    <div>
                        <FileTable postFiles={postFiles} boxId={postID} token={token}/>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        {file.map((fileItem, index) => (
                            <div key={index} className="d-flex gap-2">
                            <input type="file" onChange={(e) => handleFileChange(e, index)} />
                            <Button variant="danger" size="sm" onClick={() => handleRemoveFile(index)}>
                                Xóa
                            </Button>
                            </div>
                        ))}
                        <button type="button" className='btn-add-file' onClick={handleAddFileInput}>
                            Thêm tệp
                        </button>
                        </div>
                </div>
                <div className='d-flex justify-content-end pe-5'>
                    <button type="submit" className='btn-add'>Chỉnh sửa</button>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => {
        handleClose(); 
        // handleResetForm();
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
  )
}

export default UpdateModal
