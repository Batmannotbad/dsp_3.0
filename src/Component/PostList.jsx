import React from 'react'
import { useSelector } from 'react-redux';

const PostList = () => {
    const token = useSelector(state => state.user.token);

  return (
    <div>
      
    </div>
  )
}

export default PostList
