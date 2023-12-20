import { Box, Card, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAllBoxes } from "../../APIController";
import { useSelector } from "react-redux";
import { groupBy } from 'lodash'; 

// const data = {
//   series: [
//     {
//       name: "Spent",
//       data: [22, 80, 36, 50, 60, 30, 90, 26, 75, 10, 55, 65],
//     },
//   ],
//   categories: [
//     "Th1",
//     "Th2",
//     "Th3",
//     "Th4",
//     "Th5",
//     "Th6",
//     "Th7",
//     "Th8",
//     "Th9",
//     "Th10",
//     "Th11",
//     "Th12",
//   ],
// };

const DashboardChart = () => {
  const theme = useTheme();
  const token = useSelector(state => state.user.token);

  const [chartData, setChartData] = useState({ series: [], categories: [] });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const boxesData = await getAllBoxes(token);

        // Group posts by month
        const postsByMonth = groupBy(boxesData, (box) => {
          const date = new Date(box.dateCreated);
          return `${date.getFullYear()}-${date.getMonth() + 1}`;
        });

        // Generate an array of the last 12 months
        const last12Months = Array.from({ length: 12 }, (_, index) => {
          const date = new Date();
          date.setMonth(date.getMonth() - index);
          return `${date.getFullYear()}-${date.getMonth() + 1}`;
        }).reverse();

        // Fill in counts for each month, defaulting to zero if no data
        const seriesData = last12Months.map(month => postsByMonth[month]?.length || 0);

        // Update the state with the chart data
        setChartData({
          series: [{ name: "Posts", data: seriesData }],
          categories: last12Months,
        });
      } catch (error) {
        console.error('Error fetching boxes data:', error);
        // Handle errors
      }
    };

    // Call the function
    fetchData();
  }, []); // Ensure the effect runs only once




  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    colors: [theme.palette.primary.main],
    dataLabels: { enabled: false },
    grid: {
      show: false,
    },
    states: {
      active: {
        filter: { type: "none" },
      },
      hover: {
        filter: { type: "none" },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: chartData.categories,
        labels: {
          style: {
            colors: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
          },
        },
      },
    yaxis: { show: false },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "60%",
        rangeBarOverlap: false,
      },
    },
    tooltip: {
        x: { show: false },
        y: {
          formatter: function (val) {
            return `${val} Bài viết`;
          },
        },
      },
    
    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            labels: { show: false },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
            },
          },
        },
      },
    ],
  };

  const chartSeries = chartData.series;

  return (
    <Card
      sx={{
        paddingX: 4,
        height: "100%",
        paddingBottom: "1.5rem",
        paddingTop: "calc(1.5rem + 15px)",
        [theme.breakpoints.down(425)]: { padding: "1.5rem" },
      }}
    >
      <h2 className="chart-title">Tổng bài viết</h2>
      <h3 className="chart-total-number">{chartData.series.length > 0 ? chartData.series[0].data.reduce((sum, count) => sum + count, 0) : 0}</h3>


      <Box
        sx={{
          "& .apexcharts-tooltip *": {
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
          },
          "& .apexcharts-tooltip": {
            boxShadow: 0,
            borderRadius: 4,
            alignItems: "center",
            "& .apexcharts-tooltip-text-y-value": { color: "primary.main" },
            "& .apexcharts-tooltip.apexcharts-theme-light": {
              border: `1px solid ${theme.palette.divider}`,
            },
            "& .apexcharts-tooltip-series-group:last-child": {
              paddingBottom: 0,
            },
          },
        }}
      >
        <Chart
          height={245}
          options={chartOptions}
          series={chartSeries}
          type="bar"
        />
      </Box>
    </Card>
  );
};

export default DashboardChart;
