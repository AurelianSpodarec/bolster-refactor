import React, { Component } from 'react';
import { connect } from 'react-redux';

import SetLabelFieldModal from '../presentational/SetLabelFieldModal';
import { convertArrToObj } from 'helpers/generic';
import setLabelFields from 'actions/superAdmin/templateBuilder/sync/setLabelFields';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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

        if (name === 'source') {
            updatedField.config.staticField = '';
            updatedField.config.questionUUID = '';
            updatedField.config.title = '';
        }

        this.setState({ [uuid]: updatedField });
    };

    handleSubmit = () => {
        const { ...fields } = this.state;
        const { setLabelFields } = this.props;

        setLabelFields(Object.values(fields));
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templateQuestionsReducer: { questions },
            templateLabelFieldsReducer: { labelFields }
        }
    },
    { template }
) => ({
    labelFields: Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID + '' === template.uuid + ''
    ),
    questions: Object.values(questions).filter(
        ({ templateUUID }) => templateUUID + '' === template.uuid + ''
    )
});

const mapDispatchToProps = (dispatch, { template }) => ({
    setLabelFields: fields => {
        dispatch(setLabelFields(fields, template.uuid));
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetLabelFieldModalContainer);
