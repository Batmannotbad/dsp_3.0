import React, { useEffect, useRef, useState } from 'react'
import { deleteBox, getBoxDetail, getBoxFiles, getBoxShare } from '../APIController';
import { useSelector } from 'react-redux';
import ConfirmModal from './ConfirmModal';
import { FileIcon, defaultStyles } from 'react-file-icon';
import UpdateModal from './UpdateModal';
import { Link } from 'react-router-dom';
import { getFileExtension } from '../functions';
import ShareModal from './ShareModal';


const PostDetail = ({ postId }) => {
    const token = useSelector(state => state.user.token);
    // const selectedPostId = useSelector(state => state.post.selectedPostID);
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [sharedUsers,setSharedUsers]= useState([]);
    const [postFiles, setPostFiles] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(postId);
                setSharedUsers([]);
                setPostFiles([]);
                const boxDetailData = await getBoxDetail(token, postId);
                setPostData(boxDetailData);
    
                const sharedUserData = await getBoxShare(token, postId);
                setSharedUsers(sharedUserData);

                const postFilesList = await getBoxFiles(token,postId);
                setPostFiles(postFilesList);
                console.log(postFilesList);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [postId]);    
    useEffect(() => {
        console.log(postData);
    }, [postData]);
    const handleDeleteBox = () => {
        setShowModal(true);
      };
    const confirmDelete = async () => {
    try {
        await deleteBox(token, postId);
    } catch (error) {
        console.error(error);
    } finally {
        setIsDeleted(true);
        setShowModal(false);
        window.alert('Bài viết đã bị xóa');
        window.location.reload();
    }
    };
      
    const handleCloseModal = () => {
    setShowModal(false);
    };
    
    
      const handleEditClick = () => {
        setShowUpdateModal(true);
      };
    
      const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
      };
      const handleShareModal =() => {
        setShowShareModal(true);
      }
      const closeShareModal = () => {
        setShowShareModal(false);
      }
  return (
    <div className='prev-container'>
        <div className='post-banner-prev'>
        {postData && <img src={`http://localhost:5296/${postData.img}`} alt="" />}
        </div>
        <div className='activities-button d-flex justify-content-between'>
            <button className='control-btn'>
            <img src="./img/downloadbtn.png" alt="downloadbtn" />
            </button>
            <button className='control-btn' onClick={handleDeleteBox}>
            <img src="./img/binbtn.png" alt="binbtn" />
            </button>
            <ConfirmModal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={confirmDelete}
            />
            {postData && postData.url && (
                <Link to={`/post/${postData.id}/${postData.url}`}>
                    <button className='control-btn'>
                    <img src="./img/detailsbtn.png" alt="detailsbtn" />
                    </button>
                </Link>
                )}


        </div>
        <div className='prev-post-title'>
            {postData&& <span>{postData.title}</span>}
        </div>
        <div className='prev-post-content'>
            <h4 className='prev-header'>Nội dung</h4>
            {postData&& <p>{postData.content}</p>}
        </div>
        <div className='prev-files'>
            <h4 className='file-count prev-header'> {postFiles.length} tệp tin</h4>
            <div className='file-list'>
                {postFiles.length>0?(
                    postFiles.map((file)=> (
                        <div className='file-item d-flex flex-column align-items-center gap-3' key={(file.id)}>
                            <div style={{ width: '48px', height: '48px', color: 'red' }}>
                                <FileIcon color='#f3e0e0' extension={getFileExtension(file.name)} {...defaultStyles} />
                            </div>
                            <a href="/" title={file.name}>{file.name}</a>
                        </div>
                    ))
                ):(
                    <p>Bài viết chưa có tài liệu nào</p>
                )}
            </div>
        </div>
        <div className='rev-accessibility'>
        <h4 className='prev-header'> Người có quyền truy cập</h4>
        <div className='access-grid'>
            {sharedUsers.length > 0 ? (
                sharedUsers.map((sharedUser)=> (
            <div className='accessible-users d-flex flex-column align-items-center gap-1' key={(sharedUser.id)}>
                <div className='user-details '>
                <img src={`http://localhost:5296/${sharedUser.img}`} alt="user img" className='rounded-circle' />
                </div>
                <span className='accessible-user-name'>{sharedUser.name}</span>
                <span className='user-role'>{sharedUser.editAccess ? 'Edit' : 'View'}</span>
            </div>
                ))
            ):(
                <p>Bài viết chưa được chia sẻ</p>
            )}
        </div>
        </div>
        <div className='post-edit d-flex mt-4 justify-content-evenly gap-5'>
            <button className='post-edit-btn share-btn'onClick={handleShareModal}>Chia sẻ</button>
            <button className='edit-btn post-edit-btn'onClick={handleEditClick}>Chỉnh sửa</button>
        </div>
        <ShareModal
            show={showShareModal}
            handleClose={closeShareModal}
            />
        <UpdateModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        postId={postId}
      />
    </div>
  )
}

export default PostDetail
