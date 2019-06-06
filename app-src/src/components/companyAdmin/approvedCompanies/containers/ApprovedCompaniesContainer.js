import React from 'react';
import { connect } from 'react-redux';

import ApprovedCompanies from '../presentational/ApprovedCompanies';

const ApprovedCompaniesContainer = () => {
    // React.useEffect(() => {
    //     fetchApprovedCompanies();
    // }, []);
    return <ApprovedCompanies />;
};

// const mapDispatchToProps = (dispatch) => ({
//     fetchApprovedCompanies: () => {
//         dispatch(fetchApprovedCompanies());
//     }
// })

export default connect()(ApprovedCompaniesContainer);
