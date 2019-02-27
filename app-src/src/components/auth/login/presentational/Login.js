import React from 'react';
import { Link } from 'react-router-dom';

import TextInputContainer from '../../../generic/containers/TextInputContainer';

const Login = ({ email, password, validateEmail, handleInputChange }) => (
    <div className="size-lg-12">
        <form>
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
);

export default Login;
