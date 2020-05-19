import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    DATE_TIME_IDS,
    DATE_TIME_DEFAULTS,
    DOCUMENT_VIEW_TYPES,
} from 'constants/companyAdmin/enums';
import { FILE_STORAGE_URL } from 'config';
import { DOCUMENT_VIEW } from 'constants/shared/modalTypes';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { RAW_S3_STORAGE_URL } from 'config';

const DocumentVersionsList = ({
    versions,
    dispatch,
    handleDeleteDocumentVersionModal,
    isReadOnly,
}) => (
    <div>
        {versions
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((version, i) => (
                <div key={version.id} className="flex-row size-lg-12">
                    <FieldOutput
                        title={'Date Created'}
                        description={moment(version.createdAt).format(
                            DATE_TIME_DEFAULTS[DATE_TIME_IDS.DATETIME],
                        )}
                        sizeClass={'flex-row-item size-lg-4'}
                    />
                    <FieldOutput title={'Document Preview'} sizeClass={'flex-row-item size-lg-6'}>
                        {version.fileS3Key.endsWith('.pdf') ? (
                            <div className="preview-wrapper">
                                <embed
                                    src={`${RAW_S3_STORAGE_URL}/${version.fileS3Key}#toolbar=0&navpanes=0&scrollbar=0`}
                                    type="application/pdf"
                                    className="document-version-preview pdf-preview"
                                />{' '}
                                <div
                                    className={'preview-click-div'}
                                    onClick={() =>
                                        dispatch(
                                            showModal(DOCUMENT_VIEW, {
                                                image: `${RAW_S3_STORAGE_URL}/${version.fileS3Key}#toolbar=0&navpanes=0&scrollbar=0`,
                                                type: DOCUMENT_VIEW_TYPES.PDF,
                                            }),
                                        )
                                    }
                                ></div>
                            </div>
                        ) : (
                            <img
                                src={`${FILE_STORAGE_URL}/${version.fileS3Key}?width=500`}
                                alt="preview of the upload"
                                onClick={() =>
                                    dispatch(
                                        showModal(DOCUMENT_VIEW, {
                                            image: `${FILE_STORAGE_URL}/${version.fileS3Key}?width=1500`,
                                            type: DOCUMENT_VIEW_TYPES.IMAGE,
                                        }),
                                    )
                                }
                                className="document-version-preview image-preview"
                            />
                        )}
                    </FieldOutput>

                    <div className={'flex-row-item size-lg-2'}>
                        {!version.hasBeenUsed && !isReadOnly && (
                            <button
                                className={'button red'}
                                onClick={() => handleDeleteDocumentVersionModal(version)}
                            >
                                <i className={'far fa-trash'} />
                                {'Delete Version'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
    </div>
);

export default DocumentVersionsList;
