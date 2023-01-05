import {React, useState} from 'react'
import './newContragent.css'
import axios from 'axios';
export default function NewContragent() {
    const[data, setData] = useState([]);

    const handleChange =(event) =>{
        const name = event.target.name;
        const value = event.target.value;
        
        setData(values=>({...values,[name]:value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/myReactApp/contragent/save',data)
        .then(function(response){
            console.log(response.data);
        }); 
    }




  return (
    <div className='newContragent'>
         <h1 className="newContragentTitle">Новый контрагент</h1>
      <form className="newContragentrForm" onSubmit={handleSubmit}>
        <div className="newContragentItem">
          <label>Название</label>
          <input type="text" placeholder="john" name='name' onChange={handleChange}/>
        </div>
        <div className="newContragentItem">
          <label>Электронная почта</label>
          <input type="email" placeholder="john@gmail.com" name='email' onChange={handleChange}/>
        </div>
        <div className="newContragentItem">
          <label>Номер телефона</label>
          <input type="tel" placeholder="+1 123 456 78" name='phone_number' onChange={handleChange}/>
        </div>
        <button className="newContragentButton">Создать</button>
      </form>
    </div>
  )
}
