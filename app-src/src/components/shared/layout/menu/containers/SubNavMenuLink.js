import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubNavMenuLink = ({ item: { name, link }, companyColour }) => {
    const [hover, setHover] = useState(false);

    return (
        <Link
            to={link}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={
                hover
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
