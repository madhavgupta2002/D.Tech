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

// function display(data) {
//     var main = document.getElementById('main-result-content');

//     // Create and append elements for each piece of information
//     var nameElement = document.createElement('p');
//     nameElement.textContent = 'Name: ' + data.name;
//     main.appendChild(nameElement);

//     var rollNoElement = document.createElement('p');
//     rollNoElement.textContent = 'Roll No: ' + data.roll;
//     main.appendChild(rollNoElement);

//     var sem1GPAElement = document.createElement('p');
//     sem1GPAElement.textContent = 'Sem 1 GPA: ' + data.s1;
//     main.appendChild(sem1GPAElement);

//     var sem2GPAElement = document.createElement('p');
//     sem2GPAElement.textContent = 'Sem 2 GPA: ' + data.s2;
//     main.appendChild(sem2GPAElement);

//     var sem3GPAElement = document.createElement('p');
//     sem3GPAElement.textContent = 'Sem 3 GPA: ' + data.s3;
//     main.appendChild(sem3GPAElement);

//     var sem4GPAElement = document.createElement('p');
//     sem4GPAElement.textContent = 'Sem 4 GPA: ' + data.s4;
//     main.appendChild(sem4GPAElement);

//     var aggregateGPAElement = document.createElement('p');
//     aggregateGPAElement.textContent = 'Aggregate GPA: ' + data.cgpa;
//     main.appendChild(aggregateGPAElement);

//     var rank=calculateRank(data.cgpa, data.branch)
//     var rankElement1 = document.createElement('p');
//     rankElement1.textContent = 'Branch Rank: '+ rank['countBranch'];
//     main.appendChild(rankElement1);   
    
//     var rankElement2 = document.createElement('p');
//     rankElement2.textContent = 'College Rank: '+ rank['countTotal'];
//     main.appendChild(rankElement2);
// }
function display(data) {
    var main = document.getElementById('main-result-content');

    // Create and append elements for each piece of information
    var nameElement = document.createElement('p');
    nameElement.textContent = 'Name: ' + data.name;
    nameElement.classList.add('name'); // Apply the name class
    main.appendChild(nameElement);

    var rollNoElement = document.createElement('p');
    rollNoElement.textContent = 'Roll No: ' + data.roll;
    rollNoElement.classList.add('roll-no'); // Apply the roll-no class
    main.appendChild(rollNoElement);

    var sem1GPAElement = document.createElement('p');
    sem1GPAElement.textContent = 'Sem 1 GPA: ' + data.s1;
    sem1GPAElement.classList.add('sem-gpa'); // Apply the sem-gpa class
    main.appendChild(sem1GPAElement);

    var sem2GPAElement = document.createElement('p');
    sem2GPAElement.textContent = 'Sem 2 GPA: ' + data.s2;
    sem2GPAElement.classList.add('sem-gpa'); // Apply the sem-gpa class
    main.appendChild(sem2GPAElement);

    var sem3GPAElement = document.createElement('p');
    sem3GPAElement.textContent = 'Sem 3 GPA: ' + data.s3;
    sem3GPAElement.classList.add('sem-gpa'); // Apply the sem-gpa class
    main.appendChild(sem3GPAElement);

    var sem4GPAElement = document.createElement('p');
    sem4GPAElement.textContent = 'Sem 4 GPA: ' + data.s4;
    sem4GPAElement.classList.add('sem-gpa'); // Apply the sem-gpa class
    main.appendChild(sem4GPAElement);

    var aggregateGPAElement = document.createElement('p');
    aggregateGPAElement.textContent = 'Aggregate GPA: ' + data.cgpa;
    aggregateGPAElement.classList.add('sem-gpa'); // Apply the sem-gpa class to the aggregate GPA as well
    main.appendChild(aggregateGPAElement);

    var rank = calculateRank(data.cgpa, data.branch);
    var rankElement1 = document.createElement('p');
    rankElement1.textContent = 'Branch Rank: ' + rank['countBranch'];
    rankElement1.classList.add('rank'); // Apply the rank class
    main.appendChild(rankElement1);

    var rankElement2 = document.createElement('p');
    rankElement2.textContent = 'College Rank: ' + rank['countTotal'];
    rankElement2.classList.add('rank'); // Apply the rank class
    main.appendChild(rankElement2);
}


function onClickHandler() {
    var rollNo=document.getElementById('inputBox').value.toUpperCase();
    // console.log(rollNo)
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
