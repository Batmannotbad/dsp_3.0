import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { addBoxShare } from '../APIController';

function ShareModal({show,handleClose}) {
    const [userName, setUserName] = useState('');
    const [editAccess, setEditAccess] = useState(false);
    const token = useSelector((state) => state.user.token);
    const postID = useSelector((state) => state.post.selectedPostID);
    const [showAlert, setShowAlert] = useState(false);
    const [response, setResponse] = useState(null);



    const handleShare = async () => {
        try {
            const isSuccess = await addBoxShare(postID, userName,editAccess,token);
            if (isSuccess) {
                setResponse('Chia sẻ thành công!');
                setShowAlert(true);
              } else {
                console.error('Chia sẻ không thành công!'); 
                setResponse('Chia sẻ không thành công!');
                setShowAlert(true);
              }
          } catch (error) {
            console.error('Failed to share Box:', error.message);
          }
    };
  return (
    <Modal onHide={handleClose} centered size="lg" className='modal-custom' show={show}>

            <Modal.Header closeButton>
                <Modal.Title>Chia sẻ bài viết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleShare}>
                <div className='d-flex flex-column gap-3 px-4'>
                    <input 
                        type="text"
                        value={userName}
                        placeholder='Nhập tên người dùng'
                        className='create-input-style'
                        onChange={e => setUserName(e.target.value)}
                        />
                        <div className='d-flex flex-column gap-1'>
                        <Form.Check
                            type="checkbox"
                            label="Chỉnh sửa"
                            checked={editAccess}
                            onChange={() => setEditAccess(!editAccess)}
                        />
                    </div>
                    </div>
                    <div className='d-flex justify-content-end pe-5'>
                        <button type="submit" className='btn-add'>Chia sẻ</button>
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
                variant={response === "Chia sẻ thành công!" ? "success" : "danger"}
                onClose={() => setShowAlert(false)}
                dismissible
                >
                {response}
                </Alert>
            )}
    </Modal>
  )
}

export default ShareModal