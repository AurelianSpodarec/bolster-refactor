import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

import OperativesFilter from '../presentational/OperativesFilter';
import { FURTHER_FILTRATION_OPTIONS } from 'constants/companyAdmin/enums';

class OperativesFilterContainer extends Component {
    render() {
        const {
            formatArrForDropdown,
            customFilters: { operatives: advancedOperatives },
            filters: { companyUserIDs },
            furtherFiltrationOption,
            operatives: basicOperatives,
            companyUsers,

            sizeClasses
        } = this.props;
        const isAdvanced =
            furtherFiltrationOption >
            FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS;
        const operatives = isAdvanced
            ? advancedOperatives
            : Object.values(basicOperatives)
                  .filter(op => companyUsers[op.companyUserID])
                  .map(op => ({
                      id: op.companyUserID,
                      name: `${op.userFirstName} ${
                          op.userLastName
                      } - ${companyUsers[op.companyUserID]
                          .formattedOperativeCode || ''}`
                  }));
        return (
            <OperativesFilter
                operativeOptions={formatArrForDropdown(operatives)}
                selectedOperatives={companyUserIDs}
                handleChange={this.handleChange}
                sizeClasses={sizeClasses}
            />
        );
    }

    componentDidMount = () => {
        const {
            advanced,
            postFilters,
            handleChange,
            location: { state: locationState }
        } = this.props;

        // not required on hierarchy reports
        if (!advanced) postFilters();

        if (locationState && locationState.operativeID) {
            const opIDs = [];

            opIDs.push(locationState.operativeID);

            handleChange('companyUserIDs', opIDs);
        }
    };

    componentDidUpdate = ({ customFilters: { operatives: prevOps } }) => {
        const {
            handleChange,
            customFilters: { operatives },
            filters: { companyUserIDs }
        } = this.props;
        if (operatives.length !== prevOps.length) {
            // remove operative if they're no longer available after filter update
            const opIDs = companyUserIDs.filter(opID =>
                operatives.some(op => opID === op.id)
            );

            handleChange('companyUserIDs', opIDs);
        }
    };

    handleChange = (name, val) => {
        const { handleChange, postFilters } = this.props;
        return handleChange(name, val).then(postFilters);
    };
}

export default withRouter(withUpdateOnChange(OperativesFilterContainer));
