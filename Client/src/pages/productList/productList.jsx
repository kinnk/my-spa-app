import {React, useState, useEffect} from 'react';
import './productList.css';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import axios from 'axios';

export default function ProductList() {

  const [products, setProducts] = useState([]);

  function getProducts(){
      axios.get(`http://localhost/myReactApp2/product/`)
          .then( 
              function(response){
                console.log(response.data)
                  setProducts(response.data);
              });
  }
    useEffect(()=>{
        getProducts();
    }, []);

  const delProduct = (id) =>{
      axios.delete(`http://localhost/myReactApp2/product/${id}/delete`)
      .then(
          function(response){
              getProducts();
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
          width: 300,
      },
      {
        field: 'rest',
        headerName: 'Остаток',
        width: 100,
      },
      {
          field: 'price',
          headerName: 'Цена',
          width: 100,
        },
      {
          field: "action",
          headerName: "Действия",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <NavLink to={"/product/" + params.row.id +"/edit"}>
                  <button className="productListEdit">Изменить</button>
                </NavLink>
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => delProduct(params.row.id)}
                />
              </>
            );
          },
        },
     
    ];
  return (
    <div className='productList'>
           <div className="head">
        <NavLink to="/product/newProduct">
          <button className='AddButton'>Добавить</button>
        </NavLink>
      </div>
        <DataGrid
            rows={products}
            columns={columns}
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    </div>
  )
}
