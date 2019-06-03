import React, { Component } from 'react';
import OperativesFilter from 'components/companyAdmin/reports/createReport/components/presentational/OperativesFilter';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';

class OperativesFilterContainer extends Component {
    render() {
        const {
            handleChange,
            formatArrForDropdown,
            customFilters: { operatives },
            filters: { companyUserIDs }
        } = this.props;

        return (
            <OperativesFilter
                operativeOptions={formatArrForDropdown(operatives)}
                selectedOperatives={companyUserIDs}
                handleChange={handleChange}
            />
        );
    }

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

            handleChange('operatveIDs', opIDs);
        }
    };

    handleChange = (name, val) => {
        const { handleChange, postFilters } = this.props;
        return handleChange(name, val).then(postFilters);
    };
}

export default withUpdateOnChange(OperativesFilterContainer);
