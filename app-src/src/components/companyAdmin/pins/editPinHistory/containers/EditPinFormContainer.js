import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj, isObjEmpty } from 'helpers/generic';

import createPin from 'actions/companyAdmin/pins/async/createPin';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import EditPinForm from '../presentational/EditPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class EditPinFormContainer extends Component {
    state = {
        statusID: ''
    };

    render() {
        const { statusID } = this.state;
        const {
            location,
            isFetching,
            error,
            templates,
            filesUploading,
            confirmLeave,
            selectedHistory
        } = this.props;

        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);

        return (
            <BlockContainer
                isEmpty={!Object.values(templates).length}
                isFetching={isFetching}
                error={error}
            >
                <BlockHeading title="Edit pin history" />
                <EditPinForm
                    statuses={Object.values(statusOptions)}
                    selectedStatus={statusOptions[statusID]}
                    location={location}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    filesUploading={filesUploading}
                    confirmLeave={confirmLeave}
                    selectedHistory={selectedHistory}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const {
            pins,
            drawingID,
            pinID,
            coordinates,
            history,
            hierarchyType,
            selectedHistory
        } = this.props;

        if (!coordinates.lat || !coordinates.lng) {
            if (hierarchyType === 'drawing') {
                history.push(`/company/drawings/${drawingID}`);
            }

            if (hierarchyType === 'pin') {
                history.push(`/company/pins/${pinID}`);
            }
        }

        if (!isObjEmpty(pins)) {
            this.setState({
                statusID: selectedHistory.status
            });
        }

        window.addEventListener('beforeunload', this.handleBeforeUnload);
    };

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload = e => {
        e.returnValue = '';
    };

    componentDidUpdate = prevProps => {
        const {
            pins,
            postSuccess,
            history,
            drawingID,
            pinID,
            resetPinAnswers,
            hierarchyType,
            selectedHistory
        } = this.props;

        if (isObjEmpty(prevProps.pins) && !isObjEmpty(pins)) {
            this.setState({
                statusID: selectedHistory.status
            });
        }

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

        const { templateID } = this.state;

        const {
            templates,
            answers,
            drawingID,
            createPin,
            coordinates,
            filesUploading,
            hierarchyType,
            pinID
        } = this.props;

        const curTemplates = templates.filter(item => item.id == templateID);
        let curTemplate;

        if (curTemplates) {
            curTemplate = curTemplates[0];
        }

        const formattedAnswers = Object.keys(answers).map(function(key) {
            return { templateQuestionID: key, answer: answers[key] };
        });

        const postBody = {
            history: {
                templateVersionID: curTemplate.latestVersionID,
                pinStatus: this.state.statusID
            },
            answers: formattedAnswers
        };

        if (hierarchyType === 'drawing') {
            postBody.pin = {};
            postBody.pin.drawingID = parseInt(drawingID);
            postBody.pin.location = {};
            postBody.pin.location.lngX = coordinates.lng;
            postBody.pin.location.latY = coordinates.lat;
        }

        if (hierarchyType === 'pin') {
            postBody.pinID = pinID;
        }

        if (!filesUploading) {
            createPin(postBody);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { templates, isFetching, error },
        pinHistoriesReducer: { histories, selectedHistoryId },
        addPinFormReducer: { answers },
        addPinCoordinatesReducer: { coordinates },
        pinsReducer: { pins, postSuccess }
    },
    shared: {
        filesUploadingReducer: { filesUploading },
        confirmLeaveReducer: { confirmLeave }
    }
}) => ({
    pins,
    templates: Object.values(templates),
    answers,
    coordinates,
    isFetching,
    error,
    postSuccess,
    filesUploading,
    confirmLeave,
    selectedHistory: histories[selectedHistoryId]
});

const mapDispatchToProps = dispatch => ({
    createPin: postBody => {
        dispatch(createPin(postBody));
    },
    resetPinAnswers: () => {
        dispatch(resetPinAnswers());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditPinFormContainer)
);
