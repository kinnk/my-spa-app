import React from 'react'
import s from "./topbar.module.css";
import { NotificationsNone,  Settings } from '@mui/icons-material';


export default function Topbar() {
  return (
    <div className={s.topbar}>
    <div className={s.Wrapper}>
      <div className={s.Left}>
        <span className={s.logo}>Учет и Управление</span>
      </div>
      <div className={s.Right}>
        <div className={s.IconContainer}>
          <NotificationsNone />
          <span className={s.IconBadge}>2</span>
        </div>
        <div className={s.IconContainer}>
          <Settings />
        </div>
        <img src="https://images.pexels.com/photos/9918879/pexels-photo-9918879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
            alt="" className={s.Avatar} />
      </div>
    </div>
  </div>
  )
}
