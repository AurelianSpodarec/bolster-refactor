import React from 'react';
import { DropTarget } from 'react-dnd';
import update from 'immutability-helper';

export default function(WrappedComponent, type = 'CARD') {
    const WithDrop = ({
        connectDropTarget,
        onMove = () => null,
        items,
        ...rest
    }) => {
        const ref = React.createRef();

        const moveItem = (originalIndex, atIndex) => {
            const item = items[originalIndex];
            if (atIndex === originalIndex) return;
            console.log(originalIndex, atIndex);
            console.log(item);
            // if (atIndex + 1 === item.sort) return;
            const reOrderedItems = update(items, {
                $splice: [[originalIndex, 1], [atIndex, 0, item]]
            }).map((item, i) => ({ ...item, sort: i + 1 }));
            onMove(reOrderedItems);
        };

        connectDropTarget(ref);
        return (
            <WrappedComponent
                {...rest}
                items={[...items].sort((a, b) => a.sort - b.sort)}
                moveItem={moveItem}
                forwardRef={ref}
            />
        );
    };

    return DropTarget(type, {}, connect => ({
        connectDropTarget: connect.dropTarget()
    }))(WithDrop);
}
