import { useSelector, useDispatch } from 'react-redux';
import {
    incrementAC,
    decrementAC,
    resetAC,
} from '../../redux/actions/testActions';

const useCounter = () => {
    const count = useSelector((state: any) => state.test.count);
    const dispatch = useDispatch();
    const increment = () => dispatch(incrementAC());
    const decrement = () => dispatch(decrementAC());
    const reset = () => dispatch(resetAC());
    return { count, increment, decrement, reset };
};

const Counter = () => {
    const { count, increment, decrement, reset } = useCounter();
    return (
        <div>
            <h1>
                Count: <span>{count}</span>
            </h1>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Counter;
