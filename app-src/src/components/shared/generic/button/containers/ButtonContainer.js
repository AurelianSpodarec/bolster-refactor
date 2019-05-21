import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ButtonContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const {
            children,
            colourCode,
            setColour,
            setColourHoverCode,
            to = '',
            type = 'button',
            handleClick = () => {},
            className
        } = this.props;

        let style = {};

        if (setColour && setColour.length) {
            style = {
                backgroundColor: this.state.hover
                    ? setColourHoverCode
                    : setColour
            };
        } else {
            style = {
                backgroundColor: this.state.hover ? colourCode : '#939393'
            };
        }

        const sharedProps = {
            style,
            onMouseLeave: this.handleMouseLeave,
            onMouseOver: this.handleMouseOver,

            className:
                to && to.length
                    ? `link-holder ${className}`
                    : `button ${className}`,
            onClick: handleClick
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

    handleMouseOver = () => this.setState({ hover: true });

    handleMouseLeave = () => this.setState({ hover: false });
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

export default withRouter(connect(mapStateToProps)(ButtonContainer));
