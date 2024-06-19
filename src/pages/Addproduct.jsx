import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { createProduct } from '../redux/Productsslice';
import { useMutation } from '@tanstack/react-query';

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

export function Addproduct(){

    const {register, handleSubmit, formState:{errors}} = useForm()
    const {isPending, mutate} = useMutation({
        mutationFn: (payload) => createProduct(payload)
    })

    const onSubmit = () => {
        const formdata = new FormData(document.getElementsByTagName('form')[0])
        mutate(formdata)
    }

    return (
        <>
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
                            Add Product
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
                                {!isPending ? 'Login' : 'Loading...'}
                                {/* Add Product */}
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
        </>
    )
}