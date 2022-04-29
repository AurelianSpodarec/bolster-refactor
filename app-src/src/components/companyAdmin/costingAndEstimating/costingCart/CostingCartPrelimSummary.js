import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import CostingCartPrelimSummaryItem from './CostingCartPrelimSummaryItem';
import { dummyPrelims } from '../dummyData';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    ADD_COSTING_AND_ESTIMATING_PRELIM_MODAL,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL,
} from 'constants/shared/modalTypes';

const CostingCartPrelimSummary = ({ title, total, prelimIDs, customPrelims }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    const dataToShow = [...prelimIDs.map(id => dummyPrelims[id]), ...customPrelims];

    const showExistingPrelimModal = () => {
        // dispatch(showModal(ADD_COSTING_AND_ESTIMATING_PRELIM_MODAL));
    };

    const showAddCustomPrelimModal = () => {
        dispatch(showModal(CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL));
    };

    return (
        <div className="summary-item">
            <FlexWrapper direction="row" justify="between" align="center">
                <h4>{title}</h4>
                <div>
                    <AccordionButton
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </FlexWrapper>
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                {dataToShow.map((prelim, i) => (
                    <CostingCartPrelimSummaryItem key={i} prelim={prelim} />
                ))}
                <ButtonWrapper alignment="right">
                    <ActionButton
                        extraClasses="margin-top"
                        text="Add existing prelim"
                        size="small"
                        onClick={showExistingPrelimModal}
                    />
                    <ActionButton
                        extraClasses="margin-top"
                        text="Create prelim"
                        icon="plus"
                        size="small"
                        onClick={showAddCustomPrelimModal}
                    />
                </ButtonWrapper>

                <div className="divider" />
            </div>
            <div className="total">
                <h3>{`£${formatCurrency(total)}`}</h3>
            </div>
            <div className="divider" />
        </div>
    );
};

export default CostingCartPrelimSummary;
