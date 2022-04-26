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

const removePDFPanels = '#toolbar=0&navpanes=0&scrollbar=0';

const DocumentPod = ({ name, lastUpdated, actionMenuItems, s3Key }) => {
    const dispatch = useDispatch();

    const isPDF = s3Key.endsWith('.pdf');

    const showViewModal = () => {
        dispatch(
            showModal(DOCUMENT_VIEW, {
                image: `${RAW_S3_STORAGE_URL}/${s3Key}${isPDF ? removePDFPanels : '?width=1500'}`,
                type: isPDF ? PDF : IMAGE,
            }),
        );
    };

    return (
        <div className="document-pod">
            <button className="open-document-button" onClick={showViewModal} />

            {isPDF ? (
                <iframe
                    className="pdf-preview"
                    src={`${RAW_S3_STORAGE_URL}/${s3Key}${removePDFPanels}`}
                    type="application/pdf"
                    scrolling="no"
                />
            ) : (
                <div className="image-wrapper">
                    <img alt="Document preview" src={`${FILE_STORAGE_URL}/${s3Key}?width=500`} />
                </div>
            )}

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
