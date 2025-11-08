//액션 타입선언
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const increase = () => {
    return {
        type: 'INCREASE',
    }
}

export const decrease = () => ({ type: 'DECREASE' });

//thunk 함수
export const increaseAsync = () => (dispatch, getState) => {
    setTimeout(() => {
        dispatch(increase());
    }, 1000)
}
//thunk 함수
export const decreaseAsync = () => (dispatch, getState) => {
    setTimeout(() => {
        dispatch(decrease());
    }, 1000)
}

const initState = 0;

export default function counter(state = initState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}