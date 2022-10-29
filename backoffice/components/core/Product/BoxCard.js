import { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BoxCard = ({ id, name, price, image, description }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        action={(
          <>
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
          </>
        )
        }
        title={name}
        subheader={`$${price}`}
      />
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default BoxCard;
