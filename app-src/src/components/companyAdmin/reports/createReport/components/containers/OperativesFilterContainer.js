import React, { Component } from 'react';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

import OperativesFilter from '../presentational/OperativesFilter';

class OperativesFilterContainer extends Component {
    render() {
        const {
            handleChange,
            formatArrForDropdown,
            customFilters: { operatives },
            filters: { companyUserIDs }
        } = this.props;
        console.log({ companyUserIDs, operatives });
        return (
            <OperativesFilter
                operativeOptions={formatArrForDropdown(operatives)}
                selectedOperatives={companyUserIDs}
                handleChange={handleChange}
            />
        );
    }

    componentDidMount = () => {
        const { advanced, postFilters } = this.props;
        // not required on hierarchy reports
        if (!advanced) postFilters();
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

export default withUpdateOnChange(OperativesFilterContainer);
