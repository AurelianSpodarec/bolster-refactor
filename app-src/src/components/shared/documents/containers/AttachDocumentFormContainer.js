import React, { Component } from 'react';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import { updateObj } from 'helpers/generic';

class AttachDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        requiresAgreement: 'View only',
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
        startDate: new Date(1558306800000),
        endDate: new Date(1558306800000)
    };

    baseState = this.state;

    render = () => (
        <AttachDocumentForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.props.handleSubmit}
            handleRadioChange={this.handleRadioChange}
            handleMultiselect={this.handleMultiselect}
            handleDateChange={this.handleDateChange}
            validateDatePicker={this.validateDatePicker}
            backUrl={this.props.backUrl}
        />
    );

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };

    handleDateChange = (date, name) => {
        console.log(date, name);
        this.setState({
            [name]: date
        });
    };

    handleRadioChange = e => {
        const { name, value } = e.target;
        this.setState({ ...this.baseState, [name]: value });
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
