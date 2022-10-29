import { useState } from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box';
import { Grid, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Item = styled(Paper)(({ }) => ({
  height: 85,
  lineHeight: '85px',
}));

const NameContent = styled(Box)(({ theme }) => ({
  padding: "0 20px",
  borderRight: `2px solid ${theme.palette.grey[500]}`,
  minWidth: 320
}));

const DescriptionContent = styled(Box)(({ }) => ({
  padding: "0 20px",
}));

const GridActions = styled(Grid)(({ }) => ({
  marginLeft: "auto",
}));

const GridActionsItem = styled(Box)(({theme}) => ({
  borderLeft: `2px solid ${theme.palette.grey[500]}`
}));

const CustomTypography = styled(Typography)(({}) => ({
  lineHeight: "85px"
}));

const CustomImage = styled(Image)(({}) => ({
  borderBottomLeftRadius:4,
  borderTopLeftRadius:4,
}))


// ########  #######     #### ##     ## ########  ########   #######  ##     ## ######## 
//    ##    ##     ##     ##  ###   ### ##     ## ##     ## ##     ## ##     ## ##       
//    ##    ##     ##     ##  #### #### ##     ## ##     ## ##     ## ##     ## ##       
//    ##    ##     ##     ##  ## ### ## ########  ########  ##     ## ##     ## ######   
//    ##    ##     ##     ##  ##     ## ##        ##   ##   ##     ##  ##   ##  ##       
//    ##    ##     ##     ##  ##     ## ##        ##    ##  ##     ##   ## ##   ##       
//    ##     #######     #### ##     ## ##        ##     ##  #######     ###    ######## 

// get the base64 of the image and change the blur or can I use a loading gif?

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

const ListCard = ({ id, name, image, price, description }) => {
  const myLoader = ({ src }) => image;
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Item>
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <CustomImage
            placeholder='blur'
            blurDataURL={rgbDataURL(237, 181, 6)}
            loader={myLoader}
            height={85}
            width={85}
            src={image}
            alt={name}
          />
        </Grid>
        <Grid item>
          <NameContent>
            <CustomTypography variant="body1" color="text.secondary">
              {name} (${price})
            </CustomTypography>
          </NameContent>
        </Grid>
        <Grid item>
          <DescriptionContent>
            <CustomTypography variant="body1" color="text.secondary">
              {description}
            </CustomTypography>
          </DescriptionContent>
        </Grid>
        <GridActions item>
          <GridActionsItem>
            <IconButton
              aria-label="settings"
              id={`menu-card-${id}`}
              aria-controls={menuOpen ? `menu-card-${id}` : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id={`menu-card-${id}`}
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
            >
              <MenuItem>
                <EditIcon /> Editar
              </MenuItem>
              <MenuItem>
                <DeleteIcon /> Eliminar
              </MenuItem>
            </Menu>
          </GridActionsItem>
        </GridActions>
      </Grid>
    </Item>
  )
};

export default ListCard;
