import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { userRegister } from '../../redux/Authslice';

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

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const {isPending, mutate} = useMutation({
        mutationFn: (payload) => userRegister(payload)
    })

    const onSubmit = () => {
        const formdata = new FormData(document.getElementsByTagName('form')[0])
        mutate(formdata)
    }

    return (
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="first_name Address"
                            name="first_name"
                            autoComplete="first_name"
                            autoFocus
                            {...register('first_name', { required: true })}
                        />
                        {errors.first_name?.type === 'required' && <span>@first_name is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="last_name Address"
                            name="last_name"
                            autoComplete="last_name"
                            autoFocus
                            {...register('last_name', { required: true })}
                        />
                        {errors.last_name?.type === 'required' && <span>@last_name is required</span>}
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === 'required' && <span>@email is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password', { required: true })}
                        />
                        {errors.password?.type === 'required' && <span>@password is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='file'
                            id="profile_pic"
                            autoFocus
                            {...register('profile_pic', { required: true })}
                        />
                        {errors.profile_pic?.type === 'required' && <span>@profile_pic is required</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isPending ? 'Loading...' : 'Register'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}