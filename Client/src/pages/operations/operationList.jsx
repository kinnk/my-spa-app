import {React, useState, useEffect} from 'react'
import './operationList.css';
import {DataGrid} from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { DeleteOutline,AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

export default function OperationList() {
    const[operationList, setOperationList] = useState([]);
    
    function getOperationList(){
        axios.get('http://localhost/myReactApp2/operation/')
        .then(
            function(response){
            console.log(response.data);
            setOperationList(response.data);
        });
    }
    useEffect(()=>{
        getOperationList()
    }, [])
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
          field: 'type',
          headerName: 'Тип',
          width: 30,
          renderCell:(params)=>{
              if(params.row.type === 'Поступление'){
                return(
                        <AddCircle className='iconPlus'/>
                )}else return(<RemoveCircle className='iconMinus'/>)
            }
        },
        {
            field: 'contragent',
            headerName: 'Контрагент',
            width: 150,
          },
          {
            field: 'article',
            headerName: 'Статья',
            width: 200,
          },
          {
            field: 'sum',
            headerName: 'Сумма',
            width: 80,
          },
          {
            field: 'description',
            headerName: 'Описание',
            width: 250,
          },
        // {
        //     field: "action",
        //     headerName: "Действия",
        //     width: 150,
        //     renderCell: (params) => {
        //       return (
        //         <>
        //           <DeleteOutline
        //             className="salesListDelete"
        //             // onClick={() => delSales(params.row.id)}
        //           />
        //         </>
        //       );
        //     },
        //   },
       
      ];
  return (
    <div className='operationList'>
       <div className="head">
        <NavLink to="/operation/newOperation">
          <button className='AddButton'>Добавить</button>
        </NavLink>
      </div>
        <DataGrid
            rows={operationList}
            columns={columns}
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    </div>
  )
}
