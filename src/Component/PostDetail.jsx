import React, { useEffect, useRef, useState } from 'react'
import { deleteBox, getBoxDetail, getBoxShare } from '../APIController';
import { useSelector } from 'react-redux';
import ConfirmModal from './ConfirmModal';

const PostDetail = ({ postId }) => {
    const token = useSelector(state => state.user.token);
    const selectedPostId = useSelector(state => state.post.selectedPostID);
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [sharedUsers,setSharedUsers]= useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log(postId);
    //             const data = await getBoxDetail(token, postId);
    //             setPostData(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchData();
    // }, [postId]);
    // useEffect(() => {
    //     const fetchSharedUser = async () => {
    //         try {
    //             const data = await getBoxShare(token,postId);
    //             setSharedUsers(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchSharedUser();
    // },[postId]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(postId);
                // Clear shared user data when fetching details for a new post
                setSharedUsers([]);
                
                const boxDetailData = await getBoxDetail(token, postId);
                setPostData(boxDetailData);
    
                const sharedUserData = await getBoxShare(token, postId);
                setSharedUsers(sharedUserData);
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
            
            <button className='control-btn'>
            <img src="./img/detailsbtn.png" alt="detailsbtn" />
            </button>

        </div>
        <div className='prev-post-title'>
            {postData&& <span>{postData.title}</span>}
        </div>
        <div className='prev-post-content'>
            <h4 className='prev-header'>Nội dung</h4>
            {postData&& <p>{postData.content}</p>}
        </div>
        <div className='prev-files'>
            <h4 className='file-count prev-header'> 3 tệp tin</h4>
            <div className='file-list'>
            <div className='file-item d-flex flex-column align-items-center'>
                <img src="./img/DOCX.png" alt="DOCX" />
                <a href="/" title="Báo cáo thống kê số lượng tỉnh thành sử dụng VNForm trên Cổng Dịch vụ Công trực tuyến">Báo cáo thống kê số lượng tỉnh thành sử dụng VNForm trên Cổng Dịch vụ Công trực tuyến</a>
            </div>
            <div className='file-item d-flex flex-column align-items-center'>
                <img src="./img/XSL.png" alt="XSL" />
                <a href="/" title="Báo cáo thống kê số lượng tỉnh thành sử dụng VNForm trên Cổng Dịch vụ Công trực tuyến">Báo cáo thống kê số lượng tỉnh thành sử dụng VNForm trên Cổng Dịch vụ Công trực tuyến</a>
            </div>
            <div className='file-item d-flex flex-column align-items-center'>
                <img src="./img/PDF.png" alt="PDF" />
                <a href="/" title="Báo cáo thống kê số lượng tỉnh thành sử dụng VNForm trên Cổng Dịch vụ Công trực tuyến">Báo cáo thống kê số lượng tỉnh thành sử dụng VNForm trên Cổng Dịch vụ Công trực tuyến</a>               
                </div>
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
                <p>Bìa viết chưa được chia sẻ</p>
            )}
        </div>
        </div>
        <div className='post-edit d-flex mt-4 justify-content-evenly gap-5'>
            <button className='post-edit-btn share-btn'>Chia sẻ</button>
            <button className='edit-btn post-edit-btn'>Chỉnh sửa</button>
        </div>
    </div>
  )
}

export default PostDetail
