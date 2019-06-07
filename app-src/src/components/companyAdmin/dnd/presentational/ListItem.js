import React from 'react';
import withDragDrop from '../hocs/withDragDrop';

const ListItem = ({ dragSource }) =>
    dragSource(
        <tr>
            <td>Value 1</td>
            <td>Value 2</td>
            <td>Value 3</td>
            <td>Value 4</td>
        </tr>
    );

export default withDragDrop(ListItem);
