import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP } from 'constants/companyAdmin/enums';
import {
    CONFIRM_SUBMIT,
    CREATE_PIN_OPTIONS_VALUE_MODAL,
    EDIT_PIN_OPTIONS_VALUE_MODAL,
} from 'constants/shared/modalTypes';
import { isEmpty } from 'helpers/generic';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import useFilterOptionValues from './hooks/useFilterOptionsValues';
import useGetOptionsForSet from './hooks/useGetOptionsForSet';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionValuesListItem from './OptionValuesListItem';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const OptionValuesList = () => {
    const dispatch = useDispatch();

    const { setID, type } = useParams();
    const typeID = PIN_OPTION_TYPES_LOOKUP[type];

    const pinOptionsForSet = useGetOptionsForSet(typeID, parseInt(setID));

    const { filteredOptionValues, searchTerm, handleUpdateSearch } =
        useFilterOptionValues(pinOptionsForSet);

    return (
        <>
            <FilterRow>
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                />

                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Add"
                        icon="plus"
                        ambient="positive"
                        size="medium"
                        onClick={showAddModal}
                    />
                </ButtonWrapper>
            </FilterRow>

            <Table
                headers={['Name', '']}
                hideHeaders
                noData={isEmpty(filteredOptionValues)}
                noDataMessage="There is no data to display."
                isFetching={false}
                error={null}
            >
                {filteredOptionValues.map(option => (
                    <OptionValuesListItem
                        key={option.id}
                        option={option}
                        setID={setID}
                        typeID={typeID}
                        showEditModal={showEditModal}
                        showDeleteModal={showDeleteModal}
                    />
                ))}
            </Table>
        </>
    );

    function showAddModal() {
        dispatch(
            showModal(CREATE_PIN_OPTIONS_VALUE_MODAL, {
                pinOptionTypeID: typeID,
                pinOptionSetID: parseInt(setID),
            }),
        );
    }

    function showEditModal(option) {
        dispatch(showModal(EDIT_PIN_OPTIONS_VALUE_MODAL, { option }));
    }

    function showDeleteModal(option) {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () => console.log('delete...'),
                title: `Delete ${option.name}?`,
                message: 'Are you sure you would like to delete this option?',
                submitButtonText: 'Delete',
                submitButtonIcon: 'trash-alt',
            }),
        );
    }
};

export default OptionValuesList;
