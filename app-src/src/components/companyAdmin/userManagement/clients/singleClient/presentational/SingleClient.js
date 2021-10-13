import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import React from 'react';
import SingleClientPermissionItem from './SingleClientPermissionItem';

const SingleClient = ({ user, permissions, permissionsHeaders, isFetching, error }) => (
    <>
        <PageHeading
            withBackButton
            title={`Client: ${user?.firstName || ''} ${user?.lastName || ''}`}
        />
        <div className="size-lg-12">
            <BlockContainer heading="Client Info" isFetching={isFetching} isEmpty={!user}>
                <div className="size-lg-6">
                    <FieldOutput
                        title="Name"
                        description={`${user?.firstName} ${user?.lastName}`}
                    />
                    <FieldOutput title="Email" description={user?.email} />
                </div>
                <div className="size-lg-6">
                    <FieldOutput title="Company Name" description={user?.companyName} />
                    <FieldOutput title="Phone Number" description={user?.phoneNumber} />
                </div>
                <div className="size-lg-6">
                    <FieldOutput title="Created">
                        <p>
                            <DateTimeContainer date={user?.createdOn} />
                        </p>
                    </FieldOutput>
                </div>
                <div className="size-lg-6">
                    <FieldOutput title="Last Login">
                        <p>
                            {user?.lastLoginOn ? (
                                <DateTimeContainer date={user?.lastLoginOn} />
                            ) : (
                                'N/A'
                            )}
                        </p>
                    </FieldOutput>
                    <FieldOutput title="Last Report Created On">
                        <p>
                            {user?.lastReportCreatedOn ? (
                                <DateTimeContainer date={user?.lastReportCreatedON} />
                            ) : (
                                'N/A'
                            )}
                        </p>
                    </FieldOutput>
                </div>
            </BlockContainer>
        </div>
        <div className="size-lg-12">
            <BlockContainer
                heading="Client Permissions"
                isFetching={isFetching}
                isEmpty={!permissions.length}
            >
                <Table
                    withActions
                    isFetching={isFetching}
                    error={error}
                    noData={!permissions.length}
                    noDataMessage="No permissions to display."
                    headers={permissionsHeaders}
                >
                    {permissions.map(permission => (
                        <SingleClientPermissionItem
                            key={permission.id}
                            permission={permission}
                            user={user}
                        />
                    ))}
                </Table>
            </BlockContainer>
        </div>
    </>
);

export default SingleClient;
