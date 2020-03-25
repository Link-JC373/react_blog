import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { login, logout } from '../store/actions/index';
import { RootState } from '../store/reducers/index';
import BlogHeader from 'pages/blog/components/header';


const mapStateToProps = (state: RootState): { isLogin: boolean } => ({
    isLogin: state.loginReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onLogin: () => dispatch(login()),
    onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogHeader)