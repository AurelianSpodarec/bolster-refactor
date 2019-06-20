import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

export default function(WrappedComponent, type = 'CARD') {
    class WithDrag extends React.Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
        }

        render() {
            const {
                isDragging,
                connectDragSource,
                connectDropTarget,
                ...rest
            } = this.props;
            const ref = this.ref;
            connectDragSource(ref);
            connectDropTarget(ref);

            return (
                <WrappedComponent
                    forwardRef={ref}
                    {...rest}
                    isDragging={isDragging}
                />
            );
        }
    }

    const specTarget = {
        canDrop: () => false,
        hover(props, monitor) {
            const { index: dragIndex, id } = monitor.getItem();
            const { index: overIndex } = props;
            if (dragIndex === overIndex) return;

            props.onMove(id, overIndex);
            monitor.getItem().index = overIndex;
        }
    };
    const collectTarget = (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    });

    const specSource = {
        beginDrag: props => ({
            id: props.id,
            originalIndex: props.index,
            index: props.index
        }),
        endDrag({ onMove, onDrop }, monitor) {
            const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                onMove(droppedId, originalIndex);
                return;
            }

            onDrop();
        }
    };
    const collectSource = (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    });

    return flow(
        DropTarget(type, specTarget, collectTarget),
        DragSource(type, specSource, collectSource)
    )(WithDrag);
}
