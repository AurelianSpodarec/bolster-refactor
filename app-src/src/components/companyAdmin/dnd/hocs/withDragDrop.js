import React from 'react';
import { DragSource } from 'react-dnd';

export default function(WrappedComponent, dragType = 'CARD') {
    function WithDragDrop(props) {
        const { isDragging, text, dragSource } = props;

        return <WrappedComponent {...props} dragSource={dragSource} />;
    }

    const cardSource = {
        beginDrag: props => ({ text: props.text })
    };

    function collect(connect, monitor) {
        return {
            dragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
    }

    return DragSource(dragType, cardSource, collect)(WithDragDrop);
}
