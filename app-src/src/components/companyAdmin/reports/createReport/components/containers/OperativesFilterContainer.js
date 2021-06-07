import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

import OperativesFilter from '../presentational/OperativesFilter';

class OperativesFilterContainer extends Component {
    render() {
        const {
            formatArrForDropdownOperative,
            customFilters: { operatives },
            filters: { companyUserIDs, createdByCompanyID },
            sizeClasses,
            isDrawingPage,
            isDrawingOwner,
            companyID,
        } = this.props;

        const companyFilteredOperatives = !createdByCompanyID
            ? operatives
            : operatives.filter(item => item.companyID === createdByCompanyID);

        const filteredOperatives = isDrawingOwner
            ? companyFilteredOperatives
            : companyFilteredOperatives.filter(item => item.companyID === companyID);

        return (
            <OperativesFilter
                operativeOptions={formatArrForDropdownOperative(filteredOperatives)}
                selectedOperatives={companyUserIDs}
                handleChange={this.handleChange}
                sizeClasses={sizeClasses}
                isDrawingPage={isDrawingPage}
            />
        );
    }

    componentDidMount = () => {
        const {
            handleChange,
            location: { state: locationState },
        } = this.props;

        if (locationState && locationState.operativeID) {
            const opIDs = [locationState.operativeID];
            handleChange('companyUserIDs', opIDs);
        }
    };

    componentDidUpdate = ({ customFilters: { operatives: prevOps } }) => {
        const {
            handleChange,
            customFilters: { operatives },
            filters: { companyUserIDs },
        } = this.props;
        if (operatives.length !== prevOps.length) {
            // remove operative if they're no longer available after filter update
            const opIDs = companyUserIDs.filter(opID => operatives.some(op => opID === op.id));

            handleChange('companyUserIDs', opIDs);
        }
    };

    handleChange = (name, val) => {
        const { handleChange, postFilters } = this.props;
        return handleChange(name, val).then(postFilters);
    };
}

export default withRouter(withUpdateOnChange(OperativesFilterContainer));
