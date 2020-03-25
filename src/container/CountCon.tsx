import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { decrement, increment } from '../store/actions/index';
import Count from '../count';
import { RootState } from '../store/reducers/index';


const mapStateToProps = (state: RootState): { value: number } => ({
    value: state.countReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onDecrement: () => dispatch(decrement()),
    onIncrement: () => dispatch(increment())
})

export default connect(mapStateToProps, mapDispatchToProps)(Count)