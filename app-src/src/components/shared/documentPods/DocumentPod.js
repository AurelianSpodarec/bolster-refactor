import React from 'react';
import moment from 'moment';

import { DATE_TIME } from 'constants/shared/dateFormats';
import ActionMenu from '../actionMenu/ActionMenu';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';
import { FILE_STORAGE_URL } from 'config';

const DocumentPod = ({ name, lastUpdated, actionMenuItems, s3Key, showViewModal }) => {
    return (
        <div className="document-pod">
            <div className="image-wrapper">
                <button onClick={showViewModal}>
                    <img alt="Document preview" src={`${FILE_STORAGE_URL}/${s3Key}`} />
                </button>
            </div>

            <FlexWrapper direction="row" justify="between" extraClasses="info-wrapper">
                <div className="text">
                    <p className="title">{name}</p>
                    <p className="last-updated">Updated {moment(lastUpdated).format(DATE_TIME)}</p>
                </div>

                {!!actionMenuItems && <ActionMenu>{actionMenuItems}</ActionMenu>}
            </FlexWrapper>
        </div>
    );
};

export default DocumentPod;
