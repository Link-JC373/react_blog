import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

const Histogram = (props: any) => {

    useEffect(() => {
        const { data } = props
        const chart = new Chart({
            container: 'hg',
            autoFit: true,
            height: 500,
        });

        chart.data(data);
        chart.scale('sales', {
            nice: true,
        });

        chart.tooltip({
            showMarkers: false
        });
        chart.interaction('active-region');

        chart.interval().position('time*sales');

        chart.render();
    })

    return (
        <div id='hg' style={{ width: 400, height: 300 }}></div>
    );
}

export default Histogram;