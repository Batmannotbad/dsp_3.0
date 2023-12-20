import React from 'react'
import Header from '../../Component/Header'

function Error() {
  return (
    <div>
        <Header/>
        <div>
            <h1 className='m-4'>
                Bạn không có quyền truy cập trang này
            </h1>
        </div>
    </div>
  )
}

export default Error