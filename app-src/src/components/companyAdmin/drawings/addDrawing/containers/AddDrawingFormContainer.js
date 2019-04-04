import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';
import AddDrawingForm from '../presentational/AddDrawingForm';

class AddDrawingFormContainer extends Component {
    state = {
        name: '',
        file: {}
    };

    render() {
        return (
            <AddDrawingForm
                {...this.state}
                floorID={this.props.floorID}
                handleInputChange={this.handleInputChange}
                handleFileChange={this.handleFileChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = ({ updatedID: prevUpdatedID }) => {
        const { updatedID, history } = this.props;
        if (!prevUpdatedID && updatedID) {
            history.push(`/drawings/${updatedID}`);
        }
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };

    handleSubmit = () => {
        const { createDrawing, floorID } = this.props;
        const { name, file } = this.state;
        createDrawing({ name, file, floorID });
    };
}

const mapStateToProps = ({ companyAdmin: { drawingsReducer } }, { match }) => ({
    floorID: match.params.id,
    updatedID: drawingsReducer.updatedID
});
const mapDispatchToProps = dispatch => ({
    createDrawing: drawing => {
        dispatch(createDrawing(drawing));
    }
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDrawingFormContainer);

export default withRouter(WithRedux);
