import React from 'react';
import { connect } from 'react-redux';

import ClientMenu from '../presentational/ClientMenu';

const CompanyMenuContainer = (/*{ isFromHeadquarters }*/) => <ClientMenu />;
// const mapStateToProps = ({
//     shared: {
//         decodeJWTReducer: {
//             jwtData: { headquartersCompanyID }
//         }
//     }
// }) => ({
//     isFromHeadquarters: !!headquartersCompanyID
// });

export default connect()(CompanyMenuContainer);
