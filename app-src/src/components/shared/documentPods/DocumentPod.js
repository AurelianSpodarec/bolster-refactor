import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import { DATE_TIME } from 'constants/shared/dateFormats';
import ActionMenu from '../actionMenu/ActionMenu';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';
import { FILE_STORAGE_URL } from 'config';

const DocumentPod = ({ name, lastUpdated, actionMenuItems, s3Key, pinOptionDocumentID }) => {
    const location = useLocation();
    return (
        <a className="document-pod" href={`${location.pathname}/${pinOptionDocumentID}`}>
            <div className="image-wrapper">
                <img alt="Document preview" src={`${FILE_STORAGE_URL}/${s3Key}`} />
            </div>

            <FlexWrapper direction="row" justify="between" extraClasses="info-wrapper">
                <div className="text">
                    <p className="title">{name}</p>
                    <p className="last-updated">Updated {moment(lastUpdated).format(DATE_TIME)}</p>
                </div>

                {!!actionMenuItems && <ActionMenu>{actionMenuItems}</ActionMenu>}
            </FlexWrapper>
        </a>
    );
};

export default DocumentPod;
