import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const OperativeAlertsChart = ({ alerts, alert }) => {
    const { sentCount, deliveredCount, readCount } = alert;
    const sent = sentCount - deliveredCount;
    const delivered = deliveredCount - readCount;
    const data = {
        labels: ['Sent (undelivered)', 'Delivered (unread)', 'Read'],
        datasets: [
            {
                data: [sent, delivered, readCount],
                backgroundColor: ['red', 'yellow', 'green'] //######
            }
        ]
    };
    const options = {};
    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default OperativeAlertsChart;
