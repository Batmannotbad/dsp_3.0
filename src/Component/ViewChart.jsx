import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllBoxs } from '../APIController';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';


const ViewChart = () => {
    const [chartData, setChartData] = useState([]);
    const token = useSelector(state => state.user.token);
    useEffect(() => {

        const fetchData = async () => {
          try {
            const data = await getAllBoxs(token);
            setChartData(data);
            console.log(chartData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
  return (
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
  )
}

export default ViewChart
