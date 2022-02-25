import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const RecentlyDeletedContainer = ({ manufacturers }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Recently Deleted Manufacturers'} />
        <div className="size-lg-12">
            <Table
                withActions
                headers={['Name', '']}
                noData={!manufacturers.length}
                noDataMessage={'There are no recently deleted manufacturers to display.'}
                withoutTBody
            >
                {manufacturers.map(manufacturer => {
                    <tr>
                        <td>{manufacturer.name}</td>
                        <td>
                            <BlockButtonWrapper>
                                {!manufacturer.isDefault && (
                                    <button className="button yellow">
                                        <i className="far fa-pencil" />
                                        Restore
                                    </button>
                                )}
                            </BlockButtonWrapper>
                        </td>
                    </tr>;
                })}
            </Table>
        </div>
    </ModalOuterContainer>
);

export default RecentlyDeletedContainer;
