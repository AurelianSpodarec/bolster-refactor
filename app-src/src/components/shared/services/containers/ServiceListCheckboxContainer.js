import React, { Component } from 'react';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

class ServiceCheckboxListContainer extends Component {
    render() {
        const { services, isFetching, error, handleChange } = this.props;
        return (
            <CheckboxListContainer
                handleChange={handleChange}
                isFetching={isFetching}
                error={error}
                items={services}
            />
        );
    }
}

export default ServiceCheckboxListContainer;
