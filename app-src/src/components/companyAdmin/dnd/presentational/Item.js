import React, { useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
const style = {
    cursor: 'move'
};

const Item = ({ text, isDragging, connectDragSource, connectDropTarget }) => {
    const opacity = isDragging ? 0 : 1;
    const ref = useRef(null);
    connectDragSource(ref);
    connectDropTarget(ref);
    return (
        <tr ref={ref} style={Object.assign({}, style, { opacity })}>
            <td>{text}</td>
            <td />
        </tr>
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

export default DropTarget('CARD', dropZoneTarget, dropZoneCollect)(
    DragSource('CARD', dragItemTarget, dragItemCollect)(Item)
);
