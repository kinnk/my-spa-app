import React from 'react';
import {
    LineStyle,
    Timeline,
    TrendingUp,
    Article,
    Summarize,
    Inventory
  } from "@mui/icons-material";
  import { NavLink } from "react-router-dom";
import s from './sidebar.module.css';

export default function Sidebar() {
  return (
<div className={s.sidebar}>
      <div className={s.Wrapper}>
        <div className={s.Menu}>
          <ul className={s.List}>
          <h3 className={s.Title}>Навигация</h3>
                 <NavLink to ="/" className={s.Link}> 
                    <li className={s.ListItem}>
                        <LineStyle className={s.Icon} />
                        Аналитика
                    </li>
                 </NavLink>
                <NavLink to ="/operationList" className={s.Link}>
                    <li className={s.ListItem}>
                        <Timeline className={s.Icon} />
                        Операции
                    </li>
                 </NavLink>
                <NavLink to ="/salesList" className={s.Link}> 
                    <li className={s.ListItem}>
                        <TrendingUp className={s.Icon} />
                        Продажи
                    </li>
                 </NavLink>
                 <h3 className={s.Title}>Отчеты</h3>
                
                <NavLink to ="/reportOpiu" className={s.Link}> 
                    <li className={s.ListItem}>
                        <Article className={s.Icon} />
                        ОПиУ
                    </li>
               </NavLink> 
         
                <h3 className={s.Title}>Справочники</h3>
                        
                   
                <NavLink to ="/contragentList" className={s.Link}> 
                    <li className={s.ListItem}>
                        <Summarize className={s.Icon} />
                        Контрагенты
                    </li>
                </NavLink>
                <NavLink to ="/productList" className={s.Link}> 
                    <li className={s.ListItem}>
                        <Inventory className={s.Icon} />
                        Товар
                    </li>
                </NavLink>
                
          </ul>
        </div>

       
      </div>
    </div>
  )
}
