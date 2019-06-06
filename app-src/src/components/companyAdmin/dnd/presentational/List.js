import React from 'react';
import ListItem from './ListItem';

const List = () =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => <ListItem key={x} />);
export default List;
