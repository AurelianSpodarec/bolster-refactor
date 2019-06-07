import React from 'react';
import withDragDrop from '../hocs/withDragDrop';

const ListItem = ({ item, elementRef }) => (
    <tr elementRef={elementRef}>
        <td>Item {item}</td>
        <td>Item {item}</td>
        <td>Item {item}</td>
        <td>Item {item}</td>
    </tr>
);

export default withDragDrop(ListItem);
