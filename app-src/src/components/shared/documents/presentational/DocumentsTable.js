import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DocumentsTable = ({ location, documents, isFetching }) => {
    return (
        <div className="size-lg-12">
            <BlockHeading title="Documents" classes="w-table">
                <ButtonContainer
                    className="pull-right green"
                    to={`${location.pathname}/attach-document`}
                >
                    <i className="fa fa-plus" /> Add
                </ButtonContainer>
            </BlockHeading>
            <div className="table-container size-lg-12">
                <Table
                    headers={['Name', 'Actions']}
                    isFetching={isFetching}
                    noData={!documents.length}
                    noDataMessage="No documents to display."
                    withActions
                >
                    <DocumentsList location={location} documents={documents} />
                </Table>
            </div>
        </div>
    );
};

export default withRouter(DocumentsTable);
