import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllBoxs } from '../../APIController';
import { DataGrid } from '@mui/x-data-grid';
import SideBar from '../../Component/Admin/SideBar';
import Header from '../../Component/Admin/Header';

function AdminPost() {
    const token = useSelector(state => state.user.token);
    const [postList,setPostList] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
          try {
            const data = await getAllBoxs(token);
            setPostList(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };  
    
        fetchData();
      }, []);
      const postColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'content', headerName: 'Content', width: 200 },
        { field: 'userId', headerName: 'User ID', width: 130 },
        {
          field: 'dateCreated',
          headerName: 'Date Created',
          width: 200,
          type: 'dateTime',
          valueGetter: (params) => new Date(params.row.dateCreated),
        },
        { field: 'view', headerName: 'View', width: 130 },
        {
          field: 'img',
          headerName: 'Image',
          width: 200,
          renderCell: (params) => (
            <img
              src={`http://localhost:5296/${params.value}`}
              alt="Image"
              style={{ width: 50, height: 50 }}
            />
          ),
        },
        {
          field: 'adminBan',
          headerName: 'Admin Ban',
          width: 130,
          renderCell: (params) => (
            <div style={{ color: params.value ? 'red' : 'green' }}>
              {params.value ? 'Khóa' : 'Hoạt động'}
            </div>
          ),
        },
        {
          field: 'sharedStatus',
          headerName: 'Shared Status',
          width: 150,
          renderCell: (params) => (
            <div style={{ color: params.value ? 'green' : 'red' }}>
              {params.value ? 'Chia sẻ' : 'Không chia sẻ'}
            </div>
          ),
        },
      ];
  return (
    <div className='admin-home'>
    <SideBar/>
    <div style={{ padding: "100px 60px", backgroundColor: "rgba(0,0,0,0.05)" }}>
    <Header/>
    <div  >
      <div style={{height:400, backgroundColor: "white"}}>
        <DataGrid 
        rows={postList} 
        columns={postColumns} 
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
</div>
  )
}

export default AdminPost