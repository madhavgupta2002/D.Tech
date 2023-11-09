var temp=document.getElementById('submit')

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


function display(data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('rollNo').textContent = data.roll;
    document.getElementById('sem1GPA').textContent = data.s1;
    document.getElementById('sem2GPA').textContent = data.s2;
    document.getElementById('sem3GPA').textContent = data.s3;
    document.getElementById('sem4GPA').textContent = data.s4;
    // Update other data points similarly

    var rank = calculateRank(data.cgpa, data.branch);
    document.getElementById('rank1').textContent = rank['countBranch'];
    document.getElementById('rank2').textContent = rank['countTotal'];
    CreateGraph(data)
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
