import React, { Component } from 'react';
import axios from 'axios';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements';
import { API_URL } from 'config';
import { getHeaders } from '../../helpers/api';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

class CheckoutForm extends Component {
    state = {
        name: '',
        errorMessage: '',
        nameProvided: true
    };

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

        // ToDo: Call /cards/createintent
        console.log('constructed');
    }

    submit = async ev => {
        // User clicked submit
        ev.preventDefault();

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
                    this.setState({
                        errorMessage: ''
                    });
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
        const { name, errorMessage, nameProvided } = this.state;

        return (
            <form onSubmit={this.submit}>
                <div className="checkout">
                    <Field name="Name on card" sizeClasses="size-lg-4 size-md-12" required>
                        <TextInputContainer
                            value={name}
                            name="name"
                            type="text"
                            placeholder="Please enter your card name"
                            handleChange={this.handleChange}
                        />
                    </Field>
                    <div className="size-lg-12">
                        <Field name="Card number" sizeClasses="size-lg-4 size-md-12" required>
                            <CardNumberElement {...createOptions()} onChange={this.handleChange} />
                        </Field>
                        <Field name="Expiration date" sizeClasses="size-lg-4 size-md-12" required>
                            <CardExpiryElement {...createOptions()} onChange={this.handleChange} />
                        </Field>
                        <Field name="CVC" sizeClasses="size-lg-4 size-md-12" required>
                            <CardCVCElement {...createOptions()} onChange={this.handleChange} />
                        </Field>
                        {errorMessage && nameProvided ? (
                            <div
                                className="size-lg-12"
                                style={{ paddingLeft: 7.5, paddingRight: 7.5, marginBottom: 15 }}
                            >
                                <p className="info-message error size-lg-12">{errorMessage}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                        {!nameProvided ? (
                            <div
                                className="size-lg-12"
                                style={{ paddingLeft: 7.5, paddingRight: 7.5, marginBottom: 15 }}
                            >
                                <p className="info-message error size-lg-12">
                                    You must provide a card name.
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="size-lg-12" style={{ paddingLeft: 7.5, paddingRight: 7.5 }}>
                            <button className="button green pull-right" onClick={this.clickSubmit}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    handleChange = (name, value) => this.setState({ [name]: value, nameProvided: true });

    clickSubmit = e => {
        const { name } = this.state;

        if (!name) {
            e.preventDefault();
            this.setState({
                nameProvided: false
            });
        }
    };
}

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '14px',
                color: 'black',
                fontFamily: 'Ubuntu, sans-serif',
                '::placeholder': {
                    color: '#4e4e4e'
                }
            },
            invalid: {
                color: '#c23d4b'
            }
        }
    };
};

export default injectStripe(CheckoutForm);
