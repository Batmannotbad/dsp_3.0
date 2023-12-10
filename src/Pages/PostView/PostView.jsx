import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import { useSelector } from 'react-redux';
import { getBoxDetail, getBoxFiles, getBoxShare } from '../../APIController';
import { useParams } from 'react'

const PostView = () => {
    const url  = useParams()
    const token = useSelector(state => state.user.token);
    const selectedPostId = useSelector(state => state.post.selectedPostID);
    const [postData, setPostData] = useState(null);
    const [postFiles, setPostFiles] = useState([]);
    const [sharedUsers,setSharedUsers]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(selectedPostId);
                setSharedUsers([]);
                setPostFiles([]);
                const boxDetailData = await getBoxDetail(token, selectedPostId);
                setPostData(boxDetailData);
    
                const sharedUserData = await getBoxShare(token, selectedPostId);
                setSharedUsers(sharedUserData);

                const postFilesList = await getBoxFiles(token,selectedPostId);
                setPostFiles(postFilesList);
                console.log(postFilesList);
                console.log(boxDetailData);
                console.log(postFilesList);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [selectedPostId]);    

  return (
    <div className='post-view'>
      <Header/>
      <div className='post-view-main'>
      <h1>Đường dẫn bài viết: {url}</h1>
        <div className='container'>
            <div className='post-view-banner'>
            {postData && postData.img && <img src={`http://localhost:5296/${postData.img}`} alt="" />}
            </div>
        </div>
      </div>
    </div>
  )
}

export default PostView
