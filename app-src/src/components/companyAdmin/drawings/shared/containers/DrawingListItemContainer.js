import React from 'react';
import DrawingListItem from '../presentational/DrawingListItem';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

const DrawingListItemContainer = ({
    drawing,
    drawing: { permissions, accessType },
    ...rest
}) => (
    <DrawingListItem
        {...rest}
        drawing={drawing}
        permissions={
            (!permissions && ACCESS_TYPES[accessType]) ||
            permissions.map(permission => permission.companyName).join(', ')
        }
    />
);

export default DrawingListItemContainer;
