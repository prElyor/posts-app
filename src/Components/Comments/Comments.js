import React, { useState, useEffect } from 'react'
import { addComment, deleteComments, editComment, getCommentsByPostId } from '../Api/utils/utils'
import { TextField, Grid, Button } from "@mui/material"
import classes from './Comments.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SendIcon from '@mui/icons-material/Send';

function Comments({ id }) {
    const [comments, setComments] = useState([])
    const [value, setValue] = useState({
        text: ''
    })
 
    const [disabled, setDisabled] = useState(true)

    const getAllCommentByPostId = (id) => {
        const params = {
            postId: id
        }
        getCommentsByPostId({ params })
            .then(res => {
                setComments(res.data)
            })
            .catch(err => {
                console.log('comment err', err);
            })
    }

    const handleChange = (e, commentId) => {
        let newArr = [].concat(comments)
        newArr.map((item, index) => {
            if(commentId === item.id){
                newArr[index] = {
                    ...newArr[index],
                    text: e.target.value
                }
                setComments(newArr)
            }
            return false
        })
    }

    const handleInputAddComment = (e) => {
        setValue({
            text: e.target.value
        })
    }

    const handleDeleteComment = async (id) => {
        await deleteComments(id)
            .then(res => {
                let newArr = [].concat(comments)
                newArr.map((item, index) => {
                    if(item.id === id){
                        newArr.splice(index, 1)
                        setComments(newArr)
                    }
                    return false
                })
            }).catch(err => {
                console.log(err);
            })
    }

    const handleEditComment = (commentId) => {
        comments.map(item => {
            if (item.id === commentId) {
                const params = {
                    postId: id,
                    text: item.text
                }
                editComment(commentId, params)
                    .then(res => {
                        setDisabled(true)
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
                return false
            })
    }

    const handleAddComment = async () => {
        const params = {
            postId: id,
            text: value.text
        }
        await addComment(params)
            .then(res => {
                setComments(prev => {
                    return [...prev, res.data]
                })
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getAllCommentByPostId(id)
    }, [id])
    return (
        <>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        variant="standard"
                        label="Добавить комментарий"
                        value={value.text}
                        onChange={handleInputAddComment}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color='primary' onClick={handleAddComment}>
                        <AddCircleOutlineIcon />
                    </Button>
                </Grid>
            </Grid>
            {comments.length < 1 ? <></> :
                comments.map(item => {
                    return (

                        <div key={item.id.toString()} className={classes.commentsWrapper}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    {disabled ?
                                        <TextField
                                            variant="standard"
                                            name={`comment${item.id}`}
                                            value={item.text}
                                            disabled={true}
                                        />
                                        :
                                        <TextField
                                            variant="standard"
                                            name={`comment${item.id}`}
                                            value={item.text}
                                            onChange={e => handleChange(e, item.id)}
                                            disabled={false}
                                        />

                                    }
                                </Grid>

                                {disabled &&
                                    <Grid item xs={6} className={classes.iconWrapper}>
                                        <EditIcon onClick={e => setDisabled(false)} />
                                    </Grid>
                                }
                                {disabled &&
                                    <Grid item xs={6} className={classes.iconWrapper}>
                                        <DeleteIcon onClick={e => handleDeleteComment(item.id)} />
                                    </Grid>
                                }
                                {!disabled &&
                                    <Grid item xs={6} className={classes.iconWrapper}>
                                        <CancelPresentationIcon onClick={e => setDisabled(true)} />
                                    </Grid>
                                }
                                {!disabled &&
                                    <Grid item xs={6} className={classes.iconWrapper}>
                                        <SendIcon onClick={e => handleEditComment(item.id)} />
                                    </Grid>
                                }

                            </Grid>
                        </div>
                    )
                })
            }

        </>
    )
}

export default Comments
