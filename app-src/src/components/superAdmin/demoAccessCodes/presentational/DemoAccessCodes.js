import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_DEMO_ACCESS_CODES, DELETE_DEMO_ACCESS_CODES } from 'constants/shared/modalTypes';
import { useDispatch } from 'react-redux';

const headers = ['Email', 'Company Name', 'Access Code', 'Last Viewed On', 'Total Views', ''];

const DemoAccessCodes = ({ accessCodes, isFetching }) => {
    const dispatch = useDispatch();
    const handleNewModal = () => {
        dispatch(showModal(ADD_DEMO_ACCESS_CODES));
    };

    const handleDeleteModal = (item, disable) => {
        dispatch(showModal(DELETE_DEMO_ACCESS_CODES, { item, disable }));
    };

    return (
        <>
            <PageHeading title="Demo Access Codes" />
            <BlockContainer>
                <BlockHeading title="Access Codes" classes="w-table">
                    <button onClick={handleNewModal} className="button green">
                        <i className="fa fa-plus" /> New Access Codes
                    </button>
                </BlockHeading>
                <Table headers={headers} noData={!accessCodes.length} isFetching={isFetching}>
                    {accessCodes.map(item => {
                        const disable = item.totalViews > 0;
                        const isDisabled = item.isDisabled;
                        return (
                            <tr key={item.id}>
                                <td>{item.email}</td>
                                <td>{item.companyName}</td>
                                <td>{item.accessCode}</td>
                                <td>{item.lastViewedAt}</td>
                                <td>{item.totalViews}</td>
                                <td>
                                    <BlockButtonWrapper>
                                        {/* <button
                                    onClick={() => handleEditModal(item)}
                                    className="button yellow"
                                >
                                    <i className="far fa-pencil" />
                                    Edit
                                </button> */}
                                        {disable && (
                                            <button
                                                onClick={() => handleDeleteModal(item, disable)}
                                                className={`button ${
                                                    !isDisabled ? 'red' : 'green'
                                                }`}
                                            >
                                                <i
                                                    className={`far fa-${
                                                        !isDisabled ? 'eye-slash' : 'eye'
                                                    }`}
                                                />
                                                {!isDisabled ? 'Disable' : 'Enable'}
                                            </button>
                                        )}
                                        {!disable && (
                                            <button
                                                onClick={() => handleDeleteModal(item, disable)}
                                                className="button red"
                                            >
                                                <i className={'far fa-trash'} />
                                                Delete
                                            </button>
                                        )}
                                    </BlockButtonWrapper>
                                </td>
                            </tr>
                        );
                    })}
                </Table>
            </BlockContainer>
        </>
    );
};

export default DemoAccessCodes;
