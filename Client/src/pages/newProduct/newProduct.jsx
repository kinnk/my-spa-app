import {React, useState} from 'react'
import './newProduct.css'
import axios from 'axios';

export default function NewProduct() {
    
  const[data, setData] = useState([]);

  const handleChange =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    
    setData(values=>({...values,[name]:value}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost/myReactApp2/product/save',data)
    .then(function(response){
        console.log(response.data);
    }) .catch(err => { 
        if (err.response) { 
          // client received an error response (5xx, 4xx)
        } else if (err.request) { 
          // client never received a response, or request never left 
        } else { 
          // anything else 
        } 
      }) 
    }

  return (
    <div className='newProduct'>
          <h1 className="newProductTitle">Добавить новый товар</h1>
      <form className="newProducttrForm" onSubmit={handleSubmit}>
        <div className="newProductItem">
          <label>Название</label>
          <input type="text" name='name' onChange={handleChange}/>
        </div>
        <div className="newProductItem">
          <label>Количество</label>
          <input type="text" name='rest' onChange={handleChange}/>
        </div>
        <div className="newProductItem">
          <label>Цена</label>
          <input type="text"  name='price' onChange={handleChange}/>
        </div>
        <button className="newProductButton">Сохранить</button>
      </form>
    </div>
  )
}
