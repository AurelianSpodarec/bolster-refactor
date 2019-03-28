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

    render() {
        return (
            <AttachDocumentForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.props.handleSubmit}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();
        console.log('name', e.target.name, 'value ==>', e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };

    handleCheckboxChange = e => {};
}

export default AttachDocumentFormContainer;
