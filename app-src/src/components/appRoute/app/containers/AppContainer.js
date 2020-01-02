import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";

import App from "../presentational/App";

import setMobileWidth from "actions/shared/generic/mobile/sync/setMobileWidth";

class AppContainer extends Component {
    render() {
        return <App />;
    }
    componentDidMount = () => {
        this.checkMobileWidth();
        window.addEventListener("resize", this.checkMobileWidth);
        console.log(this.isIE10());
        console.log(this.isIE10());
        console.log(this.isIE10());
        console.log(this.isIE10());
        console.log(this.isIE10());
    };

    //effects onMobile reducer
    checkMobileWidth = _.throttle(() => {
        const { setMobileWidth } = this.props;

        if (window.innerWidth < 1025) {
            setMobileWidth(true);
        } else {
            setMobileWidth(false);
        }
    }, 1000);

    isIE10 = () => {
        let isIE10 = false;
        /*@cc_on
            if (/^10/.test(@_jscript_version)) {
                isIE10 = true;
            }
        @*/

        return isIE10;
    };
}

const mapDispatchToProps = dispatch => ({
    setMobileWidth: isMobile => dispatch(setMobileWidth(isMobile))
});

export default withRouter(connect(null, mapDispatchToProps)(AppContainer));
