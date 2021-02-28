import { useDispatch } from 'react-redux';
import useInterval from '../../lib/useInterval';
import Clock from './clock';
import Counter from './counter';
import { tickAC } from '../../redux/actions/testActions';

export default function Page() {
    const dispatch = useDispatch();

    // Tick the time every second
    useInterval(() => {
        dispatch(tickAC(false));
    }, 1000);

    return (
        <>
            <Clock />
            <Counter />
        </>
    );
}
