import { ADD_MATRIX, UPDATE_MATRIX_CELL, UPDATE_MATRIX } from "../constants/action-types";

const initialState = {
  rows: 0,
  columns: 0,
  x: 0,
  matrix: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MATRIX:
      return {
        ...state,
        rows: action.payload.rows,
        columns: action.payload.columns,
        x: action.payload.x,
        matrix: action.payload.matrix,
      }
      case UPDATE_MATRIX_CELL:
        const [x,y] = action.payload.id.split('_');
        const newMatrix = [...state.matrix];
        newMatrix[x][y].amount = action.payload.value;
        return {
          ...state, 
          matrix: newMatrix
        }
      case UPDATE_MATRIX:
        return {
          ...state, 
          matrix: action.payload.matrix
        }

   default:
     return state
  }
}

export default rootReducer;