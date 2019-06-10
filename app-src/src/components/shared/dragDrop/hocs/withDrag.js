import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

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

    const specTarget = {
        canDrop: () => false,
        hover(props, monitor) {
            const { index, id } = monitor.getItem();
            const { index: overIndex } = props;
            if (index === overIndex) return;
            props.onMove(id, overIndex);
            monitor.getItem().index = overIndex;
        }
    };
    const collectTarget = connect => ({
        connectDropTarget: connect.dropTarget()
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

    WithDrag = DropTarget(type, specTarget, collectTarget)(
        DragSource(type, specSource, collectSource)(WithDrag)
    );

    return flow(
        DropTarget(type, specTarget, collectTarget),
        DragSource(type, specSource, collectSource)
    )(WithDrag);
}
