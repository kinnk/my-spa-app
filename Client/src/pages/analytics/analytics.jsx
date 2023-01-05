import {React, useState, useEffect} from 'react';
import s from './analytics.module.css';
import AnalyticsFeatInf from '../../components/analyticsFeatInfo/analyticsFeatInf';
import Chart from '../../components/chart/chart';
import ChartBar from '../../components/chart/chartBar';
import axios from 'axios';


export default function Analytics() {
const[data, setData] = useState([]);
function getData(){
  axios.get(`http://localhost/myReactApp2/salesChart/`)
      .then( 
          function(response){
            console.log(response.data)
              setData(response.data);
          });
}
useEffect(()=>{
    getData();
}, []);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className={s.analytics}>
      <AnalyticsFeatInf/>
      <Chart data={data} title="Продажи" grid dataKey="sum"/>
      <ChartBar/>
    </div>
  ) 
}
