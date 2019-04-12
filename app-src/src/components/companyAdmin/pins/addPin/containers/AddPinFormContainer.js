import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';

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
                <AddPinForm />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { fetchAllTemplates } = this.props;

        fetchAllTemplates();
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer,
            templateVersionsReducer,
            templateSectionsReducer,
            templateQuestionsReducer
        }
    },
    { match }
) => {
    return {
        templates: Object.values(templatesReducer.templates),
        templateVersions: Object.values(templateVersionsReducer.versions),
        templateSections: Object.values(templateSectionsReducer.sections),
        templateQuestions: Object.values(templateQuestionsReducer.questions),
        isFetching: templatesReducer.isFetching,
        error: templatesReducer.error,
        drawingID: match.params.id
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAllTemplates: () => {
        dispatch(fetchAllTemplates());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinFormContainer)
);
