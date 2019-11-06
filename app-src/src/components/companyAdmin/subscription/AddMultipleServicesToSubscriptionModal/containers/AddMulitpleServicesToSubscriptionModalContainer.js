import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import AddMulitpleServicesToSubscriptionModal from '../presentational/AddMulitpleServicesToSubscriptionModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import fetchProRataSubscriptionCost from 'actions/companyAdmin/subscriptions/async/fetchProRataSubscriptionCost';
import addServiceToSubscription from 'actions/companyAdmin/subscriptions/async/addServiceToSubscription';
import { PAYMENT_SUCCESS, PAYMENT_ERROR } from 'constants/shared/modalTypes';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

class AddMulitpleServicesToSubscriptionModalContainer extends Component {
    state = {
        paymentType: 2,
        stripeCardID: null,
        termsAgreed: false,
        subscriptions: [],
        serviceIDs: [],
        creditsToBuy: this.props.creditsToBuy || '',
        selectedServiceNames: []
    };

    render() {
        const {
            cards,
            hideModal,
            proRataCost,
            costOfCredits,
            vatCostOfCredits,
            credits
        } = this.props;

        const {
            paymentType,
            stripeCardID,
            termsAgreed,
            serviceIDs,
            creditsToBuy,
            selectedServiceNames
        } = this.state;

        const costWithoutVAT = costOfCredits * creditsToBuy;
        const costOfVAT = vatCostOfCredits * creditsToBuy;
        const costWithVAT = costWithoutVAT + costOfVAT;

        const noCards = !cards.length;
        const cardOptions = cards.map(card => ({
            label: `${card.nickname || card.name} - ${card.lastFour}`,
            value: card.id
        }));

        const serviceOptions = this._getServicesOptions();

        return (
            <AddMulitpleServicesToSubscriptionModal
                subscriptions={this.state.subscriptions}
                services={serviceOptions}
                selectedServiceNames={selectedServiceNames}
                checkedServices={serviceIDs}
                paymentType={paymentType}
                proRataCost={proRataCost}
                stripeCardID={stripeCardID}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCreditsChange={this.handleCreditsChange}
                showAddCard={this.showAddCard}
                hideAddCard={this.hideAddCard}
                costWithVAT={costWithVAT}
                costWithoutVAT={costWithoutVAT}
                credits={credits}
                cards={cardOptions}
                noCards={noCards}
                creditsToBuy={creditsToBuy}
                selectedCard={stripeCardID}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                termsAgreed={termsAgreed}
            />
        );
    }

    componentDidMount = () => {
        const { subscriptions, cards, serviceID } = this.props;
        const { serviceIDs } = this.state;

        if (serviceID) {
            this.setState({
                serviceIDs: [...serviceIDs, serviceID.toString()]
            });
        }
        this.setState({ subscriptions });

        this.props.fetchAllCards();
        const primaryCard = cards.find(({ isPrimary }) => isPrimary);

        this.setState({
            stripeCardID: primaryCard ? primaryCard.id : null
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        // put primary card as default into state
        const { postSuccess, postFailure, showModal, fetchAllSubscriptions, error } = this.props;
        const { paymentType, serviceIDs } = this.state;

        // if (postSuccess && !prevProps.postSuccess)
        if (postSuccess && !prevProps.postSuccess) {
            // success modal
            fetchAllSubscriptions();
            showModal(PAYMENT_SUCCESS, {
                message: `Your order has been placed successfully. ${
                    +paymentType === PAYMENT_IDS.CARD
                        ? 'You can now use this service. If you would like a custom pin template, please call us on +44(0)161 873 7679.'
                        : 'Your new service will be available for use once the invoice has been paid.'
                }`
            });
        }
        // if (postFailure && !prevProps.postFailure)
        if (postFailure && !prevProps.postFailure) {
            // fail modal
            fetchAllSubscriptions();
            showModal(PAYMENT_ERROR, {
                message: 'There was an error while purchasing your subscription. Please try again.',
                resubmit: this.handleSubmit,
                error: error.replace('office', 'invoice')
            });
        }

        if (prevState.serviceIDs.length != serviceIDs.length) {
            const serviceOptions = this._getServicesOptions();
            this.setState({
                selectedServiceNames: serviceOptions
                    .filter(service => serviceIDs.includes(service.value.toString()))
                    .map(service => service.text)
            });

            this.props.fetchProRataSubscriptionCost(serviceIDs.length);
        }
    };

    getActiveSubscriptions = () => {
        const { subscriptions, services } = this.props;
        if (subscriptions.services && !isObjEmpty(services)) {
            return subscriptions.services.map(service => ({
                ...service,
                name: services[service.serviceID].name
            }));
        } else return [];
    };
    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: subscriptions.serviceIDs && subscriptions.serviceIDs.includes(id)
        }));
    };
    // handleServiceChange = value => {
    //     const {serviceIDsSelected} = this.state;

    //     this.setState({ serviceIDsSelected: serviceIDsSelected.includes(value) ? serviceIDsSelected.filter(value),  });
    // };
    showAddCard = () => {
        this.setState({ addCardVisible: true });
    };
    hideAddCard = () => {
        this.setState({ addCardVisible: false });
    };
    handleAddCardSuccess = card => {
        this.setState({ stripeCardID: card.id, addCardVisible: false });
    };
    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleCreditsChange = (name, value) => {
        let num = value;
        if (Number(value) <= 0) num = 0;
        this.setState({ [name]: num });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { paymentType, stripeCardID, creditsToBuy, serviceIDs } = this.state;
        const { addServiceToSubscription } = this.props;

        const postBody = {
            paymentType,
            stripeCardID: +paymentType === PAYMENT_IDS.CARD ? stripeCardID : null,
            serviceIDs: serviceIDs.map(id => parseInt(id)),
            Credits: parseInt(creditsToBuy)
        };
        addServiceToSubscription(postBody);
    };
}

//need to update the subscriptions reducer to have credits success?
const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching: fetchingCards },
        creditsReducer: {
            postSuccess: creditsPostSuccess,
            postError,
            costOfCredits,
            vatCostOfCredits,
            credits
        },
        subscriptionsReducer: {
            isFetching: fetchingSubs,
            proRataCost,
            postSuccess,
            postFailure,
            error,
            subscriptions
        },
        servicesReducer: { services, isFetching: fetchingServices }
    }
}) => ({
    creditsPostSuccess,
    postError,
    costOfCredits,
    vatCostOfCredits,
    credits,
    subscriptions,
    cards: Object.values(cards) || [],
    isFetching: fetchingCards || fetchingSubs,
    proRataCost,
    postSuccess,
    postFailure,
    services: Object.values(services),
    fetchingServices,
    error
});

//fetch
const mapDispatchToProps = dispatch => ({
    addServiceToSubscription: body => dispatch(addServiceToSubscription(body)),
    fetchAllCards: () => dispatch(fetchAllCards()),
    fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions()),
    fetchProRataSubscriptionCost: numberOfServices =>
        dispatch(fetchProRataSubscriptionCost(numberOfServices)),
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMulitpleServicesToSubscriptionModalContainer);
