import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';

const BlockTable = ({ faqs, isFetching, title, headers, handleDelete }) => {
    return (
        <BlockContainer noDataMessage="There are no FAQs to display">
            <BlockHeading title={title} classes="w-table" />
            <Table headers={headers} noData={!faqs.length} isFetching={isFetching}>
                {faqs.map((faq, index) => (
                    <tr key={faq.id + index}>
                        <td>{faq.title}</td>
                        <td>
                            <BlockButtonWrapper>
                                <Link className="button yellow" to={`/admin/faqs/update/${faq.id}`}>
                                    <i className="fa fa-pencil" />
                                    Edit
                                </Link>
                                <button className="button red" onClick={() => handleDelete(faq.id)}>
                                    <i className="fa fa-trash" />
                                    Delete
                                </button>
                            </BlockButtonWrapper>
                        </td>
                    </tr>
                ))}
            </Table>
        </BlockContainer>
    );
};

export default BlockTable;
