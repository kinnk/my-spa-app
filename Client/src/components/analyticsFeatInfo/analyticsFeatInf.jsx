import {React, useState, useEffect} from 'react'
import './analyticsFeatInf.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import axios from 'axios';

export default function AnalyticsFeatInf() {
    const[revenue, setRevenue] = useState([]);
    function getData(){
      axios.get(`http://localhost/myReactApp2/revenueInf/`)
          .then( 
              function(response){
                console.log(response.data)
                  setRevenue(response.data);
              });
    }
    useEffect(()=>{
        getData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    const last = revenue.map((item)=>{
        return( item.last + ' тг.' 
            )})
    const prevd = revenue.map((item, key)=>{
        console.log('prev '+ item.prev+ ' ---' + ' last ' + item.last)
        const temp = item.last - item.prev;
        if(temp < 0){
            return(
                <span className='MoneyRate' key={key}>
                    {temp} <ArrowDownward  className='Icon negative'/>
                </span>
            ) 
        }else{
            return(
                <span className='MoneyRate' key={key}>
                    {'+' + temp} <ArrowUpward  className='Icon'/>
                </span>
            )
    }})
     
  return (
    <div className='analyticsFeatInf'>
        <div className='Item'>
            <span className='Title'>Прибыль</span>
            <div className='MoneyContainer'>
                <span className='Money'>415</span>
                <span className='MoneyRate'>
                    -11.4 <ArrowDownward  className='Icon negative'/>
                </span>
            </div>
                <span className="Sub">По сравнению с прошлым месяцем</span>
        </div>

        <div className='Item'>
            <span className='Title'>Продажи</span>
            <div className='MoneyContainer'>
                <span className='Money'>{last}</span>
                <span className='MoneyRate'>
                    {prevd} 
                </span>
            </div>
                <span className="Sub">По сравнению с прошлым месяцем</span>
        </div>
    
        <div className='Item'>
            <span className='Title'>Расходы</span>
            <div className='MoneyContainer'>
                <span className='Money'>4415</span>
                <span className='MoneyRate'>
                    +2.4 <ArrowUpward  className='Icon'/>
                </span>
            </div>
                <span className="Sub">По сравнению с прошлым месяцем</span>
        </div>
    </div>
  )
}
