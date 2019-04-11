import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';
import AddDrawingForm from '../presentational/AddDrawingForm';

class AddDrawingFormContainer extends Component {
    state = {
        name: '',
        file: '',
        templateUsageRuleOptions: {
            '1': { text: 'Use Only Owner Company', value: 1 },
            '2': { text: 'Use Only Own', value: 2 },
            '3': { text: 'Use Any', value: 3 }
        },
        templateUsageRule: ''
    };

    render() {
        const {
            name,
            file,
            templateUsageRuleOptions,
            templateUsageRule
        } = this.state;
        const { floorID, filesUploading } = this.props;
        return (
            <AddDrawingForm
                name={name}
                file={file}
                templateUsageRules={Object.values(templateUsageRuleOptions)}
                selectedRule={templateUsageRuleOptions[templateUsageRule]}
                floorID={floorID}
                handleInputChange={this.handleInputChange}
                handleFileChange={this.handleFileChange}
                handleSubmit={this.handleSubmit}
                filesUploading={filesUploading}
            />
        );
    }

    componentDidUpdate = ({ updatedID: prevUpdatedID }) => {
        const { updatedID, history } = this.props;
        if (!prevUpdatedID && updatedID) {
            history.push(`/company/drawings/${updatedID}`);
        }
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (name, s3Key) => {
        const { [name]: file } = this.state;
        this.setState({ [name]: file === s3Key ? '' : s3Key });
    };

    handleSubmit = () => {
        const { createDrawing, floorID, filesUploading } = this.props;
        const { templateUsageRuleOptions, ...restState } = this.state;
        if (!filesUploading) {
            createDrawing({ ...restState, floorID });
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: { drawingsReducer },
        shared: {
            filesUploadingReducer: { filesUploading }
        }
    },
    { match }
) => ({
    filesUploading,
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
