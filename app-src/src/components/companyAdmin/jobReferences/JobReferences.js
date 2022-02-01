import React from 'react';
import { useDispatch } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import { CREATE_JOB_REFERENCE } from 'constants/shared/modalTypes';
import { isEmpty } from 'helpers/generic';

import useFetchJobReferences from './hooks/useFetchJobReferences';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import JobReferenceTableItem from './JobReferenceTableItem';

const headers = ['Name', 'Description', ''];

const JobReferences = () => {
    const dispatch = useDispatch();
    const { jobReferences, isFetching, fetchError } = useFetchJobReferences();

    const sortedJobReferences = Object.values(jobReferences).sort((a, b) =>
        a.name.localeCompare(b.name),
    );

    return (
        <>
            <PageHeading title="Job References" withBackButton />
            <Block>
                <BlockHeading title="Job References">
                    <button
                        className="button green"
                        onClick={() => dispatch(showModal(CREATE_JOB_REFERENCE))}
                    >
                        <i className="fa fa-plus" /> Create
                    </button>
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
                        <JobReferenceTableItem key={jobReference.id} jobReference={jobReference} />
                    ))}
                </Table>
            </Block>
        </>
    );
};

export default JobReferences;
