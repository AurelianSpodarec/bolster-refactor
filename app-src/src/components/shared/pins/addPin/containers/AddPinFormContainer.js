import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import createPin from 'actions/companyAdmin/pins/async/createPin';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import AddPinForm from '../presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import warnAboutUnsavedForm from './warnAboutUnsavedForm';

class AddPinFormContainer extends Component {
    state = {
        templateID: ''
    };

    render() {
        const { templateID } = this.state;
        const {
            location,
            isFetching,
            error,
            templates,
            filesUploading,
            confirmLeave
        } = this.props;

        const templateOptions = this._getTemplates(templates);

        return (
            <>
                <PageHeading leftChildren={true} title="Add Pin">
                    <BackButtonContainer
                        backFromForm={{ urlToReplace: '/add-pin', with: '' }}
                    />
                </PageHeading>
                <BlockContainer
                    isEmpty={!templates.length}
                    noDataMessage="You have no pin templates."
                    isFetching={isFetching}
                    error={error}
                >
                    <AddPinForm
                        templates={Object.values(templateOptions)}
                        selectedTemplate={templateOptions[templateID]}
                        location={location}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        filesUploading={filesUploading}
                        confirmLeave={confirmLeave}
                    />
                </BlockContainer>
            </>
        );
    }

    componentDidMount = () => {
        const { drawingID, coordinates, history, hierarchyType } = this.props;

        if (!coordinates.lat || !coordinates.lng) {
            if (hierarchyType === 'drawing') {
                history.push(`/company/drawings/${drawingID}`);
            }
        }

        window.addEventListener('beforeunload', this.handleBeforeUnload);
    };

    componentDidUpdate = () => {
        window.onbeforeunload = () => true;
    };

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload = e => {
        e.returnValue = '';
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            drawingID,
            pinID,
            resetPinAnswers,
            hierarchyType
        } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            resetPinAnswers();

            if (hierarchyType === 'drawing') {
                history.push(`/company/drawings/${drawingID}`);
            }

            if (hierarchyType === 'pin') {
                history.push(`/company/pins/${pinID}`);
            }
        }
    };

    _getTemplates = templates => {
        const templateOptions = templates.map(({ id, name }) => ({
            value: id,
            label: name,
            text: name
        }));

        return convertArrToObj(templateOptions, 'value');
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();

        const { templateID } = this.state;
        const {
            templates,
            answers,
            drawingID,
            createPin,
            coordinates,
            filesUploading,
            hierarchyType,
            pinID,
            status
        } = this.props;

        const curTemplate =
            templates.find(({ id }) => +id === +templateID) || {};

        const formattedAnswers = Object.keys(answers).map(key => ({
            templateQuestionID: key,
            answer: answers[key]
        }));

        const postBody = {
            history: {
                templateVersionID: curTemplate.latestVersionID,
                pinStatus: status
            },
            answers: formattedAnswers
        };

        if (hierarchyType === 'drawing') {
            postBody.pin = {
                drawingID: parseInt(drawingID),
                location: { lngX: coordinates.lng, latY: coordinates.lat }
            };
        }

        if (hierarchyType === 'pin') postBody.pinID = pinID;
        if (!filesUploading) createPin(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { templates, isFetching, error },
        addPinFormReducer: { answers, status },
        addPinCoordinatesReducer: { coordinates },
        pinsReducer: { postSuccess }
    },
    shared: {
        filesUploadingReducer: { filesUploading },
        confirmLeaveReducer: { confirmLeave }
    }
}) => ({
    templates: Object.values(templates),
    answers,
    coordinates,
    isFetching,
    error,
    postSuccess,
    filesUploading,
    confirmLeave,
    status
});

const mapDispatchToProps = dispatch => ({
    createPin: postBody => dispatch(createPin(postBody)),
    resetPinAnswers: () => dispatch(resetPinAnswers())
});

export default warnAboutUnsavedForm(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinFormContainer)
);
