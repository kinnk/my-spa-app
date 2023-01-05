import {React,useState, useEffect} from 'react';
import axios from 'axios';
import './reportOpiu.css';
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';

const columns = [
  {field: 'month', headerName: 'Месяц', width: 70,},
  {field: 'vs', headerName: 'Выручка с продаж', width: 70,},
  {field: 'ss', headerName: 'Себестоимость',width: 70,},
  {field: 'sz', headerName: 'Стоимость закупки', width: 70,},
  {field: 'zp', headerName: 'Зарплата', width: 70,},
  {field: 'ap', headerName: 'Арендная плата', width: 70,},
  {field: 'tr', headerName: "Транспортные расходы", width: 70,},
  {field: 'sii',headerName: "Связь и интернет", width: 70,},
  {field: 'cu', headerName: "Ком/услуги", width: 70,},
  {field: "vp", headerName: "Валовая прибыль", width: 70,
  cellClassName: (params) => {
    if (params.value == null) {
      return '';
    }

    return clsx('super-app', {
      negative: params.value > 0,
      positive: params.value < 0,
    });
  },},
  {field: "or", headerName: "Операционные расходы", width: 70,},
  {field: "kr", headerName: "Корпоративные расходы", width: 70,},
  {field: "hr", headerName: "Хоз/услуги", width: 70,},
  {field: "rem", headerName: "Ремонт", width: 70,},
  {field: "rek", headerName: "Реклама", width: 70,},
  {field: "op", headerName: "Операционная прибыль", width: 70,
  cellClassName: (params) => {
    if (params.value == null) {
      return '';
    }

    return clsx('super-app', {
      negative: params.value > 0,
      positive: params.value < 0,
    });
  },},
];
export default function ReportOpiu() {
    const [dataOpiu, setDataOpiu] = useState([]);
    function getReportOpiu(){
        axios.get(`http://localhost/myReactApp2/reportOpiu/`)
            .then( 
                function(response){
                  console.log(response.data)
                    setDataOpiu(response.data);
                });
    }
   
    useEffect(()=>{
        getReportOpiu();
    }, []);
 
  
  return (
    <div className='reportOpiu'>
       <h1 className='Title'>Отчет о прибылях и убытках</h1>
      <div style={{ height: 800, width: '100%' }}
      >
      <DataGrid 
         components={{
          Toolbar: GridToolbar,
        }}
        getRowId = {(row)=>row.month}
        rows={dataOpiu}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        disableColumnMenu
        sx={{
          
          '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
      />
    </div>
    </div>
  )
}
