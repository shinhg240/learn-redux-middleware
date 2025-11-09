import React, { useEffect } from "react";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../modules/posts";

function PostContainer({ postId }) {
    const { error, data, loading } = useSelector(state => state.posts.post)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(postId));
    }, [dispatch, postId])

    if (loading) return <div>로딩중..</div>
    if (error) return <div>에러발생!</div>
    if (!data) return null;

    return (
        <Post post={data} />
    )
}

export default PostContainer;