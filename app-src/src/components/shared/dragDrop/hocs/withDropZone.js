import React from 'react';
import { DropTarget } from 'react-dnd';

export default function(WrappedComponent, type = 'CARD') {
    const WithDrop = ({ connectDropTarget, ...rest }) => {
        const ref = React.createRef();
        connectDropTarget(ref);
        return <WrappedComponent {...rest} forwardRef={ref} />;
    };

    const collecttarget = (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    });

    return DropTarget(type, {}, collecttarget)(WithDrop);
}
