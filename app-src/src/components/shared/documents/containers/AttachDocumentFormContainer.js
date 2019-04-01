import React, { Component } from 'react';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import { updateObj } from 'helpers/generic';

class AttachDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        type: '1',
        // textboxes
        name: '',
        file: {},
        // toggles
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        // dropdown
        checkedServices: {
            '##fire##': { name: '##fire##', checked: false },
            '##water##': { name: '##water##', checked: false },
            '##earth##': { name: '##earth##', checked: false },
            '##air##': { name: '##air##', checked: false },
            '##heart##': { name: '##heart##', checked: false }
        },
        agreeanceEveryXDays: 0,
        // date selector
        startOn: new Date(),
        endOn: new Date()
    };

    baseState = this.state;

    render = () => (
        <AttachDocumentForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            handleRadioChange={this.handleRadioChange}
            handleCheckboxChange={this.handleCheckboxChange}
            handleMultiselect={this.handleMultiselect}
            handleFileChange={this.handleFileChange}
            handleDateChange={this.handleDateChange}
            validateDatePicker={this.validateDatePicker}
            backUrl={this.props.backUrl}
        />
    );

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };

    handleInputChange = e => {
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

    handleSubmit = e => {
        e.preventDefault();
        const { handleSubmit } = this.props;
        const { checkedServices, ...body } = this.state;
        // ! change this
        const services = {} || checkedServices;
        const postBody = { ...body, services };

        handleSubmit(postBody);
    };
}

export default AttachDocumentFormContainer;
