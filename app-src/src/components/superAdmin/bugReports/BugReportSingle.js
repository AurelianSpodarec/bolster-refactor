import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBugReport from './hooks/useFetchBugReport';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import moment from 'moment';
import { FILE_STORAGE_URL } from 'config';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const BugReportSingle = () => {
    const { id } = useParams();

    const { bugReport, isFetching, error } = useFetchBugReport(id);
    console.log(bugReport);
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
                        <p>{bugReport?.createdByCompanyUserName || 'No user'}</p>
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
                        <BlockHeading title="Device Details" />
                        <img
                            alt="About Device"
                            src={`${FILE_STORAGE_URL}/${bugReport?.aboutDeviceScreenshotS3Key}`}
                        />
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
                    <div className="size-lg-4">
                        <BlockHeading title="Evidence File" />
                        <img
                            alt="Evidence file"
                            src={`${FILE_STORAGE_URL}/${bugReport?.evidenceFileS3Key}`}
                        />
                    </div>
                </Block>

                <BlockButtonWrapper>
                    <button className="button red">
                        <i className="fa fa-trash fa-fw" />
                        Delete
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default BugReportSingle;
