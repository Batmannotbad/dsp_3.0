import React, { useEffect, useState } from 'react'
import SaaSCard from '../../Component/Admin/Card';
import { Box, Grid } from '@mui/material';
import DashboardChart from '../../Component/Admin/Chart';
import { faUsers,faBarsStaggered, faBars} from '@fortawesome/free-solid-svg-icons';
import SideBar from '../../Component/Admin/SideBar';
import Header from '../../Component/Admin/Header';
import './AdminHome.css'
import { getAllBoxes, getUserList } from '../../APIController';
import { useSelector } from 'react-redux';


const AdminHome = () => {
    const [totalPosts, setTotalPosts] = useState(0);
    const [weeklyPosts, setWeeklyPosts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const token = useSelector(state => state.user.token);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const boxesData = await getAllBoxes(token);
            const usersData = await getUserList(token);
    
            const totalPostsData = boxesData.length;
            const totalUsersData = usersData.length;
    
            setTotalPosts(totalPostsData);
            setTotalUsers(totalUsersData);
          const postsForTheWeekData = boxesData.filter((box) => {
            const currentDate = new Date();
            const postDate = new Date(box.dateCreated);
            const timeDifference = currentDate - postDate;
            const daysDifference = timeDifference / (1000 * 3600 * 24);
  
            return daysDifference <= 7;
          }).length;
  
          setWeeklyPosts(postsForTheWeekData);
        } catch (error) {
          console.error('Error fetching boxes data:', error);
        }
      };
  
      fetchData();
    }, []); 
    const cardList = [
        {
            price: totalPosts,
            Icon: faBarsStaggered,
            title: "Tổng bài viết",
            color: "#2499EF",
        },
        {
            price: totalUsers,
            title: "Tổng người dùng",
            Icon: faUsers,
            color: "purple",
        },
        {
            price: weeklyPosts,
            Icon: faBars,
            title: "Số lượng bài viết trong tuần",
            color: "red",
        },
    ];
  return (
    <div className='admin-home'>
        <SideBar/>
        <div style={{ padding: "100px 60px", backgroundColor: "rgba(0,0,0,0.05)" }}>
            <Header/>
            <Box pt={2} pb={4}>
                <Grid style={{ paddingBottom: "50px" }} container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {cardList.map((card, index) => (
                        <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                            <SaaSCard card={card} />
                        </Grid>
                    ))}
                </Grid>
                <div >
                    <DashboardChart />
                </div>
            </Box>
        </div>
</div>
  )
}

export default AdminHome
