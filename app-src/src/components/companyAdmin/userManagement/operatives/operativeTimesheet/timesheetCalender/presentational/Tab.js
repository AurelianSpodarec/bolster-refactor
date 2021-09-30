const Tab = ({ icon, children }) => {
    return (
        <div className="tab">
            {icon}
            <p>{children}</p>
        </div>
    );
};

export default Tab;
