import {React, useState, useEffect} from 'react'
import './contragentList.css'
import {DataGrid} from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import axios from 'axios';

export default function ContragentList() {
    
    const [contragents, setContragents] = useState([]);
    function getContragents(){
        axios.get(`http://localhost/myReactApp2/contragent/`)
            .then( 
                function(response){
                  console.log(response.data)
                    setContragents(response.data);
                });
    }
    useEffect(()=>{
        getContragents();
    }, []);

    const delContragent = (id) =>{
        axios.delete(`http://localhost/myReactApp2/contragent/${id}/delete`)
        .then(
            function(response){
                getContragents();
        });
    }

    const columns = [
        { 
          field: 'id', 
          headerName: 'ID', 
          width: 50,
        },
        { 
            field: 'name', 
            headerName: 'Название', 
            width: 200,
        },
        {
          field: 'email',
          headerName: 'Электронная почта',
          type:'string',
          width: 200,
        },
        {
            field: 'phone_number',
            headerName: 'Телефон',
            type: 'string',
            width: 200,
          },
        {
            field: "action",
            headerName: "Действия",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <NavLink to={"/contragent/" + params.row.id +"/edit"}>
                    <button className="contragentListEdit">Изменить</button>
                  </NavLink>
                  <DeleteOutline
                    className="contragentListDelete"
                    onClick={() => delContragent(params.row.id)}
                  />
                </>
              );
            },
          },
       
      ];
      
     
  return (
    <div className="contragentList">
      <div className="head">
        <NavLink to="/contragent/newContragent">
          <button className='AddButton'>Добавить</button>
        </NavLink>
      </div>
        <DataGrid
            rows={contragents}
            columns={columns}
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
       
    </div>
    
  )
}
