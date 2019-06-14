import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import createPin from 'actions/companyAdmin/pins/async/createPin';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';
import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';

import AddPinForm from '../presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

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
            confirmLeave,
            isHistory
        } = this.props;

        const templateOptions = this._getTemplates(templates);

        return (
            <>
                <PageHeading leftChildren={true} title="Add Pin">
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
                        isHistory={isHistory}
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
        const {
            drawingID,
            coordinates,
            history,
            hierarchyType,
            isHistory,
            updateAddPinStatus,
            updateAddPinAnswer,
            pinID,
            pins,
            histories
        } = this.props;

        if (isHistory) {
            const pin = pins[pinID] || {};
            // if adding a pin history, this is the previous history to perfill from
            const history = histories[pin.latestHistoryID];
        }
        if (!coordinates.lat || !coordinates.lng) {
            if (hierarchyType === 'drawing') {
                history.push(`/company/drawings/${drawingID}`);
            }
        }

        window.addEventListener('beforeunload', this.handleBeforeUnload);
        const pinCache = JSON.parse(
            localStorage.getItem(`pinCache/${drawingID}`)
        );
        if (pinCache) {
            // this.setState({ templateID: pinCache.templateID }, () => {
            //     updateAddPinStatus(pinCache.status);
            //     Object.entries(pinCache.answers).forEach(answer => {
            //         updateAddPinAnswer(answer[0], answer[1]);
            //     });
            // });
        }
    };

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        const { answers, status, drawingID, resetPinAnswers } = this.props;
        const { templateID } = this.state;

        const saveState = {
            answers,
            status,
            templateID
        };

        localStorage.setItem(
            `pinCache/${drawingID}`,
            JSON.stringify(saveState)
        );
        resetPinAnswers();
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

    handleChange = (name, value) => {
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

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { templates, isFetching, error },
            addPinFormReducer: { answers, status },
            addPinCoordinatesReducer: { coordinates },
            pinsReducer: { postSuccess, pins },
            pinHistoriesReducer: { histories }
        },
        shared: {
            filesUploadingReducer: { filesUploading },
            confirmLeaveReducer: { confirmLeave }
        }
    },
    { match: { params } }
) => ({
    templates: Object.values(templates),
    answers,
    coordinates,
    isFetching,
    error,
    postSuccess,
    filesUploading,
    confirmLeave,
    status,
    pinID: params.id,
    pins,
    histories
});

const mapDispatchToProps = dispatch => ({
    createPin: postBody => dispatch(createPin(postBody)),
    resetPinAnswers: () => dispatch(resetPinAnswers()),
    updateAddPinStatus: val => dispatch(updateAddPinStatus(val)),
    updateAddPinAnswer: (key, value) => {
        dispatch(updateAddPinAnswer(key, value));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinFormContainer)
);
