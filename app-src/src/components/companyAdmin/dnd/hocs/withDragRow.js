import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

// const ref = React.createRef();

export default function(WrappedComponent) {
    let Item = ({
        isDragging,
        connectDragSource,
        connectDropTarget,
        ...rest
    }) => {
        const ref = React.createRef();
        connectDragSource(ref);
        connectDropTarget(ref);

        return (
            <WrappedComponent
                forwardRef={ref}
                {...rest}
                isDragging={isDragging}
            />
        );
    };

    const dropZoneTarget = {
        canDrop: () => false,
        hover(props, monitor) {
            const { originalIndex, id } = monitor.getItem();
            const { index: overIndex } = props;
            if (originalIndex !== overIndex) {
                props.moveItem(id, overIndex);
            }
        }
    };

    const dropZoneCollect = connect => ({
        connectDropTarget: connect.dropTarget()
    });

    const dragItemTarget = {
        beginDrag: props => ({
            id: props.id,
            originalIndex: props.index
        }),
        endDrag(props, monitor) {
            const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                props.moveItem(droppedId, originalIndex);
            }
        }
    };

    const dragItemCollect = (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    });

    Item = DropTarget('CARD', dropZoneTarget, dropZoneCollect)(
        DragSource('CARD', dragItemTarget, dragItemCollect)(Item)
    );

    // eslint-disable-next-line react/display-name
    return Item;
}
