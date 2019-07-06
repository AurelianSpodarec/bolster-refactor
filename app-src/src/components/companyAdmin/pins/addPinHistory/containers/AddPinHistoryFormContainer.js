import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { convertArrToObj, isEmpty } from 'helpers/generic';

import createPin from 'actions/companyAdmin/pins/async/createPin';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';
import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';

import AddPinForm from 'components/shared/pins/addPin/presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

class AddPinFormContainer extends Component {
    state = {
        templateID: '',
        serviceID: ''
    };

    render() {
        const { templateID, serviceID } = this.state;
        const {
            location,
            isFetching,
            error,
            templates,
            filesUploading,
            confirmLeave,
            isHistory
        } = this.props;

        const serviceOptions = convertArrToObj(
            this._relevantServiceOptions(),
            'value'
        );
        const templateOptions = this._getTemplates(templates, serviceID);

        return (
            <>
                <PageHeading
                    leftChildren={true}
                    title={`Add Pin ${isHistory ? 'History' : ''}`}
                >
                    <BackButtonContainer
                        backFromForm={{
                            urlToReplace: isHistory
                                ? '/add-history'
                                : '/add-pin',
                            with: ''
                        }}
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
                        services={Object.values(serviceOptions)}
                        selectedService={serviceOptions[serviceID]}
                    />
                </BlockContainer>
            </>
        );
    }

    componentDidMount = () => {
        const {
            drawingID,
            coordinates,
            history,
            hierarchyType,
            updateAddPinStatus,
            updateAddPinAnswer,
            latestPinHistory,
            histories,
            pinID,
            pinAnswers,
            templates,
            versions
        } = this.props;

        if (!coordinates.lat || !coordinates.lng) {
            if (hierarchyType === 'drawing') {
                history.push(`/company/drawings/${drawingID}`);
            }
        }

        if (isEmpty(histories)) {
            history.push(`/company/pins/${pinID}`);
            return;
        }
        const templateVersion =
            versions.find(
                version => latestPinHistory.templateVersionID === version.id
            ) || {};
        const latestTemplateUsed =
            templates.find(
                template => templateVersion.templateID === template.id
            ) || {};

        const latestTemplateVersionID = latestTemplateUsed.latestVersionID;

        this.setState(
            {
                templateID: latestTemplateUsed.id,
                serviceID: latestTemplateUsed.serviceID
            },
            () => {
                updateAddPinStatus(latestPinHistory.status);
                if (templateVersion.id === latestTemplateVersionID) {
                    pinAnswers
                        .filter(ans => latestPinHistory.id === ans.pinHistoryID)
                        .forEach(({ answer, templateQuestionID }) =>
                            updateAddPinAnswer(templateQuestionID, answer)
                        );
                }
            }
        );
    };

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
                history.replace(`/company/drawings/${drawingID}`);
            }

            if (hierarchyType === 'pin') {
                history.replace(`/company/pins/${pinID}`);
            }
        }
    };

    _getTemplates = (templates, selectedServiceID) => {
        const filteredTemplates = templates.filter(
            ({ serviceID }) => +serviceID === +selectedServiceID
        );
        const templateOptions = filteredTemplates.map(({ id, name }) => ({
            value: id,
            label: name,
            text: name
        }));

        return convertArrToObj(templateOptions, 'value');
    };

    _relevantServiceOptions = () => {
        const {
            services,
            subscriptions: { serviceIDs }
        } = this.props;

        const serviceOptions = [];

        serviceIDs.forEach(serviceID => {
            serviceOptions.push(
                services.filter(service => service.id === serviceID)[0]
            );
        });

        return serviceOptions.map(({ id, name }) => ({
            value: id,
            label: name,
            text: name
        }));
    };

    handleChange = (name, value) => {
        const { resetPinAnswers, updateAddPinStatus } = this.props;
        resetPinAnswers();
        updateAddPinStatus('');
        this.setState({ [name]: value });
    };

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
        templateVersionsReducer: { versions },
        templateSectionsReducer: { sections },
        templateQuestionsReducer: { questions },
        addPinFormReducer: { answers, status },
        addPinCoordinatesReducer: { coordinates },
        pinsReducer: { postSuccess },
        pinHistoriesReducer: { histories },
        pinAnswersReducer: { answers: pinAnswers },
        servicesReducer: { services },
        subscriptionsReducer: { subscriptions }
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
    questions,
    sections,
    error,
    postSuccess,
    filesUploading,
    confirmLeave,
    status,
    services: Object.values(services),
    versions: Object.values(versions),
    pinAnswers: Object.values(pinAnswers),
    histories,
    latestPinHistory: [...Object.values(histories)].sort(
        (a, b) => moment(b.createdOn) - moment(a.createdOn)
    )[0],
    subscriptions
});

const mapDispatchToProps = {
    createPin,
    resetPinAnswers,
    updateAddPinStatus,
    updateAddPinAnswer
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinFormContainer)
);
