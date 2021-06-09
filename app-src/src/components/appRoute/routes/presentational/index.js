import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

import { usePrevious } from 'helpers/hooks';

import NotFound from 'components/shared/notFound/presentational/NotFound';
import SwitchWith404 from './SwitchWith404';

// import AuthApp from 'components/auth/app/app/presentational/AuthApp';  <-- needs removing once new Auth route for front end has been set up
import AdminAppContainer from 'components/superAdmin/app/app/containers/AdminAppContainer';
import CompanyAppContainer from 'components/companyAdmin/app/app/containers/CompanyAppContainer';

import ClientAppContainer from 'components/client/app/app/containers/ClientAppContainer';
import FrontEndAppContainer from 'components/frontEnd/app/app/containers/FrontEndAppContainer';
import DemoFullSite from 'components/shared/demo-full-site/presentational/DemoFullSite';

const Routes = () => {
    const location = useLocation();
    const prevProps = usePrevious({ location });

    useEffect(() => {
        ReactGA.initialize('UA-132047777-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        if (location.pathname !== prevProps.location.pathname) {
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname + location.search);
        }
    }, [location.pathname, prevProps.location]);

    return (
        <SwitchWith404>
            <Route exact path="/404" component={NotFound} />
            <Route path="/auth" component={FrontEndAppContainer} />
            <Route path="/admin" component={AdminAppContainer} />
            <Route path="/company" component={CompanyAppContainer} />
            <Route path="/client" component={ClientAppContainer} />
            <Route path="/demo-full-site" component={DemoFullSite} />
            <Route path="/" component={FrontEndAppContainer} />
        </SwitchWith404>
    );
};

export default Routes;
