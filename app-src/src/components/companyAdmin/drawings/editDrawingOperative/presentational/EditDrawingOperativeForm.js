import React from 'react';
import ServiceCheckboxListContainer from 'components/shared/services/containers/ServiceListCheckboxContainer';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const EditDrawingOperative = ({
    operative,
    services,
    isFetching,
    handleMultiSelect,
    serviceIDs
}) => {
    if (!isFetching) {
        const { userFirstName, userLastName, id } = operative;
        return (
            <BlockContainer>
                <Breadcrumb
                    breadcrumbs={[
                        { text: 'Drawings' },
                        { text: 'Edit Operative' }
                    ]}
                />
                <PageHeading title={`${userFirstName} ${userLastName} `} />
                <CheckboxListContainer
                    options={Object.values(services)}
                    selectedOptions={serviceIDs}
                    handleChange={handleMultiSelect}
                    name="serviceIDs"
                />
            </BlockContainer>
        );
    } else return <Loading />;
};

export default EditDrawingOperative;
