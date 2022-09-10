import React from 'react';
import { FILE_STORAGE_URL, VIDEO_STORAGE_URL } from 'config';
import { isVideo } from 'helpers/generic';
import ModalOuterContainer from './ModalOuterContainer';

const ExpandedMediaModal = ({ s3Key }) => {
    return (
        <ModalOuterContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isVideo(s3Key) ? (
                    <video
                        controls
                        preload="auto"
                        style={{
                            padding: '1em',
                            maxHeight: '80vh',
                        }}
                        poster={`${VIDEO_STORAGE_URL}/${s3Key}`}
                    >
                        <source src={`${VIDEO_STORAGE_URL}/${s3Key}`} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src={`${FILE_STORAGE_URL}/${s3Key}`}
                        alt="Evidence"
                        style={{
                            padding: '1em',
                            maxHeight: '80vh',
                        }}
                    />
                )}
            </div>
        </ModalOuterContainer>
    );
};

export default ExpandedMediaModal;
