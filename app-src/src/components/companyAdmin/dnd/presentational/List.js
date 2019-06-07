import React from 'react';
import ListItem from './ListItem';

const List = ({ list, moveItem }) =>
    list.map((x, i) => (
        <ListItem key={x} item={x} position={i} moveItem={moveItem} />
    ));
export default List;
