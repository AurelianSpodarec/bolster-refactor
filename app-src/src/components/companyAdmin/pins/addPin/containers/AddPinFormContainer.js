import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import createPin from 'actions/companyAdmin/pins/async/createPin';

import AddPinForm from '../presentational/AddPinForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';

class AddPinFormContainer extends Component {
    state = {
        templateID: '',
        statusID: ''
    };

    render() {
        const { templateID, statusID } = this.state;
        const { location, isFetching, error, templates } = this.props;

        const templateOptions = this._getTemplates();
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);

        return (
            <BlockContainer
                isEmpty={!Object.values(templates).length}
                isFetching={isFetching}
                error={error}
            >
                <AddPinForm
                    templates={Object.values(templateOptions)}
                    selectedTemplate={templateOptions[templateID]}
                    statuses={Object.values(statusOptions)}
                    selectedStatus={statusOptions[statusID]}
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

        const { answers, drawingID, createPin, coordinates } = this.props;

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
                templateVersionID: 8,
                pinStatus: this.state.statusID
            },
            answers: formattedAnswers
        };

        createPin(postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { templates, isFetching, error },
            addPinFormReducer: { answers },
            addPinCoordinatesReducer: { coordinates }
        }
    },
    { match }
) => ({
    templates: Object.values(templates),
    answers,
    coordinates,
    isFetching,
    error,
    drawingID: match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchDrawingTemplates: drawingID => {
        dispatch(fetchDrawingTemplates(drawingID));
    },
    createPin: postBody => {
        dispatch(createPin(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinFormContainer)
);
