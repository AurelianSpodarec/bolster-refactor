import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import { LEGAL_DOCUMENT_TYPE } from 'constants/superAdmin/enums';

const BlockTable = ({ documents, isFetching, createDocument, title, headers }) => {
    return (
        <BlockContainer>
            <BlockHeading title={title} classes="w-table">
                <button onClick={createDocument} className="button green">
                    <i className="fa fa-plus" /> New Document
                </button>
            </BlockHeading>
            <Table headers={headers} noData={!documents.length} isFetching={isFetching}>
                {orderBy(documents, doc => [get(doc, 'type'), get(doc, 'publishedOn')], [
                    'desc',
                    'desc',
                ]).map((doc, index) => (
                    <tr
                        key={doc.id}
                        className={`${index === 0 && doc.publishedOn ? 'latest' : ''}`}
                    >
                        <td>{doc.title}</td>
                        <td>{doc.publishedOn ? 'Published' : 'Draft'}</td>
                        <td>{LEGAL_DOCUMENT_TYPE[doc.type]}</td>
                        <td>
                            {doc.publishedOn
                                ? moment(doc.publishedOn).format('LLL')
                                : 'Not Published'}
                        </td>
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
    );
};

export default BlockTable;
