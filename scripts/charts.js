let totalProgress = {
    datasets: [{
        label: "Total Semester Progress",
        data: [20, 80],
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

let englishProgress = {
    datasets: [{
        label: "English 316 Progress",
        data: [45, 55],
        backgroundColor: [
            successColor,
            primaryColor
        ]
    }],
    labels: [
        "Complete",
        "Incomplete"
    ]
}

let mathProgress = {
    datasets: [{
        label: "Math 313 Progress",
        data: [12, 88],
        backgroundColor: [
            successColor,
            primaryColor
        ]
    }],
    labels: [
        "Complete",
        "Incomplete"
    ]
}

let weekProgress = {
    datasets: [{
        label: "Progress this Week",
        data: [96, 4],
        backgroundColor: [
            successColor,
            primaryColor
        ]
    }],
    labels: [
        "Complete",
        "Incomplete"
    ]
}

let dataSets = {
    'total': totalProgress,
    'english': englishProgress,
    'math': mathProgress,
    'week': weekProgress
}

function initCharts() {
    let charts = document.querySelectorAll(".chart");
    for (var chart of charts) {
        let dataSet = chart.dataset.chart;
        initChart(chart.getContext('2d'), dataSets[dataSet]);
    }
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