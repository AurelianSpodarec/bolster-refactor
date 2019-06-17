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
    match,
    smallList = false
}) => {
    const { id } = match.params;
    return (
        <div className="size-lg-12">
            <BlockHeading title="Attach Operative">
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
                    {isAddOperativeDisabled ? 'Full' : 'Attach'}
                </ButtonContainer>
            </BlockHeading>
            <div
                className={`size-lg-12 ignore-padding ${
                    smallList && operatives.length > 3 ? 'scrollbar-y' : ''
                }`}
            >
                <Table
                    headers={['Name', 'Actions']}
                    isFetching={isFetching}
                    error={error}
                    noData={!operatives.length}
                    noDataMessage="No operatives to display."
                    withActions
                    extraClasses="with-scrollbar"
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
