import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { login, logout } from '../store/actions/index';
import { RootState } from '../store/reducers/index';
import { ILoginInfo } from '../pages/blog/types';



const mapStateToProps = (state: RootState): { userInfo: ILoginInfo } => ({
    userInfo: state.loginReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onLogin: (userInfo: ILoginInfo) => dispatch(login(userInfo)),
    onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)

// function Con(target: any, name: any, des: any) {

// }

// export default Con