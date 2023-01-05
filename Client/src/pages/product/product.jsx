import {React, useState, useEffect} from 'react';
import './product.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';

export default function Product() {

    const[product, setProduct] = useState([]);

    const{id} = useParams();
    
    function getProduct(){
        axios.get(`http://localhost/myReactApp2/product/${id}/edit`)
            .then( 
                function(response){
                  console.log(response.data)
                  setProduct(response.data);
                });
    }

    useEffect(()=>{
        getProduct();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChange =(event) =>{
      const name = event.target.name;
      const value = event.target.value;
      
      setProduct(values=>({...values,[name]:value}));
  }
  const handleSubmitEdit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost/myReactApp2/product/${id}/edit`,product)
    .then(
        function(response){
            console.log(response.data);
            alert('Сохранено');
    }); 
}


  return (
    <div className='product'>
         <div className='head'>
          <h1 className='Title'>Редактировать информацию о товаре</h1>
      </div>
      <div className='container'>
      <div className='productShow'>
              <div className='headShow'>
                <div className='nameShowContainer'>
                  <span className='nameShow'>{product.name} </span> 
                </div>
              </div>
              
              <div className='detailShow'>
                  <span className='detailHeadShow'>Информация о товаре</span>
                  
                  <div className='InfoShow'>
                    <span className='detailShowTitle'>Количество {product.rest} кг.</span>
                  </div>

                  <div className='InfoShow'>
                    <span className='detailShowTitle'>Цена {product.price} тнг.</span>
                  </div>

                  <div className='InfoShow'>
                    <span className='detailShowTitle'>Описание:</span>

                  </div>
                  <div>
                        {product.description}
                    </div>
              </div> 
          </div>

        <div className='contragentEdit'>
            <span className='contragentEditTitle'>Редактировать</span>
            <form className='contragentEditForm'  onSubmit = {handleSubmitEdit}>
              <div className='contragentEditContainer'>
                <div className='contragentEditItem'>
                  <label>Название</label>
                  <input
                    type="text"
                    className='contragentEditInput'
                    name = 'name'
                    value={product.name || ''}
                    onChange = {handleChange}
                  />
                </div>
            
                <div className='contragentEditItem'>
                  <label>Количество</label>
                  <input
                    type="text"
                    className='contragentEditInput'
                    name = 'rest'
                    value={product.rest || ''}
                    onChange = {handleChange}
                  />
                </div>
                <div className='contragentEditItem'>
                  <label>Цена</label>
                  <input
                    type="text"
                    className='contragentEditInput'
                    name = 'price'
                    value={product.price || ''}
                    onChange = {handleChange}
                  />
                </div>

                <div className='contragentEditItem'>
                  <label>Описание</label>
                  <input
                    type="text"
                    className='contragentEditInput'
                    name = 'description'
                    value={product.description || ''}
                    onChange = {handleChange}
                  />
                </div>
                  <button className='EditButton'>Сохранить</button>
                
              </div>
            </form>
          </div>

      </div>

    </div>
  )
}
