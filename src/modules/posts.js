import * as postsAPI from '../api/posts'
import { createPromiseThunk, handleAsyncActions, reducerUtils } from "../lib/asyncUtills";

//각 api당 3개씩
// const GET_POSTS = 'posts/GET_POSTS'; //Ducks Pattern
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const CLEAR_POST = 'CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const getPost = (id) => async (dispatch, getState) => {
    dispatch({
        type: GET_POST,
        meta: id,
    })

    try {
        const data = await postsAPI.getPostById(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: data,
            meta: id,
        })

    } catch (error) {
        dispatch({
            type: GET_POST_ERROR,
            payload: error,
            error: true,
            meta: id,
        })
    }
};
export const clearPost = () => ({ type: CLEAR_POST });

const initState = {
    posts: reducerUtils.inital(),
    post: {},
}

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
// const getPostReducer = handleAsyncActions(GET_POST, 'post');
const getPostReducer = (state, action) => {
    const id = action.meta;

    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    [id]: reducerUtils.loading(state.post[id] && state.post[id].data),
                }
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    [id]: reducerUtils.success(action.payload),
                }
            }
        case GET_POST_ERROR:
            return {
                ...state,
                post: {
                    ...state.post,
                    [id]: reducerUtils.error(action.error),
                }
            }
        default:
            return state;
    }
}

function posts(state = initState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return getPostsReducer(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return getPostReducer(state, action)
        case CLEAR_POST:
            return {
                ...state,
                post: reducerUtils.inital(),
            }
        default:
            return state;
    }
}

export default posts;