import React, { useEffect, useState } from 'react'

import { connect } from "react-redux";
import { updateMatrixCell, updateMatrix } from "../../redux/actions/index";
import Cell from '../Cell/Cell';

import './matrix.css'


const Matrix = ({matrix, columns, x, updateMatrixCell, updateMatrix}) => {
  const [sum, setSum] = useState([]);
  useEffect(()=>{calcSum(matrix)},[matrix])

  // ----- Calculate sum -----
  function calcSum(matrix) {
    let matrixInitial = {
      sum: []
    };
    matrix.forEach((element, id) => {
      matrixInitial.sum[id] = [];
      let sum = 0;
      element.forEach((el, jID) => {
        sum += matrix[id][jID].amount;
        matrixInitial.sum[id] = sum;
      });
    });
    setSum(matrixInitial.sum);
  }
  
  // ----- Increment cell -----
  function updateMat(id, value) {
    updateMatrixCell(id, ++value);
  }

  // ----- Find closest cells -----
  function closest(num) {
    const closestValues = [];
    const closestValuesID = [];
    const newMatrix = [...matrix]
    
    while (x > 0) {
      let closestRight = 1000;
      let closestLeft = -1000;
      let closestLast = 0;
      let closestRightID = '';
      let closestLeftID = '';
      let closestLastID = '';
      newMatrix.forEach(row => {
        row.forEach(cell => {
          if (!closestValues.includes(cell.amount)) {
            if (cell.amount > num && cell.amount < closestRight) {
              closestRight = cell.amount;
              closestRightID = cell.id;
            }
            if (cell.amount < num && cell.amount > closestLeft) {
              closestLeft = cell.amount;
              closestLeftID = cell.id;
            }
            if (x === 1 && closestRight !== 1000 && closestLeft !== -1000) {
              if (closestRight < closestLeft) {
                closestLast = closestRight;
                closestLastID = closestRightID;
              } else {
                closestLast = closestLeft;
                closestLastID = closestLeftID;
              }
            }
          }
        })
      })
      
      if (x === 1 && closestRight !== 1000 && closestLeft !== -1000) {
        closestValues.push(closestLast);
        closestValuesID.push(closestLastID);
        x--;
      } else {
        if (closestLeft === -1000) {
          closestValues.push(closestRight);
          closestValuesID.push(closestRightID);
          x--;
        } else if (closestRight === 1000) {
          closestValues.push(closestLeft);
          closestValuesID.push(closestLeftID);
          x--;
        } else {
          closestValues.push(closestLeft, closestRight);
          closestValuesID.push(closestLeftID, closestRightID);
          x -= 2;
        }
      }
    }

    // console.log(closestValues);
    // console.log(closestValuesID);

    for(const i in closestValues){
      const [row, cell] = closestValuesID[i].split('_');
      newMatrix[row][cell].isClose = true;
    }

    return newMatrix;
  }

  // ----- Basic cell events -----
  function handleHover(value) {
    const newMatrix = closest(value);
    // console.log(newMatrix);
    updateMatrix(newMatrix);
  }
  
  function mouseOutClean(){
    const newMatrix = [...matrix];
    newMatrix.forEach(row => {
      row.forEach(cell=>cell.isClose = false)
    });
    updateMatrix(newMatrix);
  }

  // ----- Sum column events -----
  function sumPercent(id, value) {
    const newMatrixRow = matrix[id].map((el)=>{
      el.ratio = Math.round(((el.amount * 100) / value) * 10) / 10;
      return el;
    })
    const newMatrix = [...matrix];
    newMatrix[id] = newMatrixRow;
    updateMatrix(newMatrix);
  }

  function mouseOutPercent(id) {
    const newMatrixRow = matrix[id].map((el)=>{
      el.ratio = false;
      return el;
    })
    const newMatrix = [...matrix];
    newMatrix[id] = newMatrixRow;
    updateMatrix(newMatrix);
  }

  // ----- Rows events -----
  function addRow(){
    const rows = matrix.length;
    let newMatrix = [...matrix];
    newMatrix.push([]);
    for (let index = 0; index < columns; index++) {
      newMatrix[rows].push(
        {
          id: `${rows}_${index}`,
          amount: Math.round(Math.random() * (999 - 100) + 100),
        }
      )      
    }
    updateMatrix(newMatrix);
  }

  function removeRow(id) {
    const newMatrix = [...matrix];
    newMatrix.splice(id,1);
    newMatrix.forEach((row, rID)=>{
      row.forEach((cell, cID)=>{
        cell.id = `${rID}_${cID}`
      })
    })
    updateMatrix(newMatrix);
  }

  return (
    <div className='matrix__wrap'>
      {(matrix.length > 0) ? 
        matrix.map((el, index)=>
          <>
            <div key={index} className='matrix__row' style={{ gridTemplateColumns: `repeat(${el.length + 2}, 1fr)`}}>
              {el.map(cell=> {
                return (
                  <div key={cell.id} className='matrix__cell'>
                    <Cell {...cell} updateMat={updateMat} handleHover={handleHover} mouseOutClean={mouseOutClean}/>
                  </div>
                )  
              })}
              <div className='matrix__row-sum'>
                <div className='matrix__cell'>
                  <Cell type='sum' amount={sum[index]} id={index} sumPercent={sumPercent} mouseOutPercent={mouseOutPercent}/>
                </div>
              </div>
              <button className='remove' onClick={()=>removeRow(index)}>x</button>
            </div>
            {(index === matrix.length - 1) ? <button className='new_row' onClick={()=>addRow()}>Add new row</button> : ''}
          </>            
        )
      : <span>Create your matrix :)</span>}
    </div>
  )
}


const mapStateToProps = ({ matrix, columns, x }) => {
  return ({
    matrix,
    columns,
    x
  })
};

function mapDispatchToProps(dispatch) {
  return {
    updateMatrixCell: (id, value) => dispatch(updateMatrixCell(id, value)),
    updateMatrix: (matrix) => dispatch(updateMatrix(matrix))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
