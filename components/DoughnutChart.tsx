'use client'

import React from 'react'
import {Doughnut} from "react-chartjs-2";
/* Error -> Chart.js is treeshakable since chart.js V3 so you will need to import and register all elements you are using. */
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const DoughnutChart = ({accounts} : {account: DoughnutChartProps}) => {
    const data = {
        datasets: [
            {
            label: 'Banks',
            data: [1250, 2000, 4500],
            backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],
        labels: ['Bank 1', 'Bank 2', 'Bank 3']
    };

    return (
        <Doughnut
            data={data}
            options={{
                cutout: '60%', // How thin the circle is
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}
export default DoughnutChart
