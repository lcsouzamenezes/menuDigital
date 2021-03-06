import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HorizontalStepper from '../stepper'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Menu from '../../utils/menu';
import history from '../../history';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    navBottom: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
    },
    modalInt: {
        position: 'absolute',
        width: 280,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        maxHeight: 500,
        overflowY: 'auto',
        '&:focus': {
            outline: 'none',
        },
    },
    confirm: {
        marginTop: 25,
    },
    tab: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    textInOrder: {
        width: 150,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginRight: 20,
    },
});

const NavBottom = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const [state, setState] = useState({
        right: false,
    });
    const dishes = useSelector((state) => state.postDishesReducer.dishes);
    const [open, setOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false)
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const toggleDrawer = (anchor, open, item) => (event) => {
        console.log(item)
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
        setState({ ...state, [anchor]: open });
        if(item != undefined){
            if(item == "Bebidas" || item == "Platos fuertes"){
                handleClick(item)
            }
            else{
                handleClickDetails(`/Menus/${item}`);
            }
        }
    };
    const handleClickHome = () => {
        history.push({
            pathname: '/',
        });
    };

    const handleClick = (type) => {
        history.push({
            pathname: '/Submenu',
            state: type,
        });
    };
    const handleClickDetails = (type) => {
        history.push({
            pathname: type,
            state: type,
        });
    };
    const handleConfirmed = () =>{
        setIsConfirmed(true)
    }
    return (
        <Paper elevation={3} square className={classes.navBottom}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}>
                <BottomNavigationAction
                    label="Inicio"
                    icon={<HomeIcon />}
                    onClick={handleClickHome}
                />
                <BottomNavigationAction
                    label="Orden"
                    onClick={handleOpen}
                    icon={<AlarmOnIcon />}
                />
                <BottomNavigationAction label="Pagar" icon={<PaymentIcon />} />
                <BottomNavigationAction
                    onClick={toggleDrawer('right', true)}
                    label="Menú"
                    icon={<FastfoodIcon />}
                />
            </BottomNavigation>
            <SwipeableDrawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}>
                <List>
                    {Menu.map((item, index) => (
                        <ListItem
                            button
                            onClick={toggleDrawer('right', false, item.text)}
                            key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
            <Modal
                className="modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className={classes.modalInt}>
                    {!isConfirmed ?
                        <React.Fragment>
                            <Typography variant="h4">Revisa tu orden</Typography>
                            <List>
                                {!dishes ? (
                                    <p>Aún no agregas nada a tu orden</p>
                                ) : (
                                    dishes.map((item, index) => {
                                        return (
                                            <ListItem
                                                key={index}
                                                className={classes.tab}>
                                                <Typography
                                                    className={classes.textInOrder}
                                                    variant="body2">
                                                    {item.nombrePlatillo}
                                                </Typography>
                                                <ListItemText
                                                    primary={`$ ${item.costoPlatillo} MNX`}
                                                />
                                                <Divider />
                                            </ListItem>
                                        );
                                    })
                                )}
                            </List>
                            <Typography variant="h6">
                                Total $
                                {dishes?.reduce(
                                    (sum, { costoPlatillo }) => sum + costoPlatillo,
                                    0
                                )}
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Button
                                    className={classes.confirm}
                                    variant="contained"
                                    color="primary"
                                    onClick={dishes && handleConfirmed}
                                    >
                                    Confirmar
                                </Button>
                            </Grid>
                        </React.Fragment>
                        :
                        <HorizontalStepper/>
                    }
                </div>
            </Modal>
        </Paper>
    );
};

export default NavBottom;
