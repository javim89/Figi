import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { object, string, array, number, boolean } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Checkbox, TextField, Grid, FormControlLabel } from "@mui/material"
import { gql, useMutation } from '@apollo/client';

const validationSchema = object({
	name: string().required(),
	description: string(),
	category: array().of(string()),
	price: number(),
	isVegetarian: boolean(),
	isVegan: boolean(),
	nutricionInfo: boolean(),
	fat: number(),
	saturates: number(),
	sugars: number(),
	salt: number(),
});

const ProductForm = ({ setOpenDrawer }) => {
	const { control, handleSubmit, formState: { isSubmitting } } = useForm({
		defaultValues: {
			name: "",
			description: "",
			category: [],
			price: 0,
			isVegetarian: false,
			isVegan: false,
			nutricionInfo: false,
			fat: undefined,
			saturates: undefined,
			sugars: undefined,
			salt: undefined
		},
		resolver: yupResolver(validationSchema),
	});


	const CREATE_PRODUCT = gql`
				mutation CreateProduct($product: ProductInput) {
	        createProduct(product: $product) {
	            id
	    }
	}
	`;
	const [createProduct] = useMutation(CREATE_PRODUCT);

	const onSubmit = (values) => {
		createProduct({ variables: { product: values } })
		setOpenDrawer(false)
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate >
			<Grid container direction={"column"}>
				<Grid item>
					<Controller
						name="name"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Nombre"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="description"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Descripcion"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid>
				{/* <Grid item>
					<Controller
						name="category"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Categorias"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid> */}
				<Grid item>
					<Controller
						name="price"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Precio"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
					<Grid item>
						<Controller
							name="isVegetarian"
							control={control}
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<FormControlLabel control={<Checkbox />} label="Vegetariano" labelPlacement="start" />
							)}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<Controller
						name="isVegan"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<FormControlLabel control={<Checkbox />} label="Vegano?" labelPlacement="start" />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="nutricionInfo"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<FormControlLabel control={<Checkbox />} label="Información nutricional" labelPlacement="start" />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="fat"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Fat"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="saturates"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Saturates"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="sugars"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Azucares"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="salt"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<TextField
								margin="normal"
								label="Sales"
								onChange={onChange}
								value={value}
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				</Grid>
			</Grid>
			<LoadingButton
				loading={isSubmitting}
				type="submit"
				variant="contained"
				fullWidth
			>
				Submit
			</LoadingButton>
		</Box>
	)

};

export default ProductForm;

