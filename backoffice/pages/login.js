import React from 'react';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AuthLayout from '../layouts/AuthLayout';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { signIn } from 'next-auth/react';

const validationSchema = yup.object({
  email: yup.string().required("Required"),
  password: yup.string().required("Required")
});

const Login = () => {
  const { control, handleSubmit, formState: {isSubmitting} } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    await signIn("credentials", {
      redirect: false,
      username: values.email,
      password: values.password,
      callbackUrl: "/products",
    });
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      {/* <Controller
          name="csfrToken"
          control={control}
          hidden
          render={({ field: { value }}) => (
            <TextField
              margin="normal"
              hidden
              value={value}
            />
          )}
        /> */}
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />

        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
        <LoadingButton
          color="secondary"
          loading={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
        >
          Ingresar
        </LoadingButton>
        {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
      </Box>
    </AuthLayout>
  );
}

export default Login;