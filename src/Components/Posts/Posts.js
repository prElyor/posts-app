import React, { useState, useEffect } from 'react'
import { addPosts, getPosts, editPosts, deletePosts } from '../Api/utils/utils'
import {
    Button,
    TextField,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { PostStyles } from './PostStyles'
import Comments from '../Comments/Comments';
import { useHistory } from 'react-router';



function Posts() {
    const classes = PostStyles()
    const history = useHistory()

    const [value, setValue] = useState({
        title: '',
        body: ''
    })
    const [items, setItems] = useState([])
    const [disabled, setDisabled] = useState(true)


    const handleInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleChangePost = (id, e) => {
        let nam = e.target.name
        let newArr = [].concat(items)
        newArr.map((item, index) => {
            if (item.id === id) {
                if (nam === `postTitle${id}`) {
                    newArr[index] = {
                        ...newArr[index],
                        title: e.target.value
                    }
                } else {
                    newArr[index] = {
                        ...newArr[index],
                        body: e.target.value
                    }
                }
                setItems(newArr)
            }
            return false
        })

    }

    const handleClick = async (e) => {

        await addPosts(value)
            .then((res) => {
                const newPost = {
                    id: res.data.id,
                    title: res.data.title,
                    body: res.data.body
                }
                setItems(prev => {
                    return [...prev, newPost]
                })
            })
            .catch(err => {
                console.log('add post err', err);
            })
    }

    const getAllPosts = () => {
        getPosts()
            .then(res => {
                console.log(res);
                setItems(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRedirect = (id) => {
        history.push(`/posts/${id}`)
    }


    const handleDeletePost = async (id) => {
        // ???????????? ???????? ???????? ?????????????? ?? ???????????????? ?????? ???????????????? ????????????
        await deletePosts(id)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEditPost = async (id) => {
        // ?? ???? ???????????????????????????? ?????????? ???????????? ???? ?????? posts/:id, ???? ?? ???????????? ???????????????? ?????? ?? ???????????? ???????????????? ???????? ?????????????????????????? ??????????
        items.map(item => {
            if (item.id === id) {
                const params = {
                    title: item.title,
                    body: item.body
                }
                editPosts(id, params)
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

    useEffect(() => {
        getAllPosts()
    }, [])
    return (
        <div className={classes.app}>
            <Grid container className={classes.root} spacing={6} alignItems='center'>
                <Grid item xs={3}>
                    <TextField
                        id='title'
                        name="title"
                        variant="standard"
                        label='?????????????? ???????????????? ??????????...'
                        className={classes.textField}
                        value={value.title}
                        onChange={handleInput}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id='body'
                        name='body'
                        variant="standard"
                        label='?????????????? ???????????????? ??????????...'
                        className={classes.textField}
                        value={value.body}
                        onChange={handleInput}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.btn}
                        onClick={handleClick}>
                        ???????????????? ????????
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={6} alignItems='start'>
                {items.length < 1 ? (
                    <></>
                ) : (
                    items.map((item) => {
                        return (
                            <Grid item xs={4} key={item.id}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant='h5' component='h2'>
                                                <TextField
                                                    id={item.id.toString()}
                                                    name={`postTitle${item.id}`}
                                                    disabled={disabled}
                                                    variant="standard"
                                                    value={item.title}
                                                    className={classes.input}
                                                    onChange={e => handleChangePost(item.id, e)}
                                                />
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                component='div'
                                                className={classes.description}
                                            >
                                                <textarea
                                                    name={`postBody${item.id}`}
                                                    id={`postBody${item.id}`}
                                                    value={item.body}
                                                    disabled={disabled}
                                                    className={classes.textarea}
                                                    onChange={e => handleChangePost(item.id, e)}
                                                >

                                                </textarea>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <div style={{ width: '100%' }}>
                                            {disabled ?
                                                <Grid container spacing={6} alignItems='center'>
                                                    <Grid item xs={4} className={classes.iconWrapper}>
                                                        <RemoveRedEyeIcon onClick={e => handleRedirect(item.id)} />
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.iconWrapper}>
                                                        <EditIcon onClick={e => setDisabled(false)} />
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.iconWrapper}>
                                                        <DeleteIcon onClick={e => handleDeletePost(item.id)} />
                                                    </Grid>
                                                </Grid>
                                                :
                                                <Grid container spacing={6} alignItems='center'>
                                                    <Grid item xs={4} className={classes.iconWrapper}>
                                                        <RemoveRedEyeIcon onClick={e => handleRedirect(item.id)} />
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.iconWrapper}>
                                                        <CancelPresentationIcon onClick={e => setDisabled(true)} />
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.iconWrapper}>
                                                        <SendIcon onClick={e => handleEditPost(item.id)} />
                                                    </Grid>
                                                </Grid>

                                            }
                                            <Accordion className={classes.accordion}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>????????????????</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Comments id={item.id} />
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </div>
    )
}

export default Posts
