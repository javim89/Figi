import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Link from 'next/link'

export const mainListItems = (
    <React.Fragment>
        <Link href="/" passHref>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        </Link>
        <Link href="/orders" passHref>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
        </Link>
        <Link href="/products" passHref>
        <ListItemButton>
            <ListItemIcon>
                <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItemButton>
        </Link>
    </React.Fragment>
);