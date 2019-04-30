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
            to = '',
            type = 'buttton',
            handleClick = () => {},
            className
        } = this.props;
        const { hover } = this.state;

        const style = {
            backgroundColor: hover ? colourCode : '#939393'
        };

        return to && to.length ? (
            <div
                className={`link-holder ${className}`}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={style}
                onClick={handleClick}
            >
                <Link to={to}>{children}</Link>
            </div>
        ) : (
            <button
                className={`button ${className}`}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={style}
                onClick={handleClick}
                type={type}
            >
                {children}
            </button>
        );
    }

    handleMouseOver = () => {
        this.setState({
            hover: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            hover: false
        });
    };
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
