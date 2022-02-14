import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import { getOperativesIsFetching } from 'selectors/companyAdmin/operatives';

import OperativesFilter from '../presentational/OperativesFilter';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class OperativesFilterContainer extends Component {
    state = { hasSetOp: false, hasModalShown: false };

    render() {
        const {
            formatArrForDropdown,
            customFilters: { operatives },
            filters: { companyUserIDs, createdByCompanyID },
            sizeClasses,
            isDrawingPage,
            isFetchingOperatives,
        } = this.props;
        const operativeOptions = formatArrForDropdown(
            operatives.filter(op => !createdByCompanyID || op.companyID === createdByCompanyID),
        );
        return (
            <OperativesFilter
                operativeOptions={operativeOptions}
                selectedOperatives={companyUserIDs}
                handleChange={this.handleChange}
                sizeClasses={sizeClasses}
                isDrawingPage={isDrawingPage}
                isFetchingOperatives={isFetchingOperatives}
            />
        );
    }

    componentDidMount = () => {
        const {
            handleChange,
            location: { state: locationState },
            customFilters: { operatives },
        } = this.props;

        if (locationState && operatives.some(op => op.id === locationState.operativeID)) {
            const opIDs = [locationState.operativeID];
            handleChange('companyUserIDs', opIDs);
        }
    };

    componentDidUpdate = ({
        customFilters: { operatives: prevOps },
        isFetching: prevIsFetching,
    }) => {
        const {
            handleChange,
            customFilters: { operatives },
            filters: { companyUserIDs },
            location: { state: locationState },
            showModal,
            isFetching,
        } = this.props;

        const { hasSetOp, hasModalShown } = this.state;

        if (operatives.length !== prevOps.length) {
            // remove operative if they're no longer available after filter update
            const opIDs = companyUserIDs.filter(opID => operatives.some(op => opID === op.id));

            if (
                !hasSetOp &&
                locationState?.operativeID &&
                operatives.some(({ id }) => id === locationState.operativeID)
            ) {
                if (!opIDs.some(opID => opID === locationState.operativeID)) {
                    opIDs.push(locationState.operativeID);
                }

                this.setState({ hasSetOp: true });
            }

            handleChange('companyUserIDs', opIDs);
        }

        if (!isFetching && prevIsFetching) {
            const opIDs = operatives.map(operative => operative.id);

            if (
                locationState?.operativeID &&
                !opIDs.includes(locationState?.operativeID) &&
                !hasModalShown
            ) {
                showModal(SUCCESS_MODAL, {
                    title: 'No pin data',
                    message: 'The selected user has not created any pin data.',
                });

                this.setState({ hasModalShown: true });
            }
        }
    };

    handleChange = (name, val) => {
        const { handleChange } = this.props;
        return handleChange(name, val);
    };
}

const mapStateToProps = state => ({
    isFetching: getOperativesIsFetching(state),
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
    hideModal: () => dispatch(hideModal()),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withUpdateOnChange(OperativesFilterContainer)),
);
