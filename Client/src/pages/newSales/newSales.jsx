import {React, useState} from 'react';
import './newSales.css';
import axios from 'axios';

export default function NewSales() {
    const[data, setData] = useState([]);

    
    const handleChange =(event) =>{
      const name = event.target.name;
      const value = event.target.value;
      
      setData(values=>({...values,[name]:value}));
    }
    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios.post('http://localhost/myReactApp2/sales/save',data)
      .then(function(response){
          console.log(response.data);
          alert('Сохранено');
      })  

      axios.post(`http://localhost/myReactApp2/salesOp/save`,data)
      .then(
          function(response){
              console.log(response.data);
              
      }); 
    }
    // const saleOp = data.map((item)=>console.log(item))
    const[contragents, setContragents] = useState([]);
    function getContragents(){
    axios.get('http://localhost/myReactApp2/contragent/')
    .then(
        function(response){
            console.log(response.data);
            setContragents(response.data);
    });
    }
    let contragentsOptions = contragents.map((item, key)=> {
        return (
        <option key={key} value = {item.id}>{item.name}</option>
    )});

    const[products, setProducts] = useState([]);
    function getProducts(){
      axios.get('http://localhost/myReactApp2/product/')
      .then(
          function(response){
            console.log(response.data);
            setProducts(response.data);
      });
  }
  let productsOptions = products.map((item, key)=> {
      return (
      <option key={key} value = {item.id}>{item.name +' - ' + item.price +' тнг.'+ ' в наличии ('+ item.rest +')' }</option>
  )});
  
  return (
    <div className='newSales'>
            <h1 className="newSalesTitle">Продажа</h1>
      <form className="newSalestForm" onSubmit={handleSubmit} >
        <div className="newSalesItem">
          <label>Дата</label>
          <input type="date" name='date' onChange={handleChange} required={true}/>
        </div>
        <div className="newSalesItem">
          <label>Контрагент</label>
          <select name='contragent_id' onChange={handleChange} onClick={()=>(getContragents())} required={true}>
                {contragentsOptions}
            </select>
        </div>
        <div className="newSalesItem">
          <label>Товар</label>
          <select name='product_id' id='prod_id' 
            onChange={handleChange} 
            onClick ={()=>(getProducts())} required={true}>
                {productsOptions}
          </select>
        </div>
        <div className="newSalesItem">
          <label>Количество</label>
          <input type="text" name='count' onChange={handleChange} required={true}/>
        </div>
        <div className="newSalesItem">
          <label>Сумма</label>
          <input type="text" name='sum' required={true}
          onChange={handleChange} />
        </div>
        <button className="newSalesButton" onClick={console.log(data)}>Сохранить</button>
      </form>
    </div>
  )
}
