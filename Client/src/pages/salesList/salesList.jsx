import {React, useState, useEffect} from 'react';
import './salesList.css';
import {DataGrid} from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import axios from 'axios';

export default function SalesList() {
    const[salesList, setSalesList] = useState([]);
    
    function getSalesList(){
        axios.get('http://localhost/myReactApp2/sales/')
        .then(
            function(response){
            console.log(response.data);
            setSalesList(response.data);
        });
    }
    useEffect(()=>{
        getSalesList()
    }, [])

    const delSales = (id) =>{
        axios.delete(`http://localhost/myReactApp2/sales/${id}/delete`)
        .then(
            function(response){
                getSalesList();
        });
    }
    const columns = [
        { 
          field: 'id', 
          headerName: 'ID', 
          width: 30,
        },
        { 
            field: 'date', 
            headerName: 'Дата', 
            width: 100,
        },
        {
          field: 'contragent',
          headerName: 'Контрагент',
          type:'string',
          width: 150,
        },
        {
            field: 'product',
            headerName: 'Товар',
            width: 350,
          },
          {
            field: 'count',
            headerName: 'Количество',
            width: 90,
          },
          {
            field: 'sum',
            headerName: 'Сумма',
            width: 80,
          },

       
      ];

  return (
    <div className='salesList'>
        <div className="head">
        <NavLink to="/sales/newSales">
          <button className='AddButton'>Добавить</button>
        </NavLink>
      </div>
        <DataGrid
            rows={salesList}
            columns={columns}
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    </div>
  )
}
