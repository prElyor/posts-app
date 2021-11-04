import React, { useEffect, useState } from 'react'
import { httpReq } from '../Api/axios/axios';
import classes from './PostsEdit.module.css'

function PostsEdit() {
    const [post, setPost] = useState(null)

    useEffect(() => {
        httpReq.get(window.location.pathname)
            .then(res => {
                setPost(res.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className={classes.editPostWrapper}>
            {/* Задачу для данной страницы не очень понял поэтому решил просто ввести название и описание поста */}
            {!post ? <h6>Нет поста</h6> :
                <>
                    <h1>{post.title}</h1>
                    <h4>{post.body}</h4>
                </>
            }
        </div>
    )
}

export default PostsEdit
