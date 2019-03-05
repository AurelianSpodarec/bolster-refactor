import React from 'react';

import PieChart from 'react-minimal-pie-chart';

const SiteDetails = () => (
    <div className="content-area size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest</h4>
        <p className="size-lg-6">
            ##Manchester Royal Infirmary
            <br />
            Civic Offices
            <br />
            Union St
            <br />
            Chorley
            <br />
            PR7 1AL##
        </p>
        <div className="size-lg-6">
            <PieChart
                //test data
                data={[
                    {
                        title: 'One',
                        value: 10,
                        color: '#E38627'
                    },
                    {
                        title: 'Two',
                        value: 15,
                        color: '#C13C37'
                    },
                    {
                        title: 'Three',
                        value: 20,
                        color: '#6A2135'
                    }
                ]}
                segmentsStyle={{ transition: 'stroke .3s' }}
                animate
            />
        </div>
        <div className="button-container size-lg-12">
            <button>Edit</button> <button>Delete Site</button>
        </div>
    </div>
);

export default SiteDetails;
