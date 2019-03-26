import React from 'react';
import { Route } from 'react-router-dom';
import SwitchWith404 from './SwitchWith404';
import AllEnquiriesContainer from 'components/siteManagement/enquiries/shared/containers/AllEnquiriesContainer';

const EnquiriesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllEnquiriesContainer} />
    </SwitchWith404>
);

export default EnquiriesRoutes;
