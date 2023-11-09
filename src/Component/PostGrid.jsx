import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBoxsCurrentUser } from '../APIController';

const PostGrid = ({handleShowPrevContainer}) => {
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchBoxsCurrentUser = async () => {
      try {
        const data = await getBoxsCurrentUser(token);
        setPosts(data); // store the data in state
        console.log(posts);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBoxsCurrentUser();
  }, [token]);
  const postClick = () => {
    handleShowPrevContainer();
  }

  return (
      <div className='post-grid-list'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className='post-container' key={post._id}>
              <div className='post-detail' onClick={postClick}>
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
          <p>Bạn chưa có bài viết nào</p>
        )}
      </div>
  );
};

export default PostGrid;
