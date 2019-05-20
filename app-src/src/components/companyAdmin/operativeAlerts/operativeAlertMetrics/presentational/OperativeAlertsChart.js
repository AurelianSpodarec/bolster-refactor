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
                backgroundColor: ['red', '#16a6e2', '#2eac58'] //######
            }
        ]
    };
    const options = {
        legend: {
            position: 'left',
            labels: {
                fontFamily: 'Ubuntu',
                fontSize: 14
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'pointer'
        }
    };
    return <Doughnut data={data} options={options} />;
};

export default OperativeAlertsChart;
