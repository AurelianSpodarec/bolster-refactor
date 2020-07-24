import React from 'react';
import { connect } from 'react-redux';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const PinOptionsTableContainer = ({ onMobile }) => {
    const pinOptionsTypes = Object.values(DROPDOWN_OPTIONS);
    const headers = onMobile ? ['Name', ''] : ['', ''];

    return (
        <BlockContainer>
            <BlockHeading title="Pin Options" />
            <Table
                withActions
                headers={headers}
                noDataMessage={
                    'No templates to display. Please contact Bolster Systems to get a new template set up.'
                }
            >
                {pinOptionsTypes.map(option => (
                    <tr key={option.name}>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                            {option.name}
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">Actions</span>}
                            <ButtonContainer to={`/company/dropdown-options/${option.link}`}>
                                View
                            </ButtonContainer>
                        </td>
                    </tr>
                ))}
            </Table>
        </BlockContainer>
    );
};

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    onMobile,
});

export default connect(mapStateToProps)(PinOptionsTableContainer);
