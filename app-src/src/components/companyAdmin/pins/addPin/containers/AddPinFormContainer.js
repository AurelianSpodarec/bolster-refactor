import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';

import AddPinForm from '../presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AddPinFormContainer extends Component {
    render() {
        const { isFetching, error, templates } = this.props;

        return (
            <BlockContainer
                isEmpty={!Object.values(templates).length}
                isFetching={isFetching}
                error={error}
            >
                <AddPinForm
                    location={this.props.location}
                    handleSubmit={this.handleSubmit}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { drawingID, fetchDrawingTemplates } = this.props;

        fetchDrawingTemplates(drawingID);
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
