import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';

import AddPinForm from '../presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AddPinFormContainer extends Component {
    state = {
        templateID: ''
    };

    render() {
        const { templateID } = this.state;
        const { location, isFetching, error, templates } = this.props;

        const templateOptions = this._getTemplates();

        return (
            <BlockContainer
                isEmpty={!Object.values(templates).length}
                isFetching={isFetching}
                error={error}
            >
                <AddPinForm
                    templates={Object.values(templateOptions)}
                    selectedTemplate={templateOptions[templateID]}
                    location={location}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { drawingID, fetchDrawingTemplates } = this.props;

        fetchDrawingTemplates(drawingID);
    };

    _getTemplates = () => {
        const { templates } = this.props;
        const templateOptions = templates.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(templateOptions, 'value');
    };

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = e => {
        e.preventDefault();
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { templates, isFetching, error },
            templateVersionsReducer: { versions },
            templateSectionsReducer: { sections },
            templateQuestionsReducer: { questions }
        }
    },
    { match }
) => {
    return {
        templates: Object.values(templates),
        templateVersions: Object.values(versions),
        templateSections: Object.values(sections),
        templateQuestions: Object.values(questions),
        isFetching,
        error,
        drawingID: match.params.id
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDrawingTemplates: drawingID => {
        dispatch(fetchDrawingTemplates(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinFormContainer)
);
