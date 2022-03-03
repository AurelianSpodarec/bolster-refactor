import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubNavMenuLink = ({
    item: { name, link, onClick, notificationCount },
    companyColour,
    shouldUseCompanyColours,
}) => {
    const [hover, setHover] = useState(false);

    const route = location.pathname.toLowerCase();

    const isActive = route === link.toLowerCase();

    return (
        <div className="sub-nav-item">
            {!!notificationCount && (
                <div className="notification-badge">
                    <p>{notificationCount}</p>
                </div>
            )}
            <Link
                onClick={onClick}
                to={link}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={
                    (hover && shouldUseCompanyColours) || (isActive && shouldUseCompanyColours)
                        ? { color: companyColour }
                        : {}
                }
            >
                {name}
            </Link>
        </div>
    );
};

export default SubNavMenuLink;
