import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllEnquiriesContainer from 'components/superAdmin/siteManagement/enquiries/shared/containers/AllEnquiriesContainer';
import SingleEnquiryContainer from 'components/superAdmin/siteManagement/enquiries/singleEnquiry/containers/SingleEnquiryContainer';

const EnquiriesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllEnquiriesContainer} />
        <Route path={`${baseUrl}/:id`} component={SingleEnquiryContainer} />
    </SwitchWith404>
);

export default EnquiriesRoutes;
