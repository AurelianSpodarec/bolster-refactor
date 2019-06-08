import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

export default function(WrappedComponent, type = 'CARD') {
    let WithDrag = ({
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
            const { index } = monitor.getItem();
            const { index: overIndex } = props;
            if (index === overIndex) return;
            props.moveItem(index, overIndex);
            monitor.getItem().index = overIndex;
        }
    };

    const dropZoneCollect = connect => ({
        connectDropTarget: connect.dropTarget()
    });

    const dragItemTarget = {
        beginDrag: props => ({
            id: props.id,
            originalIndex: props.index,
            index: props.index
        }),
        endDrag(props, monitor) {
            // const { id: droppedId, originalIndex } = monitor.getItem();
            // const didDrop = monitor.didDrop();
            // if (!didDrop) {
            //     props.moveItem(droppedId, originalIndex);
            // }
        }
    };

    const dragItemCollect = (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    });

    WithDrag = DropTarget(type, dropZoneTarget, dropZoneCollect)(
        DragSource(type, dragItemTarget, dragItemCollect)(WithDrag)
    );

    return WithDrag;
}
