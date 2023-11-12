import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSharedBoxs, getSharedBoxsAndDetails } from '../APIController'
import { updateSelectedPostId } from '../features/postSlice';

const SharedPost = ({handleShowPrevContainer}) => {
    const dispatch = useDispatch();
    const [posts,setPosts] =useState([]);
    const token = useSelector((state) => state.user.token);
    const [boxDetails, setBoxDetails] = useState([]); // Khai báo biến state boxDetails
      useEffect(() => {
        getSharedBoxsAndDetails(token)
          .then((boxDetails) => {
            console.log(boxDetails);
            setBoxDetails(boxDetails);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []); 
      const postClick = async (postId) => {
        await dispatch(updateSelectedPostId(postId));
        handleShowPrevContainer(postId);
        console.log();
      };
     
  return (
    <div className='post-grid-list'>
      {boxDetails.length > 0 ? (
        boxDetails.map((post) => (
          <div className='post-container' key={post.id}>
            {/* <div className='post-detail'> */}
            <div className='post-detail' onClick={() => postClick(post.id)}>
              <div className='border-bottom-thick'>
                <div className='post-banner-icon d-flex justify-content-between'>
                <img src={`http://localhost:5296/${post.img}`} alt='post banner' className='banner-img' />
                  <button className='detail-icon'>
                    <img src='./img/3dotbutton.png' alt='icon' />
                  </button>
                </div>
                <div className='container-post-title'>
                  <div className='post-title-sbox'>
                    <h5>{post.title}</h5>
                  </div>
                  <div className='date-created-sbox'>
                    <span>{post.dateCreated.split('T')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Bạn chưa được chia sẻ bài viết nào</p>
      )}
  </div>
  )
}

export default SharedPost
