import React, { Component } from 'react';
import { connect } from 'react-redux';

import SetLabelFieldModal from '../presentational/SetLabelFieldModal';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_QUES_TYPES } from 'constants/companyAdmin/enums';

const sourceOptions = convertEnumToDropdownOptions(LABEL_QUES_TYPES);
class SetLabelFieldModalContainer extends Component {
    render() {
        const { hideModal, template } = this.props;
        const { ...fields } = this.state;

        return (
            <SetLabelFieldModal
                fields={Object.values(fields)}
                labelType={template.labelType}
                hideModal={hideModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                sourceOptions={sourceOptions}
            />
        );
    }

    componentDidMount() {
        const { labelFields } = this.props;
        this.setState({ ...convertArrToObj(labelFields, 'uuid') });
    }

    handleChange = (e, uuid) => {
        e.preventDefault();
        const { name, value } = e.target;
        const { [uuid]: field } = this.state;

        const updatedField = {
            ...field,
            config: {
                ...field.config,
                [name]: value
            }
        };
        console.log(uuid);
        console.log(name);
        console.log(value);
        console.log(updatedField);

        this.setState({ [uuid]: updatedField });
    };

    handleSubmit = () => {
        console.log('submitting...');
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templateLabelFieldsReducer: { labelFields },
            companiesReducer: { companies }
        }
    },
    { template, companyID }
) => ({
    labelFields: Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID + '' === template.uuid + ''
    ),
    company: companies[companyID] || {}
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetLabelFieldModalContainer);
