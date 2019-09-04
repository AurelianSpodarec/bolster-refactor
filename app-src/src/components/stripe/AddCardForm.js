import React, {Component} from 'react';
import axios from 'axios';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { API_URL } from 'config';
import {getHeaders} from "../../helpers/api";

class CheckoutForm extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

        // ToDo: Call /cards/createintent
        console.log('constructed');
    }

    async submit(ev) {
        // User clicked submit

        const {data : { clientSecret } } = await axios.get(`${API_URL}/cards/createintent`, getHeaders());

        console.log(clientSecret);

        this.props.stripe.handleCardSetup(
            clientSecret, {
                payment_method_data: {
                    billing_details: { name: 'Mark Baker' }
                }
            }
        ).then(function(result) {
            if (result.error) {
                // Display error.message in your UI.
                console.error(result.error);
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
    }

    render() {
        return (
            <div className="checkout">
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm)