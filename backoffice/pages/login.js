import React from "react";
import { TextField , Box } from "@mui/material";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import AuthLayout from "../layouts/AuthLayout";
import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { signIn } from "next-auth/react";

const validationSchema = object({
  email: string().required("Required"),
  password: string().required("Required")
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
          loading={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
        >
          Ingresar
        </LoadingButton>
      </Box>
    </AuthLayout>
  );
}

export default Login;