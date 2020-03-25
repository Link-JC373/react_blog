import { DECREMENT, DECREMENT_TYPE, INCREMENT, INCREMENT_TYPE, LOGIN_TYPE, LOGOUT, LOGOUT_TYPE, LOGIN } from '../actionTypes';

export interface IINCREMENTAction {
  type: INCREMENT_TYPE;
}

export interface IDECREMENTAction {
  type: DECREMENT_TYPE;
}

export interface ILOGINAction{
  type: LOGIN_TYPE;
}

export interface ILOGOUTAction{
  type: LOGOUT_TYPE
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = IINCREMENTAction | IDECREMENTAction | ILOGINAction | ILOGOUTAction;


// 增加 state 次数的方法
export const increment = (): IINCREMENTAction => ({
  type: INCREMENT,
})

// 减少 state 次数的方法
export const decrement = (): IDECREMENTAction => ({
  type: DECREMENT
})

//登录方法
export const login = (): ILOGINAction => ({
  type: LOGIN
})

//注销方法
export const logout = (): ILOGOUTAction => ({
  type: LOGOUT
})

// export const login = (): 