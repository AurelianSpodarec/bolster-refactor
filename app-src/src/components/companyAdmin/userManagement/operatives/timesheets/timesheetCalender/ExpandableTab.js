import React from 'react';

const ExpandableTab = ({ date, icon, items, itemType = 'items', isExpanded, onJobClick }) => {
    const filteredItems = items.filter(item => item);
    return (
        <div className="tab expandable" onClick={() => items.length && onJobClick(date)}>
            <div className="content">
                <div className="tab-title">
                    {icon}

                    <p>{items.length}</p>
                    <p> {itemType}</p>
                </div>
                {isExpanded && filteredItems.length > 0 && (
                    <div className="popup">
                        <div className="list-wrapper">
                            {filteredItems.map((item, i) => (
                                <p key={i} className="border-bottom">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {filteredItems.length > 0 ? (
                <i className={`fal fa-${isExpanded ? 'minus' : 'plus'} expand-icon`} />
            ) : null}
        </div>
    );
};

export default ExpandableTab;
