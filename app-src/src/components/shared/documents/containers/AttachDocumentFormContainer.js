import React, { Component } from 'react';

import AttachDocumentForm from '../presentational/AttachDocumentForm';

class AttachDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        requiresAgreement: '',
        // textboxes
        documentName: '',
        file: {},
        // toggles
        requiresPhoto: false,
        requiresFileView: false,
        requiresSignature: false,
        forceUpsyncToContinue: false,
        // dropdown
        serviceType: '',
        aggreeancePerDay: 0,
        // date selector
        startDate: '',
        endDate: ''
    };

    render = () => (
        <AttachDocumentForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.props.handleSubmit}
            handleCheckboxChange={this.handleCheckboxChange}
        />
    );

    handleInputChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };
}

export default AttachDocumentFormContainer;
