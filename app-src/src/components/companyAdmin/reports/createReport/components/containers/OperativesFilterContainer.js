import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import OperativesFilter from '../presentational/OperativesFilter';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class OperativesFilterContainer extends Component {
    state = { hasSetOp: false };

    render() {
        const {
            formatArrForDropdown,
            customFilters: { operatives },
            filters: { companyUserIDs },
            sizeClasses,
            isDrawingPage,
            isFetchingOperatives,
        } = this.props;

        return (
            <OperativesFilter
                operativeOptions={formatArrForDropdown(operatives)}
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

    componentDidUpdate = ({ customFilters: { operatives: prevOps } }) => {
        const {
            handleChange,
            customFilters: { operatives },
            filters: { companyUserIDs },
            location: { state: locationState },
            showModal,
        } = this.props;
        if (operatives.length !== prevOps.length) {
            // remove operative if they're no longer available after filter update
            const opIDs = companyUserIDs.filter(opID => operatives.some(op => opID === op.id));

            if (
                !this.state.hasSetOp &&
                locationState?.operativeID &&
                operatives.some(({ id }) => id === locationState.operativeID)
            ) {
                if (!opIDs.some(opID => opID === locationState.operativeID)) {
                    opIDs.push(locationState.operativeID);
                }

                this.setState({ hasSetOp: true });
            }

            if (locationState?.operativeID && !opIDs.includes(locationState?.operativeID)) {
                showModal(SUCCESS_MODAL, {
                    title: 'Invalid operative',
                    message: 'The operative you selected has not placed a pin on any sites.',
                });
            }

            handleChange('companyUserIDs', opIDs);
        }
    };

    handleChange = (name, val) => {
        const { handleChange, postFilters } = this.props;
        return handleChange(name, val).then(postFilters);
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
    hideModal: () => dispatch(hideModal()),
});

export default withRouter(
    connect(null, mapDispatchToProps)(withUpdateOnChange(OperativesFilterContainer)),
);
