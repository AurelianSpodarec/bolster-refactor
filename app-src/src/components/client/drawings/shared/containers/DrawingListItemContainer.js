import React from 'react';
import DrawingListItem from '../presentational/DrawingListItem';

const DrawingListItemContainer = ({ drawing, ...rest }) => (
    <DrawingListItem {...rest} drawing={drawing} />
);

export default DrawingListItemContainer;
