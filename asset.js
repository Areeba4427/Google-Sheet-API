
let myChart; // Declare a variable to hold the chart instance

function drawChart() {
    var ctx = document.getElementById('chart').getContext('2d');

    const labelsData = NewData.map(row => row[0]);
    const googleComData = NewData.map(row => row[1]);
    const googleEsData = NewData.map(row => row[2]);

    var data = {
        labels: labelsData,
        datasets: [
            {
                label: 'Google.com',
                borderColor: '#A45B42',
                data: googleComData,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Google.es',
                borderColor: '#5E75A2',
                data: googleEsData,
                fill: false,
                tension: 0.4
            },
        ]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Fluctuaciones de las SERPs\nFluctuaciones promedio para Google.com y Google.es',
        },
        scales: {
            x: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Día'
                }
            },
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Valor'
                },
                suggestedMin: 0
            }
        },

    };

    // Destroy the previous chart if it exists
    if (myChart) {
        myChart.destroy();
    }

    // Create a new chart instance
    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

        const sheet_ID = '12VDkps7PnvkjiQbKju4Vl-VAzcSG9XSnQbHLF5NNmmo';
        const sheet_Range = 'Chart!A2:C33';
        const Key = 'AIzaSyAgg4lFKyVCd_xtmjVNdm0wwJhk-gDZfpQ';
        const columnDataA = [];
        const columnDataB = [];
        const columnDataC = [];

        const NewData = [];

        const NewURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_ID}/values/${sheet_Range}?key=${Key}`;
        fetch(NewURL)
            .then(response => response.json())
            .then(data => {
                const values = data.values;
                values.map(row => {
                    columnDataA.push(row[0]);
                    columnDataB.push(parseInt(row[1]));
                    columnDataC.push(parseInt(row[2]));
                });

                // Loop through the arrays and combine the values into objects
                for (let i = 0; i < columnDataA.length; i++) {
                    const obj = [
                        columnDataA[i],
                        columnDataB[i],
                        columnDataC[i]
                    ];
                    NewData.push(obj);
                }

                // console.log('Combined Data:', NewData);
                drawChart();
            })

