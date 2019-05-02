import React, { Component } from 'react';
import { connect } from 'react-redux';

import SetLabelFieldModal from '../presentational/SetLabelFieldModal';
import { convertArrToObj } from 'helpers/generic';

class SetLabelFieldModalContainer extends Component {
    render() {
        const { hideModal, template } = this.props;
        const { ...fields } = this.state;

        return (
            <SetLabelFieldModal
                questionOptions={this._getQuestionOptions()}
                fields={Object.values(fields)}
                labelType={template.labelType}
                hideModal={hideModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    _getQuestionOptions = () => {
        const { questions } = this.props;

        return questions.reduce(
            (acc, { uuid, name }) => ({
                ...acc,
                [uuid]: { value: uuid, text: name }
            }),
            {}
        );
    };

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

        this.setState({ [uuid]: updatedField });
    };

    handleSubmit = () => {
        console.log('submitting...');
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templateQuestionsReducer: { questions },
            templateLabelFieldsReducer: { labelFields },
            companiesReducer: { companies }
        }
    },
    { template, companyID }
) => ({
    labelFields: Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID + '' === template.uuid + ''
    ),
    questions: Object.values(questions).filter(
        ({ templateUUID }) => templateUUID + '' === template.uuid + ''
    ),
    company: companies[companyID] || {}
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetLabelFieldModalContainer);
