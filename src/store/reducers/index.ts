import { ModifyAction } from '../actions';
import { DECREMENT, INCREMENT, LOGOUT, LOGIN } from '../actionTypes';
import { combineReducers } from 'redux'

// 处理并返回 state 
let count = (state = 0, action: ModifyAction): number => {
    switch (action.type) {
      case INCREMENT:
        return state + 1
      case DECREMENT:
        return state - 1
      default:
        return state
    }
}

let isLogin = (state = false, action: ModifyAction): boolean => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state
  }
}


const rootReducer = combineReducers({
  countReducer: count,
  loginReducer: isLogin
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

// export default (state = 0, action: ModifyAction): number => {
//     switch (action.type) {
//       case INCREMENT:
//         return state + 1
//       case DECREMENT:
//         return state - 1
//       default:
//         return state
//     }
// }