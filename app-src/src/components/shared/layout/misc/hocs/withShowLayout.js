import React from 'react';
import { withRouter } from 'react-router-dom';

export default function(WrappedComponent) {
    class WithShowHeader extends React.Component {
        render() {
            const noLayoutRoutes = ['/auth/login', '/404'];
            const route = this.props.location.pathname.toLowerCase();
            const showLoggedInLayout = !noLayoutRoutes.some(
                r => r.toLowerCase() === route
            );

            return (
                <WrappedComponent
                    showLoggedInLayout={showLoggedInLayout}
                    {...this.props}
                />
            );
        }
    }

    return withRouter(WithShowHeader);
}
