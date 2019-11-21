import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';

const styles = {
    wrapper: {
        minHeight: '300px',
        width: '300px',
        border: 'solid grey 1px',
        margin: 0
    },
    draggingWrapper: {
        border: 'dashed grey 1px',
        backgroundColor: 'rgba(220,220,220,.7)',
        zIndex: 9999
    }
};

const FileDropBox = props => {
    const { onDrop } = props;
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop(item, monitor) {
            if (onDrop) {
                onDrop(monitor.getItem().files);
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    const isActive = canDrop && isOver;
    let wrapperStyles = styles.wrapper;
    if (isActive) {
        wrapperStyles = {
            ...wrapperStyles,
            ...styles.draggingWrapper
        };
    }

    return (
        <div ref={drop} style={wrapperStyles}>
            {props.children}
        </div>
    );
};
export default FileDropBox;
