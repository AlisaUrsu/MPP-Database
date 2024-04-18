import "./GenreBarChart.styles.css";
import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";
import {IGame} from "../Games.type";
import {Genres} from "../Genres";
Chart.defaults.color = '#fff'
const GenreBarChart = ({genresData, onBackButton}) => {
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
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Games Count by Genres',
                    data: counts,
                    backgroundColor: 'rgba(174,85,234,1)',
                    borderColor: 'rgba(174,85,234,1)',
                    borderWidth: 1,
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

    const handleBackButtonClick = () => {
        onBackButton();
    };

    return (
        <div>
            <button
                className="barchart-back-button"
                onClick={handleBackButtonClick}
            >
                Back
            </button>
            <canvas ref={chartRef} height={130}/>

        </div>
    );
}

export default GenreBarChart;
