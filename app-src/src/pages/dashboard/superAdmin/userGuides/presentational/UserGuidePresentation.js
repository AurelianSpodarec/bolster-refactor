import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { RAW_S3_STORAGE_URL } from 'config';

const UserGuidesPresentational = ({
    showUploadUserGuideModal,
    userGuideLink = '',
    isFetching,
    error,
    versions,
}) => (
    <>
        <PageHeading title="User Guides" />
        <Block>
            <BlockHeading title="Current Guide">
                <button
                    className="button green"
                    onClick={() => showUploadUserGuideModal()}
                    style={{ zIndex: 10 }}
                >
                    <i className="fa fa-plus"></i> Upload new user guide
                </button>
            </BlockHeading>
            {!isFetching && !error && (
                <>
                    <p className="generic-text intro-text">
                        Set the user guide for company admins, download the current user guide{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="red"
                            href={userGuideLink}
                        >
                            here
                        </a>
                        .
                    </p>

                    <Table headers={['Date Uploaded', 'Link']} withActions>
                        {versions.map(version => (
                            <tr key={version.id}>
                                <td>
                                    <DateTimeContainer date={version.createdOn} />
                                </td>
                                <td>
                                    <ButtonContainer
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="blue"
                                        isAnchor
                                        to={`${RAW_S3_STORAGE_URL}/${version.s3Key}`}
                                    >
                                        File
                                    </ButtonContainer>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </>
            )}
        </Block>
    </>
);

export default UserGuidesPresentational;
