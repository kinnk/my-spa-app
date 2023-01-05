import {React, useState, useEffect} from 'react';
import s from './contragent.module.css';
import {NavLink, useParams} from 'react-router-dom';
import {MailOutline, PhoneAndroid} from "@mui/icons-material";
import axios from 'axios';

export default function Contragent() {
const[contragent, setContragent] = useState([]);

const{id} = useParams();

    function getContragent(){
        axios.get(`http://localhost/myReactApp2/contragent/${id}/edit`)
            .then( 
                function(response){
                  console.log(response.data)
                    setContragent(response.data);
                });
    }

    useEffect(()=>{
        getContragent();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChange =(event) =>{
      const name = event.target.name;
      const value = event.target.value;
      
      setContragent(values=>({...values,[name]:value}));
  }
  const handleSubmitEdit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost/myReactApp2/contragent/${id}/edit`,contragent)
    .then(function(response){
        console.log(response.data);
    }); 
}

  return (
    <div className={s.contragent}>
        <div className={s.head}>
          <h1 className={s.Title}>Редактировать контрагента</h1>
          <NavLink to="/contragent/newContragent">
            <button className={s.AddButton}>Добавить</button>
          </NavLink>
      </div>
      <div className={s.container}>
          <div className={s.contragentShow}>
              <div className={s.headShow}>
                <div className={s.nameShowContainer}>
                  <span className={s.nameShow}>{contragent.name} </span> 
                </div>
              </div>
              
              <div className={s.detailShow}>
                  <span className={s.detailHeadShow}>Данные контрагента</span>
                  
                  <div className={s.InfoShow}>
                    <MailOutline className={s.detailShowIcon} />
                    <span className={s.detailShowTitle}>{contragent.email}</span>
                  </div>

                  <div className={s.InfoShow}>
                    <PhoneAndroid className={s.detailShowIcon} />
                    <span className={s.detailShowTitle}>{contragent.mobile}</span>
                  </div>
              </div> 
          </div>

        <div className={s.contragentEdit}>
            <span className={s.contragentEditTitle}>Редактировать</span>
            <form className={s.contragentEditForm}  onSubmit = {handleSubmitEdit}>
              <div className={s.contragentEditContainer}>
                <div className={s.contragentEditItem}>
                  <label>Название</label>
                  <input
                    type="text"
                    className={s.contragentEditInput}
                    name = 'name'
                    value={contragent.name || ''}
                    onChange = {handleChange}
                  />
                </div>
            
                <div className={s.contragentEditItem}>
                  <label>Электронная почта</label>
                  <input
                    type="text"
                    className={s.contragentEditInput}
                    name = 'email'
                    value={contragent.email || ''}
                    onChange = {handleChange}
                  />
                </div>
                <div className={s.contragentEditItem}>
                  <label>Номер телефона</label>
                  <input
                    type="tel"
                    className={s.contragentEditInput}
                    name = 'mobile'
                    value={contragent.mobile || ''}
                    onChange = {handleChange}
                  />
                </div>
             
                  <button className={s.EditButton}>Сохранить</button>
                
              </div>
            </form>
          </div>

      </div>
    </div>
  )
}
