import React, { Component } from 'react';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import { updateObj } from 'helpers/generic';

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
        checkedServices: {
            '##fire##': { name: '##fire##', checked: false },
            '##water##': { name: '##water##', checked: false },
            '##earth##': { name: '##earth##', checked: false },
            '##air##': { name: '##air##', checked: false },
            '##heart##': { name: '##heart##', checked: false }
        },
        aggreeancePerDay: 0,
        // date selector
        startDate: new Date(),
        endDate: new Date()
    };

    render = () => (
        <AttachDocumentForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.props.handleSubmit}
            handleCheckboxChange={this.handleCheckboxChange}
            handleMultiselect={this.handleMultiselect}
            handleDateChange={this.handleDateChange}
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

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };

    handleMultiselect = e => {
        const { name } = e.target;
        this.setState(prevState => {
            const { checkedServices } = prevState;
            const service = checkedServices[name];
            return {
                checkedServices: {
                    ...checkedServices,
                    [name]: updateObj(service, 'checked', !service.checked)
                }
            };
        });
    };
}

export default AttachDocumentFormContainer;
