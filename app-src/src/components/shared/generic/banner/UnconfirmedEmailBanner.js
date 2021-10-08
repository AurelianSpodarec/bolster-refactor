import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_EMAIL } from 'constants/shared/modalTypes';
import { isEmpty } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const UnconfirmedEmailBanner = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const isEmailUnconfirmed = useSelector(
        ({ shared }) => shared.profileReducer.profile.isEmailConfirmed,
    );
    const isClient = pathname.includes('client');

    if (isEmailUnconfirmed) return null;

    return (
        <div className="banner-notification-wrapper alerts" style={{ backgroundColor: '#d71a1a' }}>
            <div className="banner-text">
                <div className="banner-wysiwyg-text">
                    Your email address is unconfirmed. Please click{' '}
                    <strong
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => dispatch(showModal(CONFIRM_EMAIL, { showDismiss: true }))}
                    >
                        here
                    </strong>{' '}
                    and follow the steps on the email you will receive to complete this process. If
                    your email address is incorrect, invalid or old, please update through{' '}
                    <strong>
                        <Link to={`${isClient ? '/client' : '/company'}/profile`}>My profile</Link>
                    </strong>
                    .
                </div>
            </div>
        </div>
    );
};

export default UnconfirmedEmailBanner;
