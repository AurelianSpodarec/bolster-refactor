import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS, PAYMENT_TYPES } from 'constants/companyAdmin/enums';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { formatNumber } from 'helpers/generic';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const AddBolsterPlusModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    paymentType,
    creditsToBuy = 0,
    cards,
    selectedCard,
    handleCreditsChange,
    costWithVAT,
    costWithoutVAT,
    noCards,
    addCardVisible,
    showAddCard,
    hideAddCard,
    handleAddCardSuccess,
    termsAgreed,
    isPosting,
    shouldReceiveFreeCredit,
}) => {
    if (addCardVisible)
        return <AddCardFormContainer close={hideAddCard} onSuccess={handleAddCardSuccess} />;

    return (
        <FlexModalOuter title="Add Bolster Plus Subscription">
            <div className="flex-content">
                <p>This service will be added ...</p>
            </div>
        </FlexModalOuter>
    );
};

export default AddBolsterPlusModal;
