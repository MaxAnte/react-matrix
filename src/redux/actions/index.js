import { ADD_MATRIX, UPDATE_MATRIX_CELL, UPDATE_MATRIX } from '../constants/action-types'


export function addMatrix(payload) {
  let mat = [];
  for(var i=0; i<payload.rows; i++) {
    mat[i] = [];
    for(var j=0; j<payload.columns; j++) {
      mat[i][j] = {
        id: `${i}_${j}`,
        amount: Math.round(Math.random() * (999 - 100) + 100),
      }
    }
  }

  return { 
    type: ADD_MATRIX, 
    payload: {
      rows: payload.rows,
      columns: payload.columns,
      x: payload.x,
      matrix: mat
    }
  }
};

export function updateMatrixCell(id, value) {
  return { 
    type: UPDATE_MATRIX_CELL, 
    payload: {
      id,
      value
    }
  }
};

export function updateMatrix(matrix) {
  return { 
    type: UPDATE_MATRIX, 
    payload: {
      matrix
    }
  }
};
