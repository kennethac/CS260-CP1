async function initCharts() {
    let charts = document.querySelectorAll(".chart");
    for (var chart of charts) {
        let dataSet = chart.dataset.chart;
        initChart(chart.getContext('2d'), await getData(dataSet));
    }
}

async function getData(className) {
    var result = await fetch("http://taskburner.kennethchristensen.me/api/tasks/" + className);
    if (!result.ok) {
        console.log("Error fetching information.")
    }

    var classData = await result.json();

    var total = 0;
    var complete = 0;
    
    for (var task of classData.tasks) {
        if (task.complete) {
            complete++;
        }

        total++;
    }

    var percent = complete/total;

    return {
        datasets: [{
            label: classData.name + " Progress",
            data: [percent, 1 - percent],
            backgroundColor: [
                successColor,
                primaryColor
            ]
        }],
        labels: [
            "Complete",
            "Incomplete"
        ]
    };
}

function initChart(context, dataset) {
    new Chart(context, {
        type: 'pie',
        data: dataset,
        options: {
            title: {
                display: true,
                text: dataset.datasets[0].label,
                fontSize: 24
            },
            maintainAspectRatio: false

        }


    });
}

window.onload = initCharts;