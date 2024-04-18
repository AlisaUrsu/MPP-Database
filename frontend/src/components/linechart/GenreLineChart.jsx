import {useEffect, useRef} from "react";
import {Genres} from "../Genres";
import Chart from 'chart.js/auto';

export const GenreLineChart = ({genresData}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = Object.keys(genresData);
        const counts = Object.values(genresData);

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    data: counts,
                    backgroundColor: 'rgba(96,213,228,1)',
                    borderColor: 'rgba(96,213,228,1)',
                    borderWidth: 3,
                }]
            },
            options: {

                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Genres'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [genresData]);


    return (
        <div>

            <canvas ref={chartRef} height={130}/>

        </div>
    );
}

;