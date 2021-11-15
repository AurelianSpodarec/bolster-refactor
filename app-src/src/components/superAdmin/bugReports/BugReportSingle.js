import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchBugReport from './hooks/useFetchBugReport';
import useDeleteBugReport from './hooks/useDeleteBugReport';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import moment from 'moment';
import { FILE_STORAGE_URL, VIDEO_STORAGE_URL } from 'config';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { isVideo } from 'helpers/generic';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { EXPANDED_MEDIA } from 'constants/shared/modalTypes';

const BugReportSingle = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { bugReport, isFetching, error } = useFetchBugReport(id);
    const [handleDeleteBugReport] = useDeleteBugReport();

    return (
        <>
            <PageHeading title="Bug Report" withBackButton />

            <BlockContainer isEmpty={!bugReport} isFetching={isFetching} error={error}>
                <Block>
                    <div className="size-lg-4">
                        <BlockHeading title="Ticket Reference" />
                        <p>{bugReport?.ticketReference || 'No ticket reference'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Company Name" />
                        <p>{bugReport?.companyName || 'No company name'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Created by" />
                        <p>
                            {`${bugReport?.createdByCompanyUserFullname} - (${bugReport?.createdByCompanyUserEmail})` ||
                                'No user'}
                        </p>
                    </div>
                </Block>

                <Block>
                    <div className="size-lg-4">
                        <BlockHeading title="Affected User Count" />
                        <p>{bugReport?.affectedUserCount || 'No users'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Access Credentials" />
                        <p>{bugReport?.accessCredentials || 'No access credentials'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Date Issue Occurred" />
                        <p>{moment(bugReport?.dateIssueOccured).format('DD/MM/YYYY - hh:mm')}</p>
                    </div>
                </Block>

                <Block>
                    <div className="size-lg-4">
                        <BlockHeading title="App Version" />
                        <p>{bugReport?.appVersion || 'N/A'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Device Details" />
                        <p>{bugReport?.deviceDetails || 'N/A'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Issue is replicable" />
                        <p>{bugReport?.isReplicable ? 'Yes' : 'No'}</p>
                    </div>
                </Block>

                <Block>
                    <div className="size-lg-4">
                        <BlockHeading title="Browser Used" />
                        <p>{bugReport?.browserUsed || 'N/A'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="System Page" />
                        <p>{bugReport?.systemPage || 'N/A'}</p>
                    </div>
                    <div className="size-lg-4">
                        <BlockHeading title="Full Description" />
                        <p>{bugReport?.fullDescription || 'N/A'}</p>
                    </div>
                </Block>
                <Block>
                    <div className="size-lg-6">
                        <BlockHeading title="Evidence File" />
                        {bugReport?.evidenceFiles?.map(s3Key =>
                            isVideo(s3Key) ? (
                                <video
                                    controls
                                    preload="auto"
                                    width="100%"
                                    height="auto"
                                    poster={`${VIDEO_STORAGE_URL}/${s3Key}`}
                                    className="size-lg-10"
                                    style={{ maxHeight: '30vh' }}
                                >
                                    <source
                                        src={`${VIDEO_STORAGE_URL}/${s3Key}`}
                                        type="video/mp4"
                                    />
                                </video>
                            ) : (
                                <img
                                    src={`${FILE_STORAGE_URL}/${s3Key}`}
                                    alt="About device"
                                    className="size-lg-6"
                                    style={{
                                        cursor: 'zoom-in',
                                        maxHeight: '30vh',
                                        objectFit: 'contain',
                                    }}
                                    onClick={() =>
                                        dispatch(
                                            showModal(EXPANDED_MEDIA, {
                                                s3Key: s3Key,
                                            }),
                                        )
                                    }
                                />
                            ),
                        )}
                    </div>
                    <div className="size-lg-6">
                        <BlockHeading title="Device Details" />
                        {bugReport?.aboutDeviceScreenshots?.map(s3Key =>
                            isVideo(s3Key) ? (
                                <video
                                    controls
                                    preload="auto"
                                    width="100%"
                                    height="auto"
                                    poster={`${VIDEO_STORAGE_URL}/${s3Key}`}
                                    className="size-lg-10"
                                    style={{ maxHeight: '30vh' }}
                                >
                                    <source
                                        src={`${VIDEO_STORAGE_URL}/${s3Key}`}
                                        type="video/mp4"
                                    />
                                </video>
                            ) : (
                                <img
                                    src={`${FILE_STORAGE_URL}/${s3Key}`}
                                    alt="Evidence"
                                    className="size-lg-6"
                                    style={{
                                        cursor: 'zoom-in',
                                        maxHeight: '30vh',
                                        objectFit: 'contain',
                                    }}
                                    onClick={() =>
                                        dispatch(
                                            showModal(EXPANDED_MEDIA, {
                                                s3Key: s3Key,
                                            }),
                                        )
                                    }
                                />
                            ),
                        )}
                    </div>
                </Block>

                <BlockButtonWrapper>
                    <button
                        className="button red"
                        onClick={() => handleDeleteBugReport(bugReport.id)}
                    >
                        <i className="far fa-trash fa-fw" />
                        Delete
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default BugReportSingle;
