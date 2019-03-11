import React from 'react';

export default function(WrappedComponent) {
    class WithToggleExpand extends React.Component {
        state = { isOpen: false };
        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    toggleExpand={this.toggleExpand}
                />
            );
        }

        toggleExpand = e => {
            e.preventDefault();

            this.setState({
                ...this.state,
                isOpen: !this.state.isOpen
            });
        };
    }

    return WithToggleExpand;
}
