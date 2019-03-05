import React from 'react';
import { withRouter } from 'react-router-dom';

export default function(WrappedComponent) {
    class withCurUrl extends React.Component {
        render() {
            return (
                <WrappedComponent
                    curUrl={this.props.match.url}
                    {...this.props}
                />
            );
        }
    }

    return withRouter(withCurUrl);
}
