import React from 'react';

export default function(WrappedComponent) {
    class WithValidation extends React.Component {
        render() {
            return (
                <WrappedComponent
                    curUrl={this.props.location.pathname}
                    {...this.props}
                />
            );
        }
    }

    return WithValidation;
}
