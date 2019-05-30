import React from 'react';
import { connect } from 'react-redux';
import ApprovedCompaniesListItem from '../presentational/ApprovedCompaniesListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const companies = {
    bolster: {
        name: 'bolster',
        addressLine1: 'bolster cove',
        addressLine2: '1 bolster street',
        town: 'bolster town',
        postcode: 'sgvdi',
        code: 565876,
        s3code: 'sahvscdcsdavcdsaukvcds'
    },
    bolster2: {
        name: 'bolster',
        addressLine1: 'bolster cove',
        addressLine2: '1 bolster street',
        town: 'bolster town',
        postcode: 'sgvdi',
        code: 565876,
        s3code: 'sahvscdcsdavcdsaukvcds'
    },
    bolster3: {
        name: 'bolster',
        addressLine1: 'bolster cove',
        addressLine2: '1 bolster street',
        town: 'bolster town',
        postcode: 'sgvdi',
        code: 565876,
        s3code: 'sahvscdcsdavcdsaukvcds'
    },
    bolster4: {
        name: 'bolster',
        addressLine1: 'bolster cove',
        addressLine2: '1 bolster street',
        town: 'bolster town',
        postcode: 'sgvdi',
        code: 565876,
        s3code: 'sahvscdcsdavcdsaukvcds'
    },
    bolster5: {
        name: 'bolster',
        addressLine1: 'bolster cove',
        addressLine2: '1 bolster street',
        town: 'bolster town',
        postcode: 'sgvdi',
        code: 565876,
        s3code: 'sahvscdcsdavcdsaukvcds'
    },
    bolster6: {
        name: 'bolster',
        addressLine1: 'bolster cove',
        addressLine2: '1 bolster street',
        town: 'bolster town',
        postcode: 'sgvdi',
        code: 565876,
        s3code: 'sahvscdcsdavcdsaukvcds'
    }
};

const ApprovedCompaniesListContainer = () => {
    return Object.values(companies).map(company => (
        <BlockContainer key={company}>
            <ApprovedCompaniesListItem company={company} />
        </BlockContainer>
    ));
};

export default connect()(ApprovedCompaniesListContainer);
