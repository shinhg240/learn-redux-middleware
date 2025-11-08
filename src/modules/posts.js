import React from "react";
import * as postsAPI from '../api/posts'
import { reducerUtils } from "../lib/asyncUtills";

//각 api당 3개씩
// const GET_POSTS = 'posts/GET_POSTS'; //Ducks Pattern
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POST_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => async (dispatch, getState) => {
    //요청이 시작됨
    dispatch({ type: GET_POSTS });
    try {
        const posts = await postsAPI.getPosts();

        dispatch({
            type: GET_POSTS_SUCCESS,
            posts,
        });
    } catch (error) {
        dispatch({
            type: GET_POSTS_ERROR,
            error: error,
        })
    }
}

export const getPost = (id) => async (dispatch, getState) => {
    //요청이 시작됨
    dispatch({ type: GET_POST });
    try {
        const post = await postsAPI.getPost(id);

        dispatch({
            type: GET_POST_SUCCESS,
            post,
        });
    } catch (error) {
        dispatch({
            type: GET_POST_ERROR,
        })
    }
}

const initState = {
    posts: reducerUtils.inital(),
    post: reducerUtils.inital(),
}

function posts(state = initState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: reducerUtils.loading(),
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: reducerUtils.success(action.posts),
            }
        case GET_POSTS_ERROR:
            return {
                ...state,
                posts: reducerUtils.error(action.error),
            }
        case GET_POST:
            return {
                ...state,
                post: reducerUtils.loading(),
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                post: reducerUtils.success(action.post),
            }
        case GET_POST_ERROR:
            return {
                ...state,
                post: reducerUtils.error(action.error),
            }
        default:
            return state;
    }
}

export default posts;