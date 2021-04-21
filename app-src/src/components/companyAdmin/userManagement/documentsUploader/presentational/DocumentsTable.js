import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Table from 'components/shared/generic/tables/presentational/Table';

const DocumentsTable = ({ documents, isFetching, error, deleteButton }) => {
    return (
        <Table
            withActions
            headers={['Name', 'Actions']}
            isFetching={isFetching}
            error={error}
            noData={!documents.length}
            noDataMessage="No documents to display."
        >
            {documents.map(document => {
                return (
                    <tr key={document.id}>
                        <td>{document.Name}</td>
                        <td>
                            <BlockButtonWrapper>
                                <button
                                    className="button red"
                                    onClick={() => deleteButton(document.Id)}
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
