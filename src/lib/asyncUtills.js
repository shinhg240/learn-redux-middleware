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

export const createPromiseThunkById = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const thunkCreator = (param) => async (dispatch, getState) => {
        const id = param;

        dispatch({
            type: type,
            meta: id
        })
        try {
            const data = await promiseCreator(id);

            dispatch({
                type: SUCCESS,
                meta: id,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                meta: id,
                payload: error,
                error: true,
            })
        }
    }

    return thunkCreator;
}

export const handleAsyncActions = (type, key, keepData) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const reducer = (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null),
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

export const handleAsyncActionsById = (type, key, keepData) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const reducer = (state, action) => {
        const id = action.meta;
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.loading(keepData ? (state[key][id] && state[key][id].data) : null),
                    },
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.success(action.payload),
                    },
                }
            case ERROR:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.error(action.payload),
                    },
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