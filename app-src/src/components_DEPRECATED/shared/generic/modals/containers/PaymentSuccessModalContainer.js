import React from 'react';
import { useDispatch } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import PaymentSuccessModal from '../presentational/PaymentSuccessModal';

const PaymentSuccessModalContainer = ({
    title = 'Order Complete',
    message = 'Your order has been placed successfully',
}) => {
    const dispatch = useDispatch();
    return <PaymentSuccessModal title={title} message={message} handleClose={handleClose} />;
    function handleClose() {
        dispatch(hideModal());
    }
};

export default PaymentSuccessModalContainer;
