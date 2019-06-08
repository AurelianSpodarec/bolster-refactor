import React, { useRef, useState, useCallback } from 'react';
import { DropTarget } from 'react-dnd';
import Item from './Item';
import update from 'immutability-helper';
const style = {
    width: 400
};

const initialList = [
    {
        id: 1,
        sort: 1,
        title: 'Item 1',
        text: 'Write a cool JS library'
    },
    {
        id: 2,
        sort: 2,
        title: 'Item 2',
        text: 'Make it generic enough'
    },
    {
        id: 3,
        sort: 3,
        title: 'Item 3',
        text: 'Write README'
    },
    {
        id: 4,
        sort: 4,
        title: 'Item 4',
        text: 'Create some examples'
    },
    {
        id: 5,
        sort: 5,
        title: 'Item 5',
        text: 'Spam in Twitter and IRC to promote it'
    },
    {
        id: 6,
        sort: 6,
        title: 'Item 6',
        text: '???'
    },
    {
        id: 7,
        sort: 7,
        title: 'Item 7',
        text: 'PROFIT'
    }
];

const Container = ({ connectDropTarget }) => {
    const ref = useRef(null);
    const [items, setItems] = useState([...initialList]);

    const moveItem = useCallback(
        (id, atIndex) => {
            const { item, index } = findItem(id);
            if (atIndex === index) return;
            const reOrderedItems = update(items, {
                $splice: [[index, 1], [atIndex, 0, item]]
            }).map((item, i) => ({ ...item, sort: i + 1 }));
            setItems(reOrderedItems);
        },
        [items]
    );

    const findItem = useCallback(
        id => {
            const item = items.find(c => c.id === id);
            return {
                item,
                index: items.indexOf(item)
            };
        },
        [items]
    );

    connectDropTarget(ref);
    return (
        <div ref={ref} style={style}>
            {[...items]
                .sort((a, b) => a.sort - b.sort)
                .map((item, i) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        moveItem={moveItem}
                        index={i}
                    />
                ))}
        </div>
    );
};

export default DropTarget('CARD', {}, connect => ({
    connectDropTarget: connect.dropTarget()
}))(Container);
