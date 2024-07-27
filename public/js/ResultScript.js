var temp = document.getElementById('submit')
const ctx = document.getElementById('myChart');

myChart = new Chart(ctx, {
    type: 'line',
    backgroundColor: 'rgba(01, 10, 10, 0.1)',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
        datasets: [{
            label: 'GPA',
            data: [0, 0, 0, 0],
            borderWidth: 5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function UpdateGraph(context) {

    myChart.data.datasets[0].data = [context.s1, context.s2, context.s3, context.s4, context.s5, context.s6];
    myChart.update();

}


function calculateRank(studentData, branch) {
    console.log(branch);
    const studentCGPA = calculateCGPA(studentData);
    console.log(studentCGPA);

    let countTotal = 0;
    let countBranch = 0;

    for (let i = 0; i < data.length; i++) {
        const currentStudentCGPA = calculateCGPA(data[i]);
        if (currentStudentCGPA > studentCGPA) {
            countTotal++;
            if (data[i]['branch'] == branch) {
                countBranch++;
            }
        }
        console.log(countBranch, countTotal);
    }

    countBranch++;
    countTotal++;

    console.log(countTotal)

    return { countBranch, countTotal };
}
function calculateProj(data) {
    var res = ((data.cgpa) * (86 + data.cr5 + data.cr6) + (10) * (172 - (86 + data.cr5 + data.cr6))) / 172
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
        data.s6 * data.cr6;

    // Calculate the total credits
    const totalCredits =
        data.cr1 + data.cr2 + data.cr3 + data.cr4 + data.cr5 + data.cr6;

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
    console.log(rollNo)
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

temp.onclick = onClickHandler;

