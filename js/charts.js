async function fetchData() {
    const username = 'coalition';
    const password = 'skills-test'; 
    const auth = btoa(`${username}:${password}`);

    const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}

function processData(data) {
    const bloodPressureData = {
        labels: [],
        systolic: [],
        diastolic: []
    };

    const heartRateData = {
        labels: [],
        values: []
    };

    const monthAbbreviations = {
        'January': 'Jan',
        'February': 'Feb',
        'March': 'Mar',
        'April': 'Apr',
        'May': 'May',
        'June': 'Jun',
        'July': 'Jul',
        'August': 'Aug',
        'September': 'Sep',
        'October': 'Oct',
        'November': 'Nov',
        'December': 'Dec'
    };

    data[0].diagnosis_history.forEach(entry => {
        const formattedMonth = monthAbbreviations[entry.month] || entry.month;
        const formattedDate = `${formattedMonth}, ${entry.year}`;
        
        bloodPressureData.labels.push(formattedDate);
        bloodPressureData.systolic.push(entry.blood_pressure.systolic.value);
        bloodPressureData.diastolic.push(entry.blood_pressure.diastolic.value);

        heartRateData.labels.push(formattedDate);
        heartRateData.values.push(entry.heart_rate.value);
    });

    return { bloodPressureData, heartRateData };
}

function createChart(canvasId, data, label, yAxisLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: label,
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createBloodPressureChart(data) {
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Systolic Pressure',
                    data: data.systolic,
                    borderColor: '#e66fd2',
                    backgroundColor: '#e66fd2',
                    borderWidth: 1,
                    tension: 0.4 
                },
                {
                    label: 'Diastolic Pressure',
                    data: data.diastolic,
                    borderColor: '#8c6fe6',
                    backgroundColor: '#8c6fe6',
                    borderWidth: 1,
                    tension: 0.4 
                }
            ]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: true
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

async function init() {
    try {
        const data = await fetchData();
        const { bloodPressureData, heartRateData } = processData(data);
        createBloodPressureChart(bloodPressureData);
        createChart('heartRateChart', heartRateData, 'Heart Rate', 'Beats Per Minute (BPM)');
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);
