import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj, isObjEmpty } from 'helpers/generic';

import editPinHistory from 'actions/companyAdmin/pins/async/editPinHistory';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import EditPinForm from '../presentational/EditPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

class EditPinFormContainer extends Component {
    state = {
        status: ''
    };

    render() {
        const { status } = this.state;
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
            <>
                <PageHeading
                    leftChildren={true}
                    title="Edit Pin History"
                    withBackButton
                />
                <BlockContainer
                    isEmpty={!Object.values(templates).length}
                    isFetching={isFetching}
                    error={error}
                >
                    <BlockHeading title="Pin history Details" />
                    <EditPinForm
                        statuses={Object.values(statusOptions)}
                        selectedStatus={statusOptions[status]}
                        location={location}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        filesUploading={filesUploading}
                        confirmLeave={confirmLeave}
                        selectedHistory={selectedHistory}
                    />
                </BlockContainer>
            </>
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
                status: selectedHistory.status
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
                status: selectedHistory.status
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

        const {
            editPinHistory,
            answers,
            filesUploading,
            selectedHistory
        } = this.props;
        const { status } = this.state;

        const formattedAnswers = Object.keys(answers).map(function(key) {
            return { questionID: key, answer: answers[key] };
        });

        const postBody = {
            answers: formattedAnswers,
            status
        };

        if (!filesUploading) {
            editPinHistory(selectedHistory.id, postBody);
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
    editPinHistory: (pinHistoryID, postBody) => {
        dispatch(editPinHistory(pinHistoryID, postBody));
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
