export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCESS`, `${type}_ERROR`];

    const thunkCreator = param => async (dispatch, state) => {
        dispatch({ type });

        try {
            const payload = await promiseCreator(param);
            dispatch({
                type: SUCCESS,
                payload: payload,
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error,
            })
        }
    }

    return thunkCreator;
}

export const reducerUtils = {
    inital: (data) => ({
        loading: false,
        data: data,
        error: null,
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: false,
    }),
    success: (data) => ({
        loading: false,
        data: data,
        error: false,
    }),
    error: error => ({
        loading: false,
        data: null,
        error: error,
    })
}