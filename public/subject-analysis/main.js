// Branch is chosen with the COE / Other branches toggle on the page (remembered across visits)
const isCOE = localStorage.getItem('sa-isCOE') === 'true';

function setBranch(coe) {
    localStorage.setItem('sa-isCOE', String(coe));
    location.reload();
}

// Set the slottocode based on the chosen branch
let slottocode;
if (isCOE) {
    slottocode = slottocodeCOE;
} else {
    slottocode = slottocodeGeneral;
}


let selectedSlots = [
    {slot: 'CORE', code: 'DCC1'},
    {slot: 'CORE', code: 'DCC2'},    
    {slot: 'CORE', code: 'DCC3'},
    {slot: 'CORE', code: 'HMC'},

]; // Array to store selected slots and codes

function renderSlots(slots) {
    const container = document.getElementById('slot-container');
    const infoContainer = document.getElementById('info-container');
    const selectedContainer = document.getElementById('selected-container');
    const creditCountContainer = document.getElementById('credit-count');
    updateInfo();

    for (const [slot, codes] of Object.entries(slots)) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'slot';

        const slotHeading = document.createElement('h3');
        slotHeading.innerText = slot;
        slotDiv.appendChild(slotHeading);

        for (const code of codes) {
            const codeBtn = document.createElement('button');
            codeBtn.className = 'code-btn';
            codeBtn.innerText = code;
            codeBtn.addEventListener('click', () => {
                    updateInfo(slot, code);
            });
            slotDiv.appendChild(codeBtn);
        }

        container.appendChild(slotDiv);
        updateSelectedSubjects();
    }

    function updateInfo(slot, code) {
        const subjectName = codetoname[code] || 'Subject Name Not Found';
        infoContainer.innerHTML = `<p>Slot: ${slot}</p><p>Subject Name: ${subjectName}</p><p>Subject Code: ${code}</p>`;
        
        // Add "Select" button
        const selectBtn = document.createElement('button');
        selectBtn.innerText = 'Select';
        selectBtn.addEventListener('click', () => {
            if (code && !isCodeRed(slot, code) && totalCredits+4<=32) 
            {
                console.log(creditCountContainer.innerText<32);
                if(code==="MOOC302" || code==="MOOC304" ){
                    addToSelectedArray(slot, "MOOC302");
                    addToSelectedArray(slot, "MOOC304");

                    updateCodeButtonStyle(slot, "MOOC302");
                    updateSelectedSubjects();
                    updateCodeButtonStyle(slot, "MOOC304");
                    updateSelectedSubjects();

                }
                else{
                    addToSelectedArray(slot, code);
                    updateCodeButtonStyle(slot, code);
                    updateSelectedSubjects();
                }
            }
            else{
                if(!(totalCredits+4<=32))
                    alert("credits completed");
                else
                    alert("CANT SELECT");
            }
        });
        infoContainer.appendChild(selectBtn);
    }

    function addToSelectedArray(slot, code) {
        // Check if the code is undefined or red
        if (code && !isCodeRed(slot, code)) {
            selectedSlots.push({ slot, code });
            console.log('Selected Slots:', selectedSlots);
            updateCreditCount();
        }
    }

    function updateCodeButtonStyle(slot, code) {
        const codeBtns = document.querySelectorAll('.code-btn');
        let ourSubjects = slottocode[slot];

        codeBtns.forEach(btn => {
            if (ourSubjects.includes(btn.innerText)) {
                btn.classList.add('code-btn-selected');
            }
        });
    }

    function updateSelectedSubjects() {
        selectedContainer.innerHTML = ''; // Clear existing content

        selectedSlots.forEach(selected => {
            const selectedBtn = document.createElement('button');
            selectedBtn.className = 'selected-btn';
            selectedBtn.innerText = `${selected.slot} - ${selected.code}`;
            selectedContainer.appendChild(selectedBtn);
        });
    }

    function isCodeRed(slot, code) {
        const codeBtns = document.querySelectorAll('.code-btn-selected');
        return Array.from(codeBtns).some(btn => btn.innerText === code && btn.closest('.slot').querySelector('h3').innerText === slot);
    }
let totalCredits=0;
    function updateCreditCount() {
        totalCredits = 0;

        selectedSlots.forEach(selected => {
            // Check for MOOC subjects and update credits accordingly
            if (selected.code === 'MOOC302' || selected.code === 'MOOC304') {
                totalCredits += 2;
            } else {
                totalCredits += 4;
            }
        });

        creditCountContainer.innerText = `Total Credits: ${totalCredits}`;
    }
}
window.onload = function () {
    document.querySelectorAll('[data-coe]').forEach(btn => {
        const coe = btn.dataset.coe === 'true';
        btn.setAttribute('aria-pressed', String(coe === isCOE));
        btn.addEventListener('click', () => { if (coe !== isCOE) setBranch(coe); });
    });

    renderSlots(slottocode);
    

};
