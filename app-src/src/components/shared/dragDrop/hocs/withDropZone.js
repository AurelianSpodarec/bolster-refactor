import React from 'react';
import { DropTarget } from 'react-dnd';

export default function(WrappedComponent, type = 'CARD') {
    class WithDrop extends React.Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
        }

        render() {
            const { connectDropTarget, isOver, ...rest } = this.props;
            const ref = this.ref;

            connectDropTarget(ref);
            return (
                <WrappedComponent {...rest} forwardRef={ref} isOver={isOver} />
            );
        }
    }

    const collecttarget = (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    });

    return DropTarget(type, {}, collecttarget)(WithDrop);
}
