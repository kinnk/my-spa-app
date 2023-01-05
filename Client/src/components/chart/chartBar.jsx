import {React, useState, useEffect} from 'react'
import './chart.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
  } from "recharts";
  import axios from 'axios';
 
export default function ChartBar() {

  const[dataBar, setDataBar] = useState([]);
function getDataBar(){
  axios.get(`http://localhost/myReactApp2/salesChartBar/`)
      .then( 
          function(response){
            console.log(response.data)
              setDataBar(response.data);
          });
}
useEffect(()=>{
  getDataBar();
}, []);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="chart">
      <h3 className="chartTitle">Количество продаж по товарам</h3>
      <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
      <BarChart
      data={dataBar}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="product" />
      <Tooltip />
    
      <Bar dataKey="count" fill="#5550bd" barSize={50}/>
    </BarChart>
    </ResponsiveContainer>
    </div>
  )
}
