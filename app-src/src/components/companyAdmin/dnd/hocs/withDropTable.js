import React, { useRef, useCallback } from 'react';
import { DropTarget } from 'react-dnd';
import update from 'immutability-helper';

export default function(WrappedComponent) {
    const Container = ({
        connectDropTarget,
        onMove = () => null,
        items,
        ...rest
    }) => {
        const ref = useRef(null);

        const moveItem = useCallback(
            (id, atIndex) => {
                const { item, index } = findItem(id);
                if (atIndex === index) return;
                const reOrderedItems = update(items, {
                    $splice: [[index, 1], [atIndex, 0, item]]
                }).map((item, i) => ({ ...item, sort: i + 1 }));
                onMove(reOrderedItems);
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
            <tbody ref={ref}>
                <WrappedComponent {...rest} items={items} moveItem={moveItem} />
            </tbody>
        );
    };

    return DropTarget('CARD', {}, connect => ({
        connectDropTarget: connect.dropTarget()
    }))(Container);
}
