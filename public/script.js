// creating top row from A to Z
let topRow = document.querySelector('.top_row');

for (let i = 0; i < 26; i++) {
    let div = document.createElement('div');
    div.setAttribute('class', 'cell');
    div.textContent = String.fromCharCode(65 + i);

    topRow.appendChild(div);
}


// creating left Col from 1 to 100
let leftCol = document.querySelector('.left_col');

for (let i = 1; i <= 100; i++) {
    let div = document.createElement('div');
    div.setAttribute('class', 'cell');
    div.textContent = i;

    leftCol.appendChild(div);
}

// creating db for storing info about each cell
let sheetsDB = [];
function initDB(){
    let db = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cellObj = {
                color: 'black',
                bgColor: 'white',
                fontSize: 12,
                fontFamily: 'Arial',
                bold: 'normal',
                italic: 'none',
                underline: 'none',
                alignment: 'none',
                value:"",
                formula:"",
                dependents : [],
            }
    
            row.push(cellObj);
        }
        db.push(row);
    }

    sheetsDB.push(db);
}

initDB();
let db = sheetsDB[0];

// console.log(db);

// creating grid cells

let grid = document.querySelector('.grid');
for (let i = 0; i < 100; i++) {
    let row = document.createElement('div');
    row.setAttribute('class', 'row');

    for (let j = 0; j < 26; j++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'cell');
        div.setAttribute('contentEditable', true);
        div.setAttribute('rowId', i);
        div.setAttribute('colId', j);
        // div.textContent = i + "," + j;

        row.appendChild(div);
    }

    grid.appendChild(row);
}

let allGridCells = document.querySelectorAll('.grid .cell');
let addressInput = document.querySelector('.address_input');
let fontSizeInput = document.querySelector('.font_size_container');
let fontFamilyInput = document.querySelector('.font_family_container');
let BoldIcon = document.querySelector('.bold_icon');
let ItalicsIcon = document.querySelector('.italic_icon');
let UnderlineIcon = document.querySelector('.underline_icon');
let alignmentContainer = document.querySelector('.alignment_container');
let formulaInput = document.querySelector('.formula_input');
let addSheetIcon = document.querySelector('.addSheetIcon');
let sheetsList = document.querySelector('.sheets-list');

for (let cell of allGridCells) {
    cell.addEventListener('click', (event) => {

        let prevAddress = addressInput.value;
        if (prevAddress != "") {
            let IdObj = get_rowId_colId_from_address(prevAddress);
            let prevCell = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);
            prevCell.style.border = '0.1px solid rgb(223, 221, 221)';
            prevCell.style.borderTop = 'none';
            prevCell.style.borderRight = 'none';
        }

        let targetCell = event.target;
        let rowId = targetCell.getAttribute('rowId');
        let colId = targetCell.getAttribute('colId');

        rowId = Number(rowId);
        colId = Number(colId);

        addressInput.value = String.fromCharCode(colId + 65) + (rowId + 1);
        targetCell.style.border = '2px solid #686de0';

        // ******** 2 way binding *********

        let cellObj = db[rowId][colId];
        fontFamilyInput.value = cellObj.fontFamily;
        fontSizeInput.value = cellObj.fontSize;
        if (cellObj.bold == 'bold') {
            BoldIcon.classList.add('selected');
        }
        else {
            BoldIcon.classList.remove('selected');
        }

        if (cellObj.italic == 'italic') {
            ItalicsIcon.classList.add('selected');
        }
        else {
            ItalicsIcon.classList.remove('selected');
        }

        if (cellObj.underline == 'underline') {
            UnderlineIcon.classList.add('selected');
        }
        else {
            UnderlineIcon.classList.remove('selected');
        }

        formulaInput.value = cellObj.formula;
        
    });
}

let firstCell = document.querySelector('.grid .cell[rowId="0"][colId="0"]');
firstCell.click();
// firstCell.style.border = '2px solid green';

function get_rowId_colId_from_address(address) {

    let asciiValue = address.charCodeAt(0);
    let colId = asciiValue - 65;
    let rowId = Number(address.substring(1)) - 1;
    return {
        rowId: rowId,
        colId: colId
    }
}

// ****** add new sheet feature ************


let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click", function (e) {
    //    list of sheet me se sabme se aap remove active sheet
    for (let i = 0; i < sheetsList.children.length; i++) {
        sheetsList.children[i].classList.remove("active-sheet")
    }
    // given sheet add kar lo 
    firstSheet.classList.add("active-sheet");
    db = sheetsDB[0];
    setinitUI();

});


addSheetIcon.addEventListener('click', ()=>{
    let numOfSheets = sheetsList.children.length;
    let newSheet = document.createElement('div');
    newSheet.setAttribute('class', 'sheet');
    newSheet.setAttribute('sheetIdx', `${numOfSheets}`);
    newSheet.textContent = `Sheet ${numOfSheets+1}`;
    sheetsList.appendChild(newSheet);

    initDB();

    newSheet.addEventListener("click", function () {
        for (let i = 0; i < sheetsList.children.length; i++) {
            sheetsList.children[i].classList.remove("active-sheet")
        }
        newSheet.classList.add("active-sheet");
        let idx = newSheet.getAttribute("sheetIdx");
        db = sheetsDB[idx];
        setinitUI();
    });
});

function openSheet(){
    let numOfSheets = sheetsList.children.length;
    let newSheet = document.createElement('div');
    newSheet.setAttribute('class', 'sheet');
    newSheet.setAttribute('sheetIdx', `${numOfSheets}`);
    newSheet.textContent = `Sheet ${numOfSheets+1}`;
    sheetsList.appendChild(newSheet);

    newSheet.addEventListener("click", function () {
        for (let i = 0; i < sheetsList.children.length; i++) {
            sheetsList.children[i].classList.remove("active-sheet")
        }
        newSheet.classList.add("active-sheet");
        let idx = newSheet.getAttribute("sheetIdx");
        db = sheetsDB[idx];
        setinitUI();
    });
}

// make curr sheet as active
sheetsList.addEventListener('click', (event)=>{
    let target = event.target;

    let allSheets = sheetsList.children;
    for(let sheet of allSheets){
        sheet.classList.remove('active-sheet');
    }

    target.classList.add('active-sheet');

    db = sheetsDB[target.getAttribute('sheetIdx')];

    firstCell.click();

    setinitUI();
});
