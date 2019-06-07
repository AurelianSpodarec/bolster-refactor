import React from 'react';
import { DropTarget } from 'react-dnd';

export default function(WrappedComponent, dragType = 'CARD') {
    function WithDropZone(props) {
        const { connectDropTarget } = props;

        return connectDropTarget(
            <div>
                <WrappedComponent {...props} />
            </div>
        );
    }

    const dropTarget = {
        drop: () => {
            console.log('drop');
        }
    };

    function collect(connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        };
    }

    return DropTarget(dragType, dropTarget, collect)(WithDropZone);
}
