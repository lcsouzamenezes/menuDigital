import React from 'react';
import FoodCard from './index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const FoodCardView = () => (
    <FoodCard
        nombrePlatillo="Paella especial"
        costoPlatillo="300"
        imgUrl="/img/paella.jpg"
        title="Title"
        description="Deliciosa paella con Camarón y sazonada con especias, con
        jitomate y más descripción"
        addToOrder="Agregar a orden"></FoodCard>
);
export default {
    title: 'FoodCard',
    decorators: [withKnobs],
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: 'iphone6',
        },
    },
};
