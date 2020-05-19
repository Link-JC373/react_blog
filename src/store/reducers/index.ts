import { ModifyAction } from '../actions';
import { DECREMENT, INCREMENT, LOGOUT, LOGIN } from '../actionTypes';
import { combineReducers } from 'redux'
import { ILoginInfo } from '../../pages/blog/types';

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

let isLogin = (
  state = {
        userId: 0,
        userIcon: '',
        username : ''
}
  , action: ModifyAction): ILoginInfo => {
  switch (action.type) {
    case LOGIN:
      return action.userInfo;
    case LOGOUT:
      return {
        userId: 0,
        userIcon: '',
        username : ''
      };
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