import { /* call, put, */ takeEvery } from 'redux-saga/effects';
import * as postsAPI from '../api/posts'
import { createPromiseSaga, createPromiseSagaById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from "../lib/asyncUtills";

//각 api당 3개씩
// const GET_POSTS = 'posts/GET_POSTS'; //Ducks Pattern
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const CLEAR_POST = 'CLEAR_POST';

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
    type: GET_POST,
    payload: id,
    meta: id,
});

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById)

// function* getPostsSaga() {
//     try {
//         const posts = yield call(postsAPI.getPosts);
//         yield put({
//             type: GET_POSTS_SUCCESS,
//             payload: posts,
//         })
//     } catch (error) {
//         yield put({
//             type: GET_POSTS_ERROR,
//             error: true,
//             payload: error,
//         })
//     }
// }

// function* getPostSaga(action) {
//     const id = action.payload;
//     try {
//         const post = yield call(postsAPI.getPostById, id);
//         yield put({
//             type: GET_POST_SUCCESS,
//             payload: post,
//             meta: id,
//         })
//     } catch (error) {
//         yield put({
//             type: GET_POST_ERROR,
//             error: true,
//             payload: error,
//         })
//     }
// }

export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POST, getPostSaga);
}

const initState = {
    posts: reducerUtils.inital(),
    post: {},
}


const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true);

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