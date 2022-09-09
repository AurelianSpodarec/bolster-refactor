import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Table from 'components/shared/generic/tables/presentational/Table';
import moment from 'moment';

const DocumentsTable = ({ documents, isFetching, error, deleteButton }) => {
    return (
        <Table
            withActions
            headers={['Name', 'Uploaded On', 'Actions']}
            isFetching={isFetching}
            error={error}
            noData={!documents.length}
            noDataMessage="No documents to display."
        >
            {documents.map(document => {
                return (
                    <tr key={document.id}>
                        <td>{document.friendlyName}</td>
                        <td>{moment(document.uploadedOn).format('DD/MM/YYYY h:mm a')}</td>
                        <td>
                            <BlockButtonWrapper>
                                <button
                                    className="button red"
                                    onClick={() => deleteButton(document.id)}
                                >
                                    <i className="fa fa-trash" />
                                    Delete
                                </button>
                            </BlockButtonWrapper>
                        </td>
                    </tr>
                );
            })}
        </Table>
    );
};

export default DocumentsTable;
