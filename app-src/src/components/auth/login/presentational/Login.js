import React from 'react';
import { Link } from 'react-router-dom';

import TextInputContainer from '../../../generic/containers/TextInputContainer';

const Login = ({ email, password, validateEmail, handleInputChange }) => (
    <div className="auth size-lg-12" id="page-area">
        <div className="container">
            <h1 className="title size-lg-12">Log in</h1>
            <div className="cointent-area size-lg-12">
                <form className="size-lg-12">
                    <TextInputContainer
                        value={email}
                        name="email"
                        placeholder="email"
                        required
                        handleChange={handleInputChange}
                        validate={validateEmail}
                    />
                    <TextInputContainer
                        value={password}
                        name="password"
                        type="password"
                        placeholder="password"
                        handleChange={handleInputChange}
                        required
                    />
                    <Link to="/">Forgot password</Link>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
);

export default Login;
