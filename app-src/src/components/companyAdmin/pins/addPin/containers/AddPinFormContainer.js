import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import createPin from 'actions/companyAdmin/pins/async/createPin';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';
import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';

import AddPinForm from 'components/shared/pins/addPin/presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

class AddPinFormContainer extends Component {
    state = {
        serviceID: '',
        templateID: '',
        pinTitle: '',
    };

    render() {
        const { templateID, serviceID, pinTitle } = this.state;
        const {
            location,
            isFetching,
            error,
            templates,
            filesUploading,
            confirmLeave,
            isHistory,
        } = this.props;

        const serviceOptions = convertArrToObj(this._relevantServiceOptions(), 'value');
        const templateOptions = this._getTemplates(templates, serviceID);

        return (
            <>
                <PageHeading leftChildren={true} title={`Add Pin ${pinTitle}`}>
                    <BackButtonContainer
                        backFromForm={{
                            urlToReplace: isHistory ? '/add-history' : '/add-pin',
                            with: '',
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
                        isHistory={isHistory}
                        templates={Object.values(templateOptions)}
                        selectedTemplate={templateOptions[templateID]}
                        services={Object.values(serviceOptions)}
                        selectedService={serviceOptions[serviceID]}
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

        this.setState({
            pinTitle: this.calculatePinID(),
        });

        window.addEventListener('beforeunload', this.handleBeforeUnload);
    };

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        const { answers, status, drawingID, resetPinAnswers } = this.props;
        const { templateID } = this.state;

        const saveState = {
            answers,
            status,
            templateID,
        };

        localStorage.setItem(`pinCache/${drawingID}`, JSON.stringify(saveState));
        resetPinAnswers();
    }

    calculatePinID = () => {
        const { pins, CompanyUserOperativeCode } = this.props;

        const opCode = CompanyUserOperativeCode.replace(/['"]+/g, '');

        const pinsByOperativeCount =
            Object.values(pins).filter(pin => pin.pinCode.endsWith(opCode)).length + 1;

        if (pinsByOperativeCount < 10) {
            return '000' + pinsByOperativeCount + ':' + opCode;
        } else if (pinsByOperativeCount >= 10 && pinsByOperativeCount < 100) {
            return '00' + pinsByOperativeCount + ':' + opCode;
        } else if (pinsByOperativeCount >= 100 && pinsByOperativeCount < 1000) {
            return '0' + pinsByOperativeCount + ':' + opCode;
        } else {
            return pinsByOperativeCount + ':' + opCode;
        }
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
            hierarchyType,
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
            ({ serviceID }) => +serviceID === +selectedServiceID,
        );
        const templateOptions = filteredTemplates.map(({ id, name, companyName }) => ({
            value: id,
            label: `${name} (${companyName})`,
            text: `${name} (${companyName})`,
        }));

        return convertArrToObj(templateOptions, 'value');
    };

    _relevantServiceOptions = () => {
        const {
            services,
            subscriptions: { serviceIDs },
        } = this.props;

        const serviceOptions = [];

        serviceIDs.forEach(serviceID => {
            const option = services.find(service => service.id === serviceID);
            if (option) serviceOptions.push(option);
        });

        return serviceOptions.map(({ id, name }) => ({
            value: id,
            label: name,
            text: name,
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
            status,
        } = this.props;

        const curTemplate = templates.find(({ id }) => +id === +templateID) || {};

        const formattedAnswers = Object.keys(answers).map(key => ({
            templateQuestionID: key,
            answer: answers[key],
        }));

        const postBody = {
            history: {
                templateVersionID: curTemplate.latestVersionID,
                pinStatus: status,
            },
            answers: formattedAnswers,
        };

        if (hierarchyType === 'drawing') {
            postBody.pin = {
                drawingID: parseInt(drawingID),
                location: { lngX: coordinates.lng, latY: coordinates.lat },
            };
        }

        if (hierarchyType === 'pin') postBody.pinID = pinID;
        if (!filesUploading) createPin(postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { templates, isFetching, error },
            addPinFormReducer: { answers, status },
            addPinCoordinatesReducer: { coordinates },
            pinsReducer: { postSuccess, pins, isFetching: fetchingPins },
            manufacturersOptionValuesReducer: { isFetching: isFetchingOptionValues },
            manufacturersReducer: { isFetching: isFetchingManufacturers },
            pinHistoriesReducer: { histories },
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
        },
        shared: {
            filesUploadingReducer: { filesUploading },
            confirmLeaveReducer: { confirmLeave },
            decodeJWTReducer: {
                jwtData: { CompanyUserOperativeCode },
            },
        },
    },
    { match: { params } },
) => ({
    templates: Object.values(templates).filter(({ isDeleted }) => !isDeleted),
    answers,
    coordinates,
    isFetching: isFetching || isFetchingManufacturers || isFetchingOptionValues,
    error,
    postSuccess,
    filesUploading,
    confirmLeave,
    status,
    pinID: params.id,
    fetchingPins,
    pins,
    histories,
    services: Object.values(services),
    subscriptions,
    CompanyUserOperativeCode,
});

const mapDispatchToProps = {
    createPin,
    resetPinAnswers,
    updateAddPinStatus,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPinFormContainer));
