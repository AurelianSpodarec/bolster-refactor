import React from 'react';
import { useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP } from 'constants/companyAdmin/enums';

import { isEmpty } from 'helpers/generic';

import useFilterOptionValues from './hooks/useFilterOptionsValues';
import useGetOptionsForSet from './hooks/useGetOptionsForSet';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionValuesListItem from './OptionValuesListItem';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import useOptionValueActions from './hooks/useOptionValueActions';

const OptionValuesList = () => {
    const { setID, type } = useParams();
    const typeID = PIN_OPTION_TYPES_LOOKUP[type];

    const pinOptionsForSet = useGetOptionsForSet(typeID, parseInt(setID));

    const { filteredOptionValues, searchTerm, handleUpdateSearch } =
        useFilterOptionValues(pinOptionsForSet);

    const { showAddModal, showEditModal, showDeleteModal, enableOptionValue, disableOptionValue } =
        useOptionValueActions(typeID, setID);

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
                        enableOptionValue={enableOptionValue}
                        disableOptionValue={disableOptionValue}
                    />
                ))}
            </Table>
        </>
    );
};

export default OptionValuesList;
