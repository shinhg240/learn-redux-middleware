export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

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

export const handleAsyncActions = (type, key) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const reducer = (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(),
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload),
                }
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload),
                }
            default:
                return state;
        }
    }

    return reducer;
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
        error: null,
    }),
    success: (data) => ({
        loading: false,
        data: data,
        error: null,
    }),
    error: error => ({
        loading: false,
        data: null,
        error: error,
    })
}