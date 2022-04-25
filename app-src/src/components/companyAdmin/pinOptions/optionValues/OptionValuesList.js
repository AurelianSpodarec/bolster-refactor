import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as SortAscIcon } from '_content/images/icons/sort-asc.svg';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionTypesArr } from 'selectors/companyAdmin/pinOptionTypes';

import useFilterOptionValues from '../../../../hooks/useFilterOptionsValues';
import useGetOptionsForSet from './hooks/useGetOptionsForSet';
import useOptionValueActions from './hooks/useOptionValueActions';
import useUpdateOptionValueSort from './hooks/useUpdateOptionValueSort';
import useShouldRedirectFromOptionValues from './hooks/useShouldRedirectFromOptionValues';

import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionValuesListItem from './OptionValuesListItem';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const OptionValuesList = ({ forwardRef, hasFetched }) => {
    const { setID, type } = useParams();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const specificType = pinOptionTypesArr.find(curType => curType.slug === type);
    const typeID = specificType ? specificType.id : null;

    const pinOptionsForSet = useGetOptionsForSet(typeID, parseInt(setID));

    const { isSorting, handleToggleSort, handleUpdateSort, moveItem } =
        useUpdateOptionValueSort(pinOptionsForSet);

    const { filteredOptionValues, searchTerm, handleUpdateSearch } = useFilterOptionValues(
        pinOptionsForSet,
        isSorting,
    );

    const { showAddModal, showEditModal, showDeleteModal, enableOptionValue, disableOptionValue } =
        useOptionValueActions(typeID, setID);

    const shouldRedirect = useShouldRedirectFromOptionValues(hasFetched);

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    return (
        <>
            <FilterRow>
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                    disabled={isSorting}
                />

                <ButtonWrapper alignment="right">
                    <ActionButton
                        svgIconComponent={SortAscIcon}
                        iconOnly
                        source={isSorting ? 'primary' : 'secondary'}
                        size="medium"
                        onClick={handleToggleSort}
                    />

                    <ActionButton
                        text="Add"
                        icon="plus"
                        ambient="positive"
                        size="medium"
                        onClick={showAddModal}
                        disabled={isSorting}
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
                withoutTBody
                extraClasses={isSorting ? 'dragging' : ''}
            >
                <tbody ref={isSorting ? forwardRef : null} className={isSorting ? 'dragging' : ''}>
                    {filteredOptionValues.map((option, index) => (
                        <OptionValuesListItem
                            key={option.id}
                            index={index}
                            option={option}
                            setID={setID}
                            typeID={typeID}
                            showEditModal={showEditModal}
                            showDeleteModal={showDeleteModal}
                            enableOptionValue={enableOptionValue}
                            disableOptionValue={disableOptionValue}
                            isSorting={isSorting}
                            onMove={moveItem}
                            onDrop={handleUpdateSort}
                        />
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default withDropZone(OptionValuesList, 'PIN_OPTION_VALUES');
