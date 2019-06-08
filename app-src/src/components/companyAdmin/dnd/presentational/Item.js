import React from 'react';
import withDragRow from '../hocs/withDragRow';

const Item = ({ forwardRef, text, click }) => {
    return (
        <tr onClick={click} ref={forwardRef} style={{ cursor: 'move' }}>
            <td>{text}</td>
            <td />
        </tr>
    );
};

export default withDragRow(Item);
