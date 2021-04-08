import React from 'react';

import './cell.css';


function Cell({type, amount, ratio = false, isClose = false, id, updateMat, handleHover, sumPercent, mouseOutPercent, mouseOutClean}) {
  const mouseHandler = () => (type === 'sum') ? sumPercent(id, amount) : handleHover(amount);
  const mouseOutHandler = () => (type === 'sum') ? mouseOutPercent(id, amount) : mouseOutClean()
  const updateMatHandler = () => (type === 'sum') ? '' : updateMat(id, amount);

  return(
    <button 
      data-percent={ratio}
      className={isClose ? 'isClose' : ''}
      value={amount} 
      onClick={updateMatHandler} 
      onMouseOver={mouseHandler} 
      onMouseOut={mouseOutHandler}
    >
      { (ratio !== false) ? `${ratio}%` : amount}
      {(ratio !== false) ? 
      <span style={{ 'height' : `${ratio}%` }}></span>
      : <span></span>
      }
    </button>
  )
}

export default Cell