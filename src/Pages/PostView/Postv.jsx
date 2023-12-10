import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBoxDetail, getBoxFiles, getBoxShare } from '../../APIController';
import Header from '../../Component/Header';
import QRCode from 'qrcode.react';
import './PostView.css';
import { formatDateTime, getFileExtension } from '../../functions';
import { FileIcon, defaultStyles } from 'react-file-icon';
import FileTable from '../../Component/FileTable';

const PostView = () => {
    const params = useParams();
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
            <div className='container-xxl post-view-container mb-5'>
                <div className='d-flex flex-column'>
                    <div className='post-date-created my-2'>
                    {postData && postData.dateCreated&&
                        <div>{formatDateTime(postData.dateCreated)}</div>
                        }
                    </div>
                    <div className='post-view-title pb-2 my-3'>
                    {postData && postData.title&&
                        <div>{postData.title}</div>
                        }
                        
                    </div>           
                    <div className='post-view-banner mb-4'>
                        {postData && postData.img && <img src={`http://localhost:5296/${postData.img}`} alt="" />}
                    </div>
                    <div  className='pos-view-content my-3'>
                    {
                        postData&& postData.content &&
                        <p>{postData.content}</p>
                    }
                    </div>
                    <div className='post-view-files'>
                    <div className='d-flex align-items-center gap-2 mb-4'>
                        <img src="/img/dot.png" alt="dot" />
                        <div className='title-view'>{postFiles.length} tài liệu đính kèm</div>
                    </div>
                        <div>
                            <FileTable postFiles={postFiles} boxId={selectedPostId} token={token}/>
                        </div>
                    </div>
                    <div className='post-view-share'>
                    <div className='d-flex align-items-center gap-2'>
                        <img src="/img/dot.png" alt="dot" />
                        <div className='title-view'>Chia sẻ</div>
                    </div>
                    {
                        postData&& postData.url &&
                        <div className='d-flex  align-items-center link-box gap-5'>
                            <div className='link-title'>Đường dẫn</div>
                            <div className='text-center'>http://Localhost:3000/post/{postData.url}</div>
                        </div>
                    }
                    </div>
                    <div className='post-qrcode'>
                        {
                            postData && postData.url &&
                            <QRCode
                            id='qrcode'
                            value={`http://Localhost:3000/post/${postData.url}`}
                            size={290}
                            level={'H'}
                            includeMargin={true}
                             />
                        }
                    

                    </div>
                    


                </div>
            </div>
        </div>
      
    </div>
  )
}

export default PostView
