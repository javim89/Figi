import React, { useState, useEffect } from "react";
import BussinessLayout from "../layouts/BussinessLayout";
import withAuth from "../components/withAuth";
import { Grid, Box, Typography, Button, TextField, SwipeableDrawer } from "@mui/material";
import ProductForm from "../components/products/Form";
import { makeStyles } from '@mui/styles';
import theme from "../src/theme";
import { gql, useQuery, useMutation } from "@apollo/client";
import BoxCard from "../components/core/Product/BoxCard";

const useStyles = makeStyles({
	drawer: {
		width: theme.spacing(50),
	},
});

const GET_PRODUCTS = gql`
	query Query {
		getAll {
			name
			description
			price
			id
		}
}`;

const DELETE_PRODUCT = gql`
	mutation DeleteProduct($deleteProductId: ID) {
  	deleteProduct(id: $deleteProductId)
	}
`;

const Products = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const classes = useStyles();

	const { loading: isLooadingProducts, error: errorProducts, data: products } = useQuery(GET_PRODUCTS);

	const [deleteProduct, { loading: loadingDeleteProduct, error: errorDeleteProduct }] = useMutation(DELETE_PRODUCT, {
		refetchQueries: [
			{ query: GET_PRODUCTS }, // DocumentNode object parsed with gql
			'Query' // Query name
		],
	});

	const handleDeleteProduct = (productId) => {
		deleteProduct({ variables: { deleteProductId: productId } })
	}

	return (
		<BussinessLayout>
			<Grid container justifyContent={"space-between"} alignItems={"center"}>
				<Grid item>
					<Typography variant="h5">Productos</Typography>
				</Grid>
				{/* <Grid item>
					<Grid container alignItems={"center"}>
						<Grid item>
							<TextField label="Buscar.." />
						</Grid>
						<Grid item>
							<Button variant="contained" onClick={() => setOpenDrawer(true)}>Crear</Button>
						</Grid>
					</Grid>
				</Grid> */}
			</Grid>
			<Grid container spacing={2}>
			{!isLooadingProducts && products && products.getAll.length > 0 && (
				products.getAll.map((product, index) => (
					<Grid item md={4} sm={12} key={index}>
						<BoxCard
							id={product.id}
							name={product.name}
							price={product.price}
							description={product.description}
							image={"https://picsum.photos/200"}
						 />
					</Grid>
				))
				)}
				</Grid>
			<SwipeableDrawer open={openDrawer} anchor={"right"} onClose={() => setOpenDrawer(false)}>
				<Box component="div" className={classes.drawer}>
					<Typography variant="h6">Nuevo producto</Typography>
					<ProductForm setOpenDrawer={setOpenDrawer} />
				</Box>
			</SwipeableDrawer>
		</BussinessLayout>
	)
}


export default withAuth(Products);