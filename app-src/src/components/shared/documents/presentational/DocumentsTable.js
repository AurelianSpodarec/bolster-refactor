import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const DocumentsTable = ({
    location,
    documents,
    isFetching,
    clientControls = false,
    accessType,
    smallList = false
}) => {
    return (
        <div className="size-lg-12">
            <BlockHeading title="Documents" classes="w-table">
                {!clientControls && accessType >= ACCESS_TYPES_VALUES.WRITE && (
                    <ButtonContainer
                        className="pull-right green"
                        to={`${location.pathname}/attach-document`}
                    >
                        <i className="fa fa-plus" /> Add
                    </ButtonContainer>
                )}
            </BlockHeading>
            <div
                className={`size-lg-12 ignore-padding ${
                    smallList && documents.length > 3 ? 'scrollbar-y' : ''
                } ${
                    !smallList && documents.length > 4
                        ? 'scrollbar-y large'
                        : ''
                }`}
            >
                <Table
                    headers={['Name', 'Actions']}
                    isFetching={isFetching}
                    noData={!documents.length}
                    noDataMessage="No documents to display."
                    withActions
                    extraClasses={'with-scrollbar'}
                >
                    <DocumentsList
                        accessType={accessType}
                        location={location}
                        documents={documents}
                        clientControls={clientControls}
                    />
                </Table>
            </div>
        </div>
    );
};

export default withRouter(DocumentsTable);
