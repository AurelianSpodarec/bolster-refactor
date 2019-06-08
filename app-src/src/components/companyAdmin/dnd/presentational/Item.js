import React, { useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const Item = ({ text, isDragging, connectDragSource, connectDropTarget }) => {
    const opacity = isDragging ? 0 : 1;
    const ref = useRef(null);
    connectDragSource(ref);
    connectDropTarget(ref);
    return (
        <div ref={ref} style={Object.assign({}, style, { opacity })}>
            {text}
        </div>
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
