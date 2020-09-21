import React from 'react';

// import ServerRoomBackgroundVideo from '_content/images/frontend-new/contact/icons/video/Server_Room.mp4';
import LoginFormContainer from '../containers/LoginFormContainer';

const Login = () => {
    return (
        <div id="login">
            <div className="login-background"></div>
            <video className="login-background-video" autoPlay="autoplay" loop muted>
                <source src={'ServerRoomBackgroundVideo'} type="video/mp4" />
            </video>
            <div className="login-wrapper">
                <div className="heading-body-wrapper">
                    <div className="login-heading">
                        <heading>
                            <h1>Login</h1>
                        </heading>
                    </div>
                    <p>
                        Neque porro quisquam est qui do lorem amet
                        <br />
                        <br />
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                        praesentium voluptatum deleniti atque corrupti quos.
                        <br />
                        <br />
                        Dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                        similique sunt in culpa qui officia deserunt mollitia animi, id est laborum
                        et dolorum fuga.
                        <br />
                        <br />
                        Et harum quidem rerum facilis est et expedita distinctio.
                    </p>
                </div>
                <LoginFormContainer />
            </div>
        </div>
    );
};

export default Login;
