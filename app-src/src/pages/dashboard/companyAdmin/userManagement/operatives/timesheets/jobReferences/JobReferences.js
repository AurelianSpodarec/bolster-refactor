import React from 'react';
import { useSelector } from 'react-redux';

import { selectCompanySettingsIsFetching } from 'selectors/companyAdmin/companySettings';

import { isEmpty } from 'helpers/generic';

import useFetchJobReferences from './hooks/useFetchJobReferences';
import useJobReferenceActions from './hooks/useJobReferenceActions';

import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import Block from 'components_DEPRECATED/shared/generic/block/presentational/Block';
import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import Loading from 'components_DEPRECATED/shared/generic/misc/presentational/Loading';
import JobReferenceTableItem from './JobReferenceTableItem';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const headers = ['Name', 'Description', ''];

const JobReferences = () => {
    const { jobReferences, isFetching, fetchError } = useFetchJobReferences();
    const isFetchingCompanySettings = useSelector(selectCompanySettingsIsFetching);

    const {
        handleCreateJobReference,
        handleEditJobReference,
        handleEnableJobReference,
        handleDisableJobReference,
    } = useJobReferenceActions();

    const sortedJobReferences = Object.values(jobReferences).sort((a, b) =>
        a.name.localeCompare(b.name),
    );

    if (isFetchingCompanySettings) {
        return (
            <Block>
                <Loading />
            </Block>
        );
    }

    return (
        <Block>
            <BlockHeading title="Job References">
                <ActionButton
                    text="Create"
                    ambient="positive"
                    size="medium"
                    icon="plus"
                    onClick={handleCreateJobReference}
                />
            </BlockHeading>

            <Table
                noData={isEmpty(jobReferences)}
                isFetching={isFetching}
                error={fetchError}
                headers={headers}
                noDataMessage="There is no job references to display"
                withActions
            >
                {sortedJobReferences.map(jobReference => (
                    <JobReferenceTableItem
                        key={jobReference.id}
                        jobReference={jobReference}
                        handleEditJobReference={handleEditJobReference}
                        handleEnableJobReference={handleEnableJobReference}
                        handleDisableJobReference={handleDisableJobReference}
                    />
                ))}
            </Table>
        </Block>
    );
};

export default JobReferences;
