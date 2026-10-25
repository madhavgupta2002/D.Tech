// Page markup is rendered by React (src/pages/result.js); it calls window.initResult() on mount.
var myChart = null;

function createChart() {
    const ctx = document.getElementById('myChart');
    if (!ctx || typeof Chart === 'undefined') return;
    var prev = myChart ? myChart.data.datasets[0].data : [0, 0, 0, 0, 0, 0, 0];
    if (myChart) myChart.destroy();
    const styles = getComputedStyle(document.documentElement);
    const color = (name) => 'hsl(' + styles.getPropertyValue(name).trim() + ')';
    myChart = new Chart(ctx, {
    type: 'line',
    backgroundColor: 'rgba(01, 10, 10, 0.1)',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7'],
        datasets: [{
            label: 'GPA',
            data: prev,
            borderWidth: 3,
            borderColor: color('--primary'),
            backgroundColor: color('--primary'),
            tension: 0.3
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: color('--muted-foreground') } } },
        scales: {
            x: { ticks: { color: color('--muted-foreground') }, grid: { color: color('--border') } },
            y: { beginAtZero: true, max: 10, ticks: { color: color('--muted-foreground') }, grid: { color: color('--border') } }
        }
    }
});
}

function UpdateGraph(context) {
    if (!myChart) return;

    myChart.data.datasets[0].data = [context.s1, context.s2, context.s3, context.s4, context.s5, context.s6, context.s7];
    myChart.update();

}


function calculateRank(cgpa, branch) {
    let countTotal = 0;
    let countBranch = 0;
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]['roll'])
        if (data[i]['cgpa'] > cgpa) {
            countTotal++;
            if (data[i]['branch'] == branch)
                countBranch++;
        }
    }
    countBranch++;
    countTotal++;
    return { countBranch, countTotal }
}
function calculateProj(data) {
    var res = ((data.cgpa) * (86 + data.cr5 + data.cr6 + data.cr7) + (10) * (172 - (86 + data.cr5 + data.cr6 + data.cr7))) / 172
    res = Math.round(res * 100000000) / 100000000;

    return res;
}

function calculateCGPA(data) {
    // Calculate the sum of (GPA * credits) for all semesters
    const weightedSum =
        data.s1 * data.cr1 +
        data.s2 * data.cr2 +
        data.s3 * data.cr3 +
        data.s4 * data.cr4 +
        data.s5 * data.cr5 +
        data.s6 * data.cr6 +
        data.s7 * data.cr7;

    // Calculate the total credits
    const totalCredits =
        data.cr1 + data.cr2 + data.cr3 + data.cr4 + data.cr5 + data.cr6 + data.cr7;

    // Calculate CGPA
    const cgpa = weightedSum / totalCredits;

    // Round to 2 decimal places
    return Math.round(cgpa * 100000000) / 100000000;
}


function display(data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('rollNo').textContent = data.roll;
    document.getElementById('sem1GPA').textContent = data.s1;
    document.getElementById('sem2GPA').textContent = data.s2;
    document.getElementById('sem3GPA').textContent = data.s3;
    document.getElementById('sem4GPA').textContent = data.s4;
    document.getElementById('sem5GPA').textContent = data.s5;
    document.getElementById('sem6GPA').textContent = data.s6;
    document.getElementById('sem7GPA').textContent = data.s7;


    var rank = calculateRank(data.cgpa, data.branch);
    document.getElementById('rank1').textContent = rank['countBranch'];
    document.getElementById('rank2').textContent = rank['countTotal'];
    var aggCGPA = calculateCGPA(data);
    document.getElementById('gpa').textContent = aggCGPA;


    var projGPA = calculateProj(data);
    var projRank = calculateRank(projGPA, data.branch);
    document.getElementById('projGPA').textContent = projGPA;
    document.getElementById('projRank').textContent = projRank['countBranch'];
    UpdateGraph(data)

}


function onClickHandler() {
    var rollNo = document.getElementById('inputBox').value.toUpperCase();
    let flag = 0;

    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]['roll'])
        if (data[i]['roll'] == rollNo) {
            // alert(data[i]['name'])
            flag = 1;
            display(data[i])
            break;
        }
    }
    if (flag == 0)
        alert("Data Not Available")

}

// Re-themes the chart (e.g. after a light/dark toggle) keeping its data.
window.refreshResultChart = createChart;

window.initResult = function () {
    createChart();
    document.getElementById('submit').onclick = onClickHandler;
    document.getElementById('inputBox').onkeydown = function (e) { if (e.key === 'Enter') onClickHandler(); };
};
