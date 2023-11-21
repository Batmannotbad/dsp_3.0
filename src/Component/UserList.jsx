import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserList } from '../APIController';
import { DataGrid } from '@mui/x-data-grid';

const UserList = () => {
    const token = useSelector(state => state.user.token);
  const [userList,setUserList] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
        try{
            const userData = await getUserList(token);
            setUserList(userData);
        } catch (error) {
            console.error('Error fetching data: ',error);
        }
    };
    fetchData();
  },[]);
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
        headerName: 'Trạng thái',
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
  ];
  
  return (
    <div>
      <DataGrid
        rows={userList}
        getRowId = {(userList) => userList?.id}
        disableSelectionOnClick
        columns={columns} pageSize={10}
         />
    </div>
  )
}

export default UserList
