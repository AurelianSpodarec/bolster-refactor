import React, { Component } from 'react';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { API_URL } from 'config';
import { getHeaders } from '../../helpers/api';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

class CheckoutForm extends Component {
    state = {
        name: '',
        errorMessage: ''
    };

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

        // ToDo: Call /cards/createintent
        console.log('constructed');
    }

    submit = async ev => {
        // User clicked submit
        const {
            data: { clientSecret }
        } = await axios.get(`${API_URL}/cards/createintent`, getHeaders());

        const { name } = this.state;

        console.log(clientSecret);

        this.props.stripe
            .handleCardSetup(clientSecret, {
                payment_method_data: {
                    billing_details: { name }
                }
            })
            .then(result => {
                if (result.error) {
                    // Display error.message in your UI.
                    this.setState({
                        errorMessage: result.error.message
                    });
                } else {
                    // The setup has succeeded. Display a success message.
                    console.warn(result);
                }
            });

        // let {token} = await this.props.stripe.createToken({name: "Name"});
        //
        // let response = await fetch("/charge", {
        //     method: "POST",
        //     headers: {"Content-Type": "text/plain"},
        //     body: token.id
        // });
        //
        // if (response.ok) {
        //     alert("Card Complete")
        // }
    };

    render() {
        const { name, errorMessage } = this.state;

        return (
            <div className="checkout">
                <Field name="Name on card" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={name}
                        name="name"
                        type="text"
                        placeholder="Please enter your card name"
                        required
                        handleChange={this.handleInputChange}
                    />
                </Field>
                <div className="size-lg-12">
                    <CardElement />
                    <button onClick={this.submit}>Send</button>
                </div>
                {errorMessage ? (
                    <p className="field-validation-error">{errorMessage}</p>
                ) : (
                    <p>Nothing</p>
                )}
            </div>
        );
    }

    handleInputChange = (name, value) => this.setState({ [name]: value });
}

export default injectStripe(CheckoutForm);
