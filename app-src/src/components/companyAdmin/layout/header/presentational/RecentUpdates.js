import React from 'react';

const RecentUpdates = ({ node, listVisible, toggleListVisibility }) => (
    <div className="recent-updates" ref={node}>
        <button className="icon" type="button" onClick={toggleListVisibility}>
            <i className="fas fa-bullhorn"></i>
        </button>

        <div className={`list ${listVisible ? 'visible' : ''}`}>
            <a className="item">
                <h2>Announcement</h2>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </a>
            <a className="item">
                <h2>Announcement</h2>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </a>
            <a className="item">
                <h2>Announcement</h2>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </a>
        </div>
    </div>
);

export default RecentUpdates;
