import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubNavMenuLink = ({ item: { name, link, onClick }, companyColour }) => {
    const [hover, setHover] = useState(false);

    const route = location.pathname.toLowerCase();

    const isActive = route === link.toLowerCase();

    return (
        <Link
            onClick={onClick}
            to={link}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={
                hover || isActive
                    ? {
                          color: companyColour,
                      }
                    : {}
            }
        >
            {name}
        </Link>
    );
};

export default SubNavMenuLink;
