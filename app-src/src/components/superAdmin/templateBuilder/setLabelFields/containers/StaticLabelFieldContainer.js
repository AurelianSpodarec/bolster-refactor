import React, { Component } from 'react';
import { connect } from 'react-redux';
import StaticLabelField from '../presentational/StaticLabelField';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_STATIC_FIELDS } from 'constants/companyAdmin/enums';

class StaticLabelFieldContainer extends Component {
    state = {
        fieldOptions: convertEnumToDropdownOptions(LABEL_STATIC_FIELDS),
        field: ''
    };

    render() {
        const { fieldOptions, field } = this.state;
        return (
            <StaticLabelField
                fieldOptions={Object.values(fieldOptions)}
                selectedField={fieldOptions[field]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaticLabelFieldContainer);
