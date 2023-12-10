import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { getAllBoxs, getUserList } from './APIController';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
function Test() {
  const [chartData, setChartData] = useState([]);
  const token = useSelector(state => state.user.token);
  
  const [userList,setUserList] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getAllBoxs(token);
        setChartData(data);
        console.log(chartData);

        const userlist = await getUserList(token);
        setUserList(userlist);
        console.log(userList);
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
      headerName: 'Ban Enabled',
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
    <div>
    <div>
      <h2>Biểu đồ số lượt xem</h2>
      <h2>{chartData.length} Bài viết</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" hide={true} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="view" stackId="a" fill="#8884d8" />
      </BarChart>
    </div>
    <div className='mb-4'>
      <h2>UserList</h2>
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
    <div  >
      <h2 >PostList</h2>
      <div style={{height:400}}>
        <DataGrid 
        rows={chartData} 
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
  )
}

export default Test