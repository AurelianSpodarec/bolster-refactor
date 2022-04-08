import React from 'react';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterPrelims from './hooks/useFilterPrelims';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FilterRow from 'components/shared/filters/FilterRow';
import Table from 'components/shared/generic/tables/presentational/Table';
import useFetchPrelims from './hooks/useFetchPrelims';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_PRELIM_MODAL } from 'constants/shared/modalTypes';
import { PRELIMS_TYPES } from 'constants/companyAdmin/enums';
import percentSvg from '../../../../_content/images/frontend/percentIcon.svg';
import fixPriceSvg from '../../../../_content/images/frontend/fixPriceIcon.svg';
import fixPriceSvgForLightMode from '../../../../_content/images/frontend/fixPriceIconForLightMode.svg';
import percentSvgForLightMode from '../../../../_content/images/frontend/percentIconForLightMode.svg';
import useColourTheme from 'hooks/useColourTheme';

const Prelims = () => {
    const dispatch = useDispatch();

    const { searchTerm, handleUpdateSearch } = useSearch();
    const { allPrelims, isFetchingPrelims, prelimsError } = useFetchPrelims();
    const filteredPrelims = useFilterPrelims(allPrelims, searchTerm);
    const colourTheme = useColourTheme();

    return (
        <>
            <FilterRow>
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                />

                <button className="button green" onClick={showAddModal}>
                    Add
                </button>
            </FilterRow>

            <Table
                headers={['Name', 'Type', 'Value', '']}
                noData={isEmpty(filteredPrelims)}
                noDataMessage="There are no prelims to display."
                isFetching={isFetchingPrelims}
                error={prelimsError}
            >
                {filteredPrelims.map(set => (
                    <tr key={set.id}>
                        <td>{set.name}</td>
                        <td>
                            <img
                                src={
                                    colourTheme === 'dark'
                                        ? set.type === PRELIMS_TYPES.PERCENT
                                            ? percentSvg
                                            : fixPriceSvg
                                        : set.type === PRELIMS_TYPES.PERCENT
                                        ? percentSvgForLightMode
                                        : fixPriceSvgForLightMode
                                }
                                alt="Type of payment"
                            />
                        </td>

                        <td>{set.value}</td>
                    </tr>
                ))}
            </Table>
        </>
    );

    function showAddModal() {
        dispatch(showModal(CREATE_PRELIM_MODAL));
    }
};

export default Prelims;
