import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FoodCard from '../../components/cards';
import * as actions from '../../actions/actions';
import { useDispatch, useSelector, connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(10),
    },
}));
const MenuAperitivos = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const aperitivos = useSelector(
        (state) => state.aperitivosReducer.aperitivos
    );
    const dishes = useSelector((state) => state.postDishesReducer.dishes);
    let number = 0;
    let name = '';
    if (!dishes) {
        console.log('no dishes');
        number = 0;
        //;
    } else {
        number = dishes[dishes.length - 1].number;
        name = dishes[dishes.length - 1].nombrePlatillo;
    }
    useEffect(() => {
        dispatch(actions.getAperitivos());
    }, []);
    if (!aperitivos) {
        return <h1>Cargando...</h1>;
    }
    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container spacing={3}>
                {aperitivos?.map((item, index) => (
                    <Grid item key={item.id} xs={12} sm={6} md={3}>
                        <FoodCard
                            nombrePlatillo={item.name}
                            costoPlatillo={item.price}
                            imgUrl={item.imgUrl}
                            title={item.name}
                            description={item.description}
                            addToOrder="Agregar a orden"
                            isAdded={item.isAdded}
                            number={name == item.name ? number : 0}
                            id={item.id}></FoodCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default connect((state) => state)(MenuAperitivos);
