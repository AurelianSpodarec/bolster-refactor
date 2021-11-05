import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

const styles = {
    wrapper: {
        margin: 0,
    },
    draggingWrapper: {
        zIndex: 9999,
    },
};

const FileDropBox = ({
    onDrop,
    onAddFileClick,
    displayDocLib,
    onSelectFromDocLibClick,
    children,
}) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop(item, monitor) {
            if (onDrop) {
                onDrop(monitor.getItem().files);
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    let wrapperStyles = styles.wrapper;
    if (isActive) {
        wrapperStyles = {
            ...wrapperStyles,
            ...styles.draggingWrapper,
        };
    }

    return (
        <div
            ref={drop}
            style={wrapperStyles}
            className={`file-drop-container ${canDrop && 'can-drop'} ${
                isOver && 'file-over'
            } size-lg-12`}
        >
            <p className="size-lg-12">
                Drag & Drop your files{displayDocLib ? ',' : ' or '}
                <button className="button upload blue" type="button" onClick={onAddFileClick}>
                    Browse
                </button>
                {displayDocLib && (
                    <>
                        {' or '}
                        <button
                            className="button upload blue"
                            type="button"
                            onClick={e => {
                                onSelectFromDocLibClick(e);
                            }}
                        >
                            Select
                        </button>
                        {' from Document Library'}
                    </>
                )}
            </p>

            {children}
        </div>
    );
};
export default FileDropBox;
