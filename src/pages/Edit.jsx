import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, updateProduct } from '../redux/Productsslice';
// import { useQuery } from '@tanstack/react-query'


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export function Edit(){

    const {id} = useParams()
    // const [signleProductResponse, setSignleProductResponse] = React.useState([])
    const dispatch = useDispatch()
    const { signleProductResponse, status } = useSelector(state => state.products)
    // const { data: signleProductResponse, isPending: status } = useQuery({
    //     queryKey: ['getProductDetails', id],
    //     queryFn: () => fetchSingleProduct(id)
    // })


    const {register, handleSubmit, formState:{errors}, setValue} = useForm({
        defaultValues: {
            title: signleProductResponse?.data?.title,
            description: signleProductResponse?.data?.description,
        }
    })

    setValue("title", signleProductResponse?.data?.title)
    setValue("description", signleProductResponse?.data?.description)

    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append("id", id)
        formdata.append("title", data.title)
        formdata.append("description", data.description)
        formdata.append("image", data.image[0])
        updateProduct(formdata)
    }

    console.log(signleProductResponse?.data);

    React.useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [id, dispatch])

    return(
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Edit Product
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="title Address"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            {...register('title', { required: true })}
                        />
                        {errors.title?.type === 'required' && <span>@title is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="description Address"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            {...register('description', { required: true })}
                        />
                        {errors.description?.type === 'required' && <span>@description is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='file'
                            id="image"
                            autoFocus
                            {...register('image', { required: true })}
                        />
                        {errors.image?.type === 'required' && <span>@image is required</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {status !== 'loading' ? 'Login' : 'Loading...'}
                            {/* Login */}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}