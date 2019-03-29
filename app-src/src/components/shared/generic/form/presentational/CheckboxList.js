import React from 'react';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import Checkbox from './Checkbox';

const CheckboxList = ({ isFetching, error, items, handleMultiselect }) => {
    return error ? (
        <p>error</p>
    ) : isFetching ? (
        <Loading />
    ) : (
        Object.values(items).map(item => (
            <Checkbox
                text={item.name}
                name={item.name}
                handleMultiselect={handleMultiselect}
                key={item.text}
                item={item}
                checked={item.checked}
            />
        ))
    );
};

export default CheckboxList;
