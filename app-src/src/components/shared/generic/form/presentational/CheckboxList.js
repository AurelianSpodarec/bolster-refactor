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
                key={item.id}
                id={item.id}
                item={item}
                checked={item.checked}
                disabled={item.disabled}
            />
        ))
    );
};

export default CheckboxList;
