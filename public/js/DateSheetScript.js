
// Page markup is rendered by React (src/pages/datesheet.js); it calls window.initDateSheet() on mount.

function convertDateFormat(inputDate) {

    var parts = inputDate.split('-');


    if (parts.length === 3) {
        var day = parts[0].length == 1 ? '0' + parts[0] : parts[0];
        var month = parts[1];
        var year = parts[2];


        var newDate = year + month + day;

        return newDate;
    }
    else
        return "Invalid input date format";

}



function formatDateWithLineBreak(dateString) {
    const dateParts = dateString.split('-');

    if (dateParts.length !== 3) {
        return "Invalid date format";
    }

    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = date.toLocaleDateString("en-GB", { weekday: 'long' });

    return formattedDate + "<br>" + "(" + day + ")";
}


function addRow() {
    const table = document.getElementById("myTable");
    const newRow = table.insertRow(table.rows.length);
    const newCell1 = newRow.insertCell(0);
    const newCell2 = newRow.insertCell(1);
    const newCell3 = newRow.insertCell(2);

    const newDate = document.getElementById("newDate").value;
    const newCode = document.getElementById("newCode").value;
    const newSubject = document.getElementById("newSubject").value;

    newCell1.innerHTML = formatDateWithLineBreak(newDate);
    newCell2.innerHTML = newCode;
    newCell3.innerHTML = newSubject;

    document.getElementById("newDate").value = "";
    document.getElementById("newCode").value = "";
    document.getElementById("newSubject").value = "";
}


function byRoll(code) {
    var morning = [
        'AE201n', 'BT201n', 'CH201n', 'CE201n', 'CS201n', 'EC201n', 'EN201n', 'EN201', 'EP201n', 'EP201',
        'IT201n', 'MC201n', 'CS251', 'ME201n', 'PE201n', 'SE201n', 'EE201n', 'CO201n', 'CO201', 'AE201',
        'BT201', 'CE201', 'EC271a', 'IT203', 'ME261', 'AM101', 'MA101', 'AM-101', 'AE203n', 'AE203',
        'BT203n', 'BT203', 'CE203n', 'CS203n', 'CO203', 'EC203n', 'EE203n', 'EN203n', 'EN203', 'EP203n',
        'IT203n', 'IT201', 'SE203n', 'SE203', 'MC203n', 'MC203', 'ME203n', 'ME203', 'PE203n', 'PE203',
        'AP101a', 'AP101', 'CH303', 'AE205n', 'BT205n', 'BT205', 'CH205n', 'CE205n', 'CE205', 'ME205n',
        'CS205n', 'EN205n', 'EN205', 'EE205n', 'EE205', 'EC205n', 'EC205', 'EP205n', 'IT205n', 'MC205n',
        'MC205', 'PE205n', 'SE205n', 'PE205', 'EP205', 'CE101', 'EC101', 'EE105', 'AE207n', 'BT207n',
        'BT207', 'CE207n', 'CH207n', 'CH207', 'CS207n', 'EC207n', 'EC201', 'EE207n', 'EN207n', 'EP207n',
        'IT207n', 'MC207n', 'ME207n', 'PE207n', 'SE207n', 'SE205a', 'CO207', 'IT207', 'PE251', 'PE201',
        'CE207', 'ME207', 'CE251', 'EE207a', 'EN207', 'EP207', 'MC207', 'EE101', 'AC101a', 'AC101', 'ME107a',
        'ME107', 'ME101a', 'ME101', 'ME105a', 'ME105', 'ME101', 'ME105', 'AC101', 'EE101', 'AE209n', 'BT209n',
        'CH209n', 'CH201', 'CE209n', 'CS209n', 'EN209n', 'EE209n', 'EE201', 'EC209n', 'EP209n', 'IT209n', 'ME209n',
        'ME201', 'MC209n', 'PE209n', 'PE261', 'SE209n', 'MC251', 'MA261', 'EE251', 'EE261', 'EC251', 'EC207', 'SE207a',
        'PE207', 'MC201', 'CO101', 'EE203', 'CH203n', 'CH203', 'AE203'

    ]
    var morningFEC = [
        'AEC1', 'FEC16', 'AEC2', 'FEC15', 'AEC3', 'FEC14', 'AEC4', 'FEC12', 'AEC5', 'FEC10',
        'AEC6', 'FEC53', 'AEC10', 'FEC40', 'AEC11', 'FEC11', 'AEC12', 'FEC39', 'AEC13', 'FEC32',
        'AEC18', 'FEC9', 'AEC19', 'FEC46', 'AEC20', 'FEC49', 'AEC21', 'FEC50', 'AEC25', 'FEC51',
        'EN301', 'VAC3', 'FEC6', 'VAC5', 'FEC28', 'VAC9', 'FEC48', 'VAC11', 'FEC57', 'VAC13',
        'FEC54', 'VAC16', 'FEC27', 'VAC19', 'FEC58', 'VAC22', 'FEC25', 'VAC24', 'FEC56', 'VAC25',
        'FEC47', 'VAC27', 'FEC7', 'VAC28'

    ]
    var evening = [
        'AE317', 'BT323', 'CE313', 'CH307', 'CO411', 'EC311', 'EC319', 'EE429', 'EN317', 'EP321',
        'EP307', 'HU425', 'IT407', 'ME355a', 'MC319', 'SE327', 'SE323', 'MBASC213', 'BT325', 'CE317',
        'CE305', 'CH405', 'CO305', 'EC323', 'EE305', 'EE409', 'EE315', 'EE313', 'EN311', 'EP309',
        'EV351', 'HU327', 'HU407', 'ME353a', 'MBA-105', 'MBAMK221', 'PE353', 'AE321', 'BT305', 'CE309',
        'CH315', 'CE315', 'EC325', 'EE321', 'EE427', 'EE323', 'EE425', 'EE407', 'EE327', 'EP317',
        'EN305', 'EP305', 'EV301', 'HU305', 'HU325', 'HU403', 'HU413', 'IT427', 'MC305', 'ME367a',
        'ME351a', 'MBAMK213', 'PE305', 'SE305', 'CO327', 'IT323', 'CE303', 'EP301', 'CO325', 'CE307',
        'CE319', 'CO205', 'CO325', 'EC305', 'EC309', 'EE317', 'HU307', 'IT429', 'MBASC211', 'MBASC221', 'ME361a',
        'ME365a', 'PE351', 'SE325', 'SE409', 'CO303', 'IT303', 'CH319', 'CH305', 'EC307', 'EC313',
        'EE307', 'EP205', 'HU309', 'HU317', 'MBA107', 'MC307', 'PE361', 'SE209a', 'CO313', 'IT321',
        'EV355', 'IT433', 'IT307', 'IT351a', 'IT409', 'IT417', 'BT407', 'PE411', 'CE431', 'EN421',
        'CH429', 'MC405', 'PE417', 'EC457', 'ME435', 'EP423', 'CE415', 'AE411', 'AE303', 'BT303',
        'CO303', 'EC303', 'EE303', 'EN303', 'EP303', 'ME303', 'MC303', 'PE303', 'SE303a', 'CO423',
        'HU301', 'HU301a', 'MG301', 'AE407', 'BT411', 'CE435', 'CH409', 'CO431', 'EC455', 'EN407',
        'EP415', 'MC407', 'ME409', 'ME431', 'PE405', 'CO433', 'IT425', 'BT413', 'CE413', 'CH417',
        'EC409', 'EE357a', 'EN409', 'MC409', 'ME413', 'ME407', 'ME419', 'SE425', 'AE301', 'BT301',
        'CO415', 'CO427', 'AE413', 'BT421', 'CE423', 'CO429', 'EC407', 'EE325', 'EP427', 'EN411',
        'MC419', 'ME423', 'ME411', 'ME427', 'PE419', 'SE427', 'CE301', 'CH301', 'EC301', 'EE301',
        'IT301', 'MC301', 'ME301', 'PE301', 'SE301a', 'CO425', 'IT411', 'CO301', 'CO303E'

    ]


    const table = document.getElementById("myTable");
    const newRow = table.insertRow(table.rows.length);
    const newCell1 = newRow.insertCell(0);
    const newCell2 = newRow.insertCell(1);
    const newCell3 = newRow.insertCell(2);
    const newCell4 = newRow.insertCell(3);

    const newDate = myDates[code];
    const newCode = code;
    const newSubject = (myList[code].toUpperCase().replace(/[^a-zA-Z0-9:& ]/g, ""));

    if (morning.includes(code))
        newTime = '10:00AM - 1:00PM';
    else if (morningFEC.includes(code))
        newTime = '10:00AM - 12:00PM'
    else if (evening.includes(code))
        newTime = '2:00PM - 5:00PM';
    else
        newTime = 'Undefined';

    newCell1.innerHTML = formatDateWithLineBreak(newDate);
    newCell2.innerHTML = newCode;
    newCell3.innerHTML = newSubject;
    newCell4.innerHTML = newTime;

};

async function generateDateSheet() {
    var para = document.getElementById("p1");
    const table = document.getElementById('myTable');

    const tbody = table.querySelector('tbody');

    const rows = tbody.querySelectorAll('tr:not(:first-child)');

    // Remove all non-first rows from the table
    rows.forEach(function (row) {
        tbody.removeChild(row);
    });

    const newRoll = document.getElementById("newRoll").value.toUpperCase();
    const newName = await getName(newRoll);
    // Assuming newName and newRoll are already defined
    if (newName !== "null") {
        para.innerHTML = `${newName} (${newRoll})'s DateSheet`;
    } else {
        para.innerHTML = `${newRoll}'s DateSheet`;
    }
    var arr = studentData[newRoll];
    if (!arr) {
        para.innerHTML = "";
        alert("No exam data found for " + (newRoll || "this roll number") + ". Enter a valid roll number (e.g. 2K21/CO/262).");
        return;
    }


    let stampArr = [];
    for (let i = 0; i < arr.length; i++) {
        stampArr[i] = myDates[arr[i]] ? convertDateFormat(myDates[arr[i]]) : null;
    }


    const stampArrWithIndexes = stampArr.map((value, index) => ({ value, index }));

    // Sort the array of objects based on the stamp values
    stampArrWithIndexes.sort((a, b) => a.value - b.value);

    // Reorder the original arr based on the sorted stampArrWithIndexes
    const sortedArr = stampArrWithIndexes.map(obj => arr[obj.index]);


    for (var i = 0; i < arr.length; i++) {
        if (myDates[sortedArr[i]])
            byRoll(sortedArr[i]);
    }

}

window.initDateSheet = function () {
    document.getElementById("addRowButton").onclick = addRow;
    document.getElementById("addRollButton").onclick = generateDateSheet;
    document.getElementById("print").onclick = function () { print(); };
};

async function getName(rollNo) {
    let flag = 0;

    if (typeof data === 'undefined') return "null";
    for (let i = 0; i < data.length; i++) {
        if (data[i]['roll'] == rollNo) {
            return (data[i]['name'])
        }
    }
    if (flag == 0)
        return ("null")

}
