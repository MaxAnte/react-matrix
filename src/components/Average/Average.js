import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import './average.css'


const MatrixAvg = ({matrix, columns}) => {
  const [avg, setAvg] = useState([]);
  useEffect(()=>{calcAvg(matrix, columns)},[matrix, columns])

  function calcAvg(matrix, columns) {
    let matrixAvg = {
      avg: new Array(columns).fill(0)
    };
    matrix.forEach((element, id) => {
      element.forEach((el, jID) => {
        matrixAvg.avg[jID] += el.amount;
      });
    });
    const averages = matrixAvg.avg.map(el => {
      return Math.round(el /= matrix.length);
    })
    setAvg(averages);
  }
  return (
    <div className='average_wrap' style={{gridTemplateColumns: `repeat(${avg.length}, 1fr)`}}>
      {(avg.length > 0 && matrix.length > 0 ) ? 
        avg.map((el, index)=>
          <div key={index} className='matrix__cell'>
            {el}
          </div>
        )
        : <span></span>
      }
    </div>
  )
}

const mapStateToProps = ({ matrix, columns}) => {
  return ({
    matrix,
    columns
  })
};

const Average = connect(mapStateToProps)(MatrixAvg);

export default Average;
