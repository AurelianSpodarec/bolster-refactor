import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';
import Field from 'components/shared/generic/form/presentational/Field';
import MoveToolMoveToOptionsRoute from '../containers/MoveToolMoveToOptionsRoute';

const MoveToolMoveTo = ({
    handleChange,
    companies,
    selectedCompany,
    moveFromCompany,
    selectedHierarchy
}) => (
    <Block>
        <BlockHeading title="Company to move to" />

        <Field name="Select a company" classes="full-length">
            <Select
                name="moveToCompany"
                options={companies}
                value={selectedCompany}
                onChange={handleChange}
                placeholder="-- select company --"
                search
            />
        </Field>

        {!!selectedCompany && (
            <MoveToolMoveToOptionsRoute
                hierarchyID={selectedHierarchy}
                companyID={selectedCompany}
                moveFromCompany={moveFromCompany}
            />
        )}
    </Block>
);

export default MoveToolMoveTo;
