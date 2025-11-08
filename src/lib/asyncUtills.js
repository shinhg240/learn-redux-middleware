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