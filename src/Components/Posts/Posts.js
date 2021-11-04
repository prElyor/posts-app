import React, { useState, useEffect } from 'react'
import { addPosts, getPosts } from '../Api/utils/utils'
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
import { PostStyles } from './PostStyles'
import Comments from '../Comments/Comments';



function Posts() {
    const classes = PostStyles()

    const [value, setValue] = useState({
        title: '',
        body: ''
    })
    const [items, setItems] = useState([])
    const [disabled, setDisabled] = useState(true)


    const handleInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
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

    const handleDeletePost = (id) => {

    }

    const handleEditPost = (id) => {

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
                        label='Введите название поста...'
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
                        label='Введите описание поста...'
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
                        Добавить пост
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
                                                    disabled={disabled}
                                                    variant="standard"
                                                    value={item.title}
                                                    className={classes.input}
                                                />
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                component='div'
                                                className={classes.description}
                                            >
                                                <textarea
                                                    name=""
                                                    id=""
                                                    value={item.body}
                                                    onChange={handleInput}
                                                    disabled={disabled}
                                                    className={classes.textarea}
                                                >

                                                </textarea>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <div style={{width: '100%'}}>
                                        {disabled ?
                                            <Grid container spacing={6} alignItems='center'>
                                                <Grid item xs={6} className={classes.iconWrapper}>
                                                    <EditIcon onClick={e => setDisabled(false)} />
                                                </Grid>
                                                <Grid item xs={6} className={classes.iconWrapper}>
                                                    <DeleteIcon onClick={e => handleDeletePost(item.id)} />
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid container spacing={6} alignItems='center'>
                                                <Grid item xs={6} className={classes.iconWrapper}>
                                                    <CancelPresentationIcon onClick={e => setDisabled(true)} />
                                                </Grid>
                                                <Grid item xs={6} className={classes.iconWrapper}>
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
                                                <Typography>Комменты</Typography>
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
