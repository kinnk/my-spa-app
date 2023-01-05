import React from 'react'
import './chart.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
  } from "recharts";

export default function chart({ title, data, dataKey }) {

  
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" height="100%" aspect={4 / 2}>
        <LineChart  
         data={data}
         margin={{
           top: 0,
           right: 10,
           left: 10,
           bottom: 0,
         }}
        >
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis stroke="#5550bd" />
          <Tooltip />
          <Legend/>
          <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" activeDot={{ r: 5 }}/>v
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
