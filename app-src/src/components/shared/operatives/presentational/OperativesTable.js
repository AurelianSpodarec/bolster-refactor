import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import OperativesList from './OperativesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const OperativesTable = ({
    location,
    operatives,
    isFetching,
    isAddOperativeDisabled,
    error,
    handleDeleteOperativeModal,
    match
}) => {
    const { id } = match.params;
    return (
        <div className="size-lg-12">
            <BlockHeading title="Operative Access">
                <ButtonContainer
                    className={`pull-right ${
                        isAddOperativeDisabled ? 'disabled' : 'green'
                    }`}
                    to={
                        isAddOperativeDisabled
                            ? `${location.pathname}`
                            : `${location.pathname}/add-operative`
                    }
                >
                    <i className="fa fa-plus" />{' '}
                    {isAddOperativeDisabled ? 'Full' : 'Invite'}
                </ButtonContainer>
            </BlockHeading>
            <div className="hide-overflow size-lg-12">
                <Table
                    headers={['Name', 'Actions']}
                    isFetching={isFetching}
                    error={error}
                    noData={!operatives.length}
                    noDataMessage="No operatives to display."
                    withActions
                    extraClasses="fix-height"
                >
                    <OperativesList
                        operatives={operatives}
                        handleDeleteOperativeModal={handleDeleteOperativeModal}
                        documentID={id}
                    />
                </Table>
            </div>
        </div>
    );
};

export default withRouter(OperativesTable);
