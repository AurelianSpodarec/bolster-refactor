import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import createPin from 'actions/companyAdmin/pins/async/createPin';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import AddPinForm from '../presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class AddPinFormContainer extends Component {
    state = {
        templateID: '',
        statusID: ''
    };

    render() {
        const { templateID, statusID } = this.state;
        const {
            location,
            isFetching,
            error,
            templates,
            filesUploading,
            confirmLeave
        } = this.props;

        const templateOptions = this._getTemplates();
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);

        return (
            <BlockContainer
                isEmpty={!Object.values(templates).length}
                isFetching={isFetching}
                error={error}
            >
                <BlockHeading title="Add pin" />
                <AddPinForm
                    templates={Object.values(templateOptions)}
                    selectedTemplate={templateOptions[templateID]}
                    statuses={Object.values(statusOptions)}
                    selectedStatus={statusOptions[statusID]}
                    location={location}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    filesUploading={filesUploading}
                    confirmLeave={confirmLeave}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const {
            drawingID,
            pinID,
            coordinates,
            history,
            hierarchyType
        } = this.props;

        console.warn(hierarchyType);

        if (!coordinates.lat || !coordinates.lng) {
            if (hierarchyType === 'drawing') {
                history.push(`/company/drawings/${drawingID}`);
            }

            if (hierarchyType === 'pin') {
                history.push(`/company/pins/${pinID}`);
            }
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
        const { postSuccess, history, drawingID, resetPinAnswers } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            resetPinAnswers();
            history.push(`/company/drawings/${drawingID}`);
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
        const { templates } = this.props;

        const { templateID } = this.state;

        const {
            answers,
            drawingID,
            createPin,
            coordinates,
            filesUploading
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
            pin: {
                drawingID: parseInt(drawingID),
                location: {
                    lngX: coordinates.lng,
                    latY: coordinates.lat
                }
            },
            history: {
                templateVersionID: curTemplate.latestVersionID,
                pinStatus: this.state.statusID
            },
            answers: formattedAnswers
        };

        if (!filesUploading) {
            createPin(postBody);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { templates, isFetching, error },
        addPinFormReducer: { answers },
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
    confirmLeave
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
    )(AddPinFormContainer)
);
