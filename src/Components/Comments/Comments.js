import React, { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../Api/utils/utils'
import { TextField, Grid, Button } from "@mui/material"
import classes from './Comments.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SendIcon from '@mui/icons-material/Send';

function Comments({ id }) {
    const [comments, setComments] = useState([])
    const [commentsEdit, setCommentsEdit] = useState({})
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

    const handleChange = (e) => {
        setCommentsEdit({ ...commentsEdit, [e.target.name]: e.target.value })
    }

    const handleDeleteComment = (id) => {

    }

    const handleEditComment = (id) => {

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
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color='primary'>
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
                                            defaultValue={item.text}
                                            onChange={handleChange}
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
