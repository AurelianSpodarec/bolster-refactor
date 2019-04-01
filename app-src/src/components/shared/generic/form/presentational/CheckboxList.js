import React from 'react';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import CheckboxContainer from '../containers/CheckboxContainer';

const CheckboxList = ({ isFetching, error, items, handleChange }) => {
    return error ? (
        <p>error</p>
    ) : isFetching ? (
        <Loading />
    ) : (
        Object.values(items).map(item => (
            <CheckboxContainer
                text={item.name}
                name={item.name}
                handleChange={handleChange}
                key={item.name}
                item={item}
                checked={item.checked}
            />
        ))
    );
};

export default CheckboxList;
