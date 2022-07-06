import React, { useState } from "react";
import BussinessLayout from "../layouts/BussinessLayout";
import withAuth from "../components/withAuth";
import { Grid, Box, Typography, Button, TextField, SwipeableDrawer } from "@mui/material";
import ProductForm from "../components/products/Form";
import { makeStyles } from '@mui/styles';
import theme from "../src/theme";

const useStyles = makeStyles({
	drawer: {
		width: theme.spacing(50),
	},
});

const Products = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const classes = useStyles();
	return (
		<BussinessLayout>
			<Grid container justifyContent={"space-between"} alignItems={"center"}>
				<Grid item>
					<Typography variant="h5">Productos</Typography>
				</Grid>
				<Grid item>
					<Grid container alignItems={"center"}>
						<Grid item>
							<TextField label="Buscar.." />
						</Grid>
						<Grid item>
							<Button variant="contained" onClick={() => setOpenDrawer(true)}>Crear</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<SwipeableDrawer open={openDrawer} anchor={"right"} onClose={() => setOpenDrawer(false)}>
				<Box component="div" className={classes.drawer}>
					<Typography variant="h6">Nuevo producto</Typography>
					<ProductForm setOpenDrawer={setOpenDrawer}/>
				</Box>
			</SwipeableDrawer>
		</BussinessLayout>
	)
}


export default withAuth(Products);