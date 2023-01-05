import {React, useState} from 'react';
import './newOperation.css';
import axios from 'axios';

export default function NewOperation() {
  const[data, setData] = useState([]);
  const[opu, setOpu] = useState([]);

  const handleChange =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    
    setData(values=>({...values,[name]:value}));
    setOpu(values=>({...values,[name]:value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost/myReactApp2/operation/save',data)
    .then(function(response){
        console.log(response.data);
    })  
    axios.put(`http://localhost/myReactApp2/operation/edit`,opu)
    .then(
        function(response){
            console.log(response.data);
            alert('Сохранено');
    }); 
  }

  //--------------------------------------------------------------Rev
const [dataRev, setDataRev] = useState([]);
function getRev(){
    axios.get(`http://localhost/myReactApp2/articleRev/`)
        .then( 
            function(response){
                console.log(response.data)
                setDataRev(response.data);
            });
}
let RevOptions = dataRev.map((item, key)=> {
  return (
  <option key={key} value = {item.id}>{item.name}</option>
)});
//----------------------------------------------------------------cost
const [dataCost, setDataCost] = useState([]);
function getCost(){
    axios.get(`http://localhost/myReactApp2/articleCost/`)
        .then( 
            function(response){
                console.log(response.data)
                setDataCost(response.data);
            });
}
let CostOptions = dataCost.map((item, key)=> {
  return (
  <option key={key} value = {item.id}>{item.name}</option>
)});
//-----------------------------------------------------------------OpCost
const [dataOpCost, setDataOpCost] = useState([]);
function getOpCost(){
    axios.get(`http://localhost/myReactApp2/articleOpCost/`)
        .then( 
            function(response){
                console.log(response.data)
                setDataOpCost(response.data);
            });
}
let CostOpOptions = dataOpCost.map((item, key)=> {
  return (
  <option key={key} value = {item.id}>{item.name}</option>
)});
//-------------------------------------------------------------------Fin
const [dataFin, setDataFin] = useState([]);
function getFin(){
    axios.get(`http://localhost/myReactApp2/articleFin/`)
        .then( 
            function(response){
                console.log(response.data)
                setDataFin(response.data);
            });
}
let FinOptions = dataFin.map((item, key)=> {
  return (
  <option key={key} value = {item.id}>{item.name}</option>
)});
// -----------------------------------------------------------
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
// --------------------------------------------------------------

 function startOption(){
  getRev();
  getCost();
  getOpCost();
  getFin();
 }
  return (
    <div className='newOperation'>
              <h1 className="newOperationTitle">Добавить операцию</h1>
      <form className="newOperatiobtForm" onSubmit={handleSubmit} >
        <div className="newOperationItem">
          <label>Дата</label>
          <input type="date" name='date' onChange={handleChange} required={true}/>
        </div>

        <div className="newOperationItem">
          <label>Тип</label>
          <select name='type' onChange={handleChange} required={true}>
                <option value="Поступление">Поступление</option>
                <option value="Выплата">Выплата</option>
            </select>
        </div>

        <div className="newOperationItem">
          <label>Контрагент</label>
          <select name='contragent_id' onChange={handleChange} onClick={()=>(getContragents())} required={true}>
                {contragentsOptions}
            </select>
        </div>
       
        <div className="newOperationItem">
          <label>Статья</label>
          <select name='article_id' onChange={handleChange} required={true} 
          onClick={startOption}
           >
                <optgroup label='Выручка'>{RevOptions}</optgroup>
                <optgroup label='Себестоимость'>{CostOptions}</optgroup>
                <optgroup label='Операционные расходы'>{CostOpOptions}</optgroup>
                <optgroup label='Прочие доходы и расходы'>{FinOptions}</optgroup>



            </select>
        </div>

        <div className="newOperationItem">
          <label>Сумма</label>
          <input type="text" name='sum' required={true}
          onChange={handleChange} />
        </div>

        <div className="newOperationItem">
          <label>Описание</label>
          <input type="textarea" name='description' 
          onChange={handleChange} />
        </div>

        <button className="newOperationButton" onClick={console.log(data)}>Сохранить</button>
      </form>
    </div>
  )
}
