import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ButtonNoClickContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const {
            children,
            colourCode,
            to = '',
            type = 'buttton',
            className = ''
        } = this.props;

        const style = {
            backgroundColor: this.state.hover ? colourCode : '#939393'
        };

        const sharedProps = {
            onMouseLeave: this.handleMouseLeave,
            onMouseOver: this.handleMouseOver,
            style,
            className:
                to && to.length
                    ? `link-holder ${className}`
                    : `button ${className}`
        };

        return to && !!to.length ? (
            <div {...sharedProps}>
                <Link to={to}>{children}</Link>
            </div>
        ) : (
            <button {...sharedProps} type={type}>
                {children}
            </button>
        );
    }

    handleMouseOver = () =>
        this.setState({
            hover: true
        });

    handleMouseLeave = () =>
        this.setState({
            hover: false
        });
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode }
        }
    }
}) => ({
    colourCode: colourCode || '#e10512'
});

export default withRouter(connect(mapStateToProps)(ButtonNoClickContainer));
