import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const headers = ['Name', 'Version', ''];

const AllLegalDocumentsTable = ({ documents, isFetching }) => (
    <>
        <PageHeading title="Legal Documents" />
        <BlockContainer>
            <Table headers={headers} noData={!documents.length} isFetching={isFetching}>
                {documents.map(doc => (
                    <tr key={doc.id}>
                        <td>{doc.name}</td>
                        <td>{doc.version}</td>
                        <td>
                            <BlockButtonWrapper>
                                <ButtonContainer to={`/admin/legal-documents/update/${doc.id}`}>
                                    Add new version
                                </ButtonContainer>
                            </BlockButtonWrapper>
                        </td>
                    </tr>
                ))}
            </Table>
        </BlockContainer>
    </>
);

export default AllLegalDocumentsTable;
