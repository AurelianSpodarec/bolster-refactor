import React from 'react';
import withDragRow from '../hocs/withDragRow';

const Item = ({ text }) => {
    return (
        <>
            <td>{text}</td>
            <td />
        </>
    );
};

export default withDragRow(Item);
