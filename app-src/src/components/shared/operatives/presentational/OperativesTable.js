import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import OperativesList from './OperativesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const OperativesTable = ({
    location,
    operatives,
    isFetching,
    isAddOperativeDisabled,
    error,
    handleDeleteOperativeModal,
    match,
    smallList = false,
}) => {
    const { id } = match.params;
    return (
        <div className="size-lg-12">
            <BlockHeading title="Attach Operative">
                <ButtonWrapper alignment="right">
                    <LinkButton
                        disabled={isAddOperativeDisabled}
                        href={
                            isAddOperativeDisabled
                                ? `${location.pathname}`
                                : `${location.pathname}/add-operative`
                        }
                        icon="plus"
                        ambient="positive"
                        text={isAddOperativeDisabled ? 'Full' : 'Attach'}
                    />
                </ButtonWrapper>
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
