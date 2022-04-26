import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from 'config';
import { DATE_TIME } from 'constants/shared/dateFormats';
import { DOCUMENT_VIEW } from 'constants/shared/modalTypes';
import { DOCUMENT_VIEW_TYPES } from 'constants/companyAdmin/enums';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import ActionMenu from '../actionMenu/ActionMenu';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';

const { IMAGE, PDF } = DOCUMENT_VIEW_TYPES;

const DocumentPod = ({ name, lastUpdated, actionMenuItems, s3Key }) => {
    const dispatch = useDispatch();

    const showViewModal = () => {
        dispatch(
            showModal(DOCUMENT_VIEW, {
                image: `${RAW_S3_STORAGE_URL}/${s3Key}`,
                type: s3Key.endsWith('.pdf') ? PDF : IMAGE,
            }),
        );
    };

    return (
        <button className="document-pod" onClick={showViewModal}>
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
        </button>
    );
};

export default DocumentPod;
