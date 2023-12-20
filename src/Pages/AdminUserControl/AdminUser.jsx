import React, { useEffect, useState } from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Header from '../../Component/Admin/Header'
import { useSelector } from 'react-redux';
import { getUserList } from '../../APIController';
import { DataGrid } from '@mui/x-data-grid';

function AdminUser() {
    const token = useSelector(state => state.user.token);
    const [userList,setUserList] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
          try {
            const userlist = await getUserList(token);
            setUserList(userlist);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };  
    
        fetchData();
      }, []);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
          field: 'img',
          headerName: 'Ảnh đại diện',
          width: 130,
          renderCell: (params) => (
            <img
              src={`http://localhost:5296/${params.value}`}
              alt="Avatar"
              style={{ width: 50, height: 50, borderRadius: '50%' }}
            />
          ),
        },
        { field: 'username', headerName: 'Username', width: 150 },
        {
          field: 'banEnabled',
          headerName: 'Trạng thái khóa',
          width: 130,
          renderCell: (params) => (
            <div style={{ color: params.value ? 'red' : 'green' }}>
              {params.value ? 'Khóa' : 'Hoạt động'}
            </div>
          ),
        },
        { field: 'description', headerName: 'Mô tả', width: 170 },
        { field: 'jobTitle', headerName: 'Chức vụ', width: 130 },
        { field: 'name', headerName: 'Họ tên', width: 180 },
        { field: 'email', headerName: 'Email', width: 180 },
      ];
  return (
    <div className='admin-home'>
        <SideBar/>
        <div style={{ padding: "100px 60px", backgroundColor: "rgba(0,0,0,0.05)" }}>
        <Header/>
        <div className='mb-4' style={{backgroundColor: "rgba(0,0,0,0)"}}>
            <DataGrid
                rows={userList}
                getRowId = {(userList) => userList?.id}
                // disableSelectionOnClick
                columns={columns} pageSize={10}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                />
        </div>
        </div>
    </div>
  )
}

export default AdminUser