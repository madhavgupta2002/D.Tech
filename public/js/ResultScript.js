var temp=document.getElementById('submit')
const ctx = document.getElementById('myChart');

myChart = new Chart(ctx, {
    type: 'line',
    backgroundColor: 'rgba(01, 10, 10, 0.1)',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
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
    
    myChart.data.datasets[0].data = [context.s1, context.s2, context.s3, context.s4, context.s5];
     myChart.update();

  }
  

function calculateRank(cgpa, branch)
{
    console.log(branch)
    console.log(cgpa)
    let countTotal=0;
    let countBranch=0;
    for(let i=0; i<data.length; i++)
    {
        // console.log(data[i]['roll'])
        if(data[i]['cgpa']>cgpa)
        {
            countTotal++;
            if(data[i]['branch']==branch)
                countBranch++;
        }
        console.log(countBranch, countTotal)
    }
    countBranch++;
    countTotal++;
    return {countBranch, countTotal}
}
function calculateProj(data)
{
    var res=((data.cgpa)*84 + (10)*88)/172
    res = Math.round(res * 100000000) / 100000000;

    return res;
}



function display(data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('rollNo').textContent = data.roll;
    document.getElementById('sem1GPA').textContent = data.s1;
    document.getElementById('sem2GPA').textContent = data.s2;
    document.getElementById('sem3GPA').textContent = data.s3;
    document.getElementById('sem4GPA').textContent = data.s4;
    document.getElementById('sem5GPA').textContent = data.s5;

    
    var rank = calculateRank(data.cgpa, data.branch);
    document.getElementById('rank1').textContent = rank['countBranch'];
    document.getElementById('rank2').textContent = rank['countTotal'];
    document.getElementById('gpa').textContent = data.cgpa;


    var projGPA=calculateProj(data);
    var projRank=calculateRank(projGPA, data.branch);
    document.getElementById('projGPA').textContent = projGPA;
    document.getElementById('projRank').textContent = projRank['countBranch'];
    UpdateGraph(data)
    
}


function onClickHandler() {
    var rollNo=document.getElementById('inputBox').value.toUpperCase();
    console.log(rollNo)
    let flag=0;

    for(let i=0; i<data.length; i++)
    {
        // console.log(data[i]['roll'])

        if(data[i]['roll']==rollNo){
            
            // alert(data[i]['name'])
            flag=1;
            display(data[i])
            break;
        }
    }
    if(flag==0)
        alert("Data Not Available")

}

temp.onclick = onClickHandler;



var crsr = document.querySelector("#cursor");
document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
  });