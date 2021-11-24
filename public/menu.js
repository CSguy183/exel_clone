// changing font size
fontSizeInput.addEventListener('change', ()=>{
    let fontSize = fontSizeInput.value;
    let address = addressInput.value;

    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    cellToBeChanged.style.fontSize = fontSize+"px";
    db[IdObj.rowId][IdObj.colId].fontSize = fontSize;
});


// changing font family

fontFamilyInput.addEventListener('change', ()=>{
    let fontFamily = fontFamilyInput.value;
    let address = addressInput.value;

    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    cellToBeChanged.style.fontFamily = fontFamily;
    db[IdObj.rowId][IdObj.colId].fontFamily = fontFamily;
});

// toggling bold
let isBold = false;
BoldIcon.addEventListener('click',()=>{
    let address = addressInput.value;

    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    if(!isBold){
        cellToBeChanged.style.fontWeight = "bold";
        BoldIcon.classList.add('selected');
        db[IdObj.rowId][IdObj.colId].bold = 'bold';
    }
    else{
        cellToBeChanged.style.fontWeight = "normal";
        db[IdObj.rowId][IdObj.colId].bold = 'normal';
        BoldIcon.classList.remove('selected');
    }
    isBold = !isBold;
});

// toggling italics

let isItalic = false;
ItalicsIcon.addEventListener('click',()=>{
    let address = addressInput.value;

    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    if(!isItalic){
        cellToBeChanged.style.fontStyle = "italic";
        ItalicsIcon.classList.add('selected');
        db[IdObj.rowId][IdObj.colId].italic = 'italic';
    }
    else{
        cellToBeChanged.style.fontStyle = "normal";
        db[IdObj.rowId][IdObj.colId].italic = 'none';
        ItalicsIcon.classList.remove('selected');
    }
    isItalic = !isItalic;
});


// toggling underline

let isUnderline = false;
UnderlineIcon.addEventListener('click',()=>{
    let address = addressInput.value;

    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    if(!isUnderline){
        cellToBeChanged.style.textDecoration = "underline";
        UnderlineIcon.classList.add('selected');
        db[IdObj.rowId][IdObj.colId].underline = 'underline';
    }
    else{
        cellToBeChanged.style.textDecoration = "none";
        UnderlineIcon.classList.remove('selected');
        db[IdObj.rowId][IdObj.colId].underline = 'none';
    }
    isUnderline = !isUnderline;
});

// changing alignment

alignmentContainer.addEventListener('click', (event)=>{
    let target = event.target;
    // console.log(target);
    if(target.classList.contains('icon_container') == false && target.classList.contains('alignment_container') == false ){
        let len = target.classList.length;
        let alignment = target.classList[len-1];

        // console.log(alignment);

        let address = addressInput.value;

        let IdObj = get_rowId_colId_from_address(address);
        let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

        cellToBeChanged.style.textAlign = String(alignment);
        // target.classList.add('selected');
    }    
});

// changing text color

let textColorInput = document.querySelector('.fill_drip_icon');
let hiddenColorPalette = document.querySelector('.textColorPalette');

textColorInput.addEventListener('click', ()=>{
    hiddenColorPalette.click();
});

hiddenColorPalette.addEventListener('change', ()=>{
    let color = hiddenColorPalette.value;

    let address = addressInput.value;

    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    cellToBeChanged.style.color = color;
    db[IdObj.rowId][IdObj.colId].color = color;
});

let bgColorInput = document.querySelector('.tint_icon');
let bgColorPalette = document.querySelector('.bgColorPalette');

bgColorInput.addEventListener('click', ()=>{
    bgColorPalette.click();
});

bgColorPalette.addEventListener('change', ()=>{
    let color = bgColorPalette.value;

    let address = addressInput.value;
    
    let IdObj = get_rowId_colId_from_address(address);
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${IdObj.rowId}"][colId="${IdObj.colId}"]`);

    cellToBeChanged.style.backgroundColor = color;
    db[IdObj.rowId][IdObj.colId].bgColor = color;
});