import React from 'react';

import ManufacturerListItemContainer from '../containers/ManufacturerListItemContainer';

const ManufacturerList = ({ manufacturers, colCount, headers }) => {
    return manufacturers.map(manufacturer => (
        <ManufacturerListItemContainer
            key={manufacturer.id}
            manufacturer={manufacturer}
            colCount={colCount}
            headers={headers}
        />
    ));
};
export default ManufacturerList;
