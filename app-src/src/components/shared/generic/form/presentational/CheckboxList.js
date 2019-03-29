import React from 'react';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import Checkbox from './Checkbox';

const CheckboxList = ({ isFetching, error, items }) => {
    return error ? (
        <p>error</p>
    ) : isFetching ? (
        <Loading />
    ) : (
        items.map(item => <Checkbox key={item.id} item={item} />)
    );
};

export default CheckboxList;
