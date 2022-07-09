import React, { useState, useEffect } from "react";
import BussinessLayout from "../layouts/BussinessLayout";
import withAuth from "../components/withAuth";
import { Grid, Box, Typography, Button, TextField, SwipeableDrawer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableContainer, TableBody, TablePagination } from "@mui/material";
import ProductForm from "../components/products/Form";
import { makeStyles } from '@mui/styles';
import theme from "../src/theme";
import { gql, useQuery, useMutation } from "@apollo/client";
import client from "../apollo-client";
import { visuallyHidden } from '@mui/utils';

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
			id
		}
}`;

const DELETE_PRODUCT = gql`
	mutation DeleteProduct($deleteProductId: ID) {
  	deleteProduct(id: $deleteProductId)
	}
`;

const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Nombre',
	},
	{
		id: 'description',
		numeric: true,
		disablePadding: false,
		label: 'Descripción',
	},
	{
		id: 'acciones',
		numeric: true,
		disablePadding: false,
		label: 'Acciones',
	},
];

const EnhancedTableHead = (props) => {
	const { order, orderBy, rowCount, onRequestSort } =
		props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const Products = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const classes = useStyles();


	const { loading: isLooadingProducts, error: errorProducts, data: products } = useQuery(GET_PRODUCTS);

	const [deleteProduct, { loading: loadingDeleteProduct, error: errorDeleteProduct }] = useMutation(DELETE_PRODUCT, {
		refetchQueries: [
			{ query: GET_PRODUCTS }, // DocumentNode object parsed with gql
			'Query' // Query name
		],
	});

	const handleRequestSort = (_, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

	const handleDeleteProduct = (productId) => {
		deleteProduct({ variables: { deleteProductId: productId } })
	}

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
			<Box component="div">
				{!isLooadingProducts && products && products.getAll.length > 0 && (
					<><TableContainer>
						<Table>
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
								rowCount={products.getAll.length} />
							<TableBody>
								{stableSort(products.getAll, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												// onClick={(event) => handleClick(event, row.name)}
												tabIndex={-1}
												key={index}
											>
												<TableCell align="center">{row.name}</TableCell>
												<TableCell align="center">{row.description}</TableCell>
												<TableCell align="center"><Button onClick={() => handleDeleteProduct(row.id)}>E</Button></TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: (dense ? 33 : 53) * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer><TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={products.getAll.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							labelRowsPerPage="Filas por paginas"
							onRowsPerPageChange={handleChangeRowsPerPage} /></>
				)}
			</Box>
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