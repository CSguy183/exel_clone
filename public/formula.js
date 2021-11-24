for (let cell of allGridCells) {
    cell.addEventListener('blur', () => {
        let content = cell.textContent;
        let address = addressInput.value;
        let IdObj = get_rowId_colId_from_address(address);
        let CellObj = db[IdObj.rowId][IdObj.colId];

        if(CellObj.value == content){
            return;
        }

        if(CellObj.formula){
            removeFormula(address , CellObj.formula);
            CellObj.formula = "";
        }

        setUI(content, IdObj.rowId, IdObj.colId);
    });
}

formulaInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && formulaInput.value != '') {
        let formula = formulaInput.value;
        let address = addressInput.value;
        let { rowId, colId } = get_rowId_colId_from_address(address);

        let value = evaluateFormula(formula);
        setUI(value, rowId, colId);
        db[rowId][colId].formula = formula;

        setDependent(formula, address);
        // console.log(db);
    }
});

function evaluateFormula(formula) {
    // formula : ( A1 + A2 )
    let formulaContent = formula.split(' ');
    
    // formula content : ['(', 'A1', '+', 'A2', ')']
    for (let content of formulaContent) {
        let ascii = content.charCodeAt(0);
        
        // if content is address of a cell
        if (ascii >= 65 && ascii <= 90) {
            let { rowId, colId } = get_rowId_colId_from_address(content);
            let value = db[rowId][colId].value;
            formula = formula.replace(content, value);
        }
    }

    // formula : ( "10" + "20" )
    let result = eval(formula);
    return result;
}

function removeFormula(address, formula){
    let formulaContent = formula.split(' ');
    
    // formula content : ['(', 'A1', '+', 'A2', ')']
    for (let content of formulaContent) {
        let ascii = content.charCodeAt(0);
        
        // if content is address of a cell
        if (ascii >= 65 && ascii <= 90) {
            let { rowId, colId } = get_rowId_colId_from_address(content);
            let cellObj = db[rowId][colId];
            let IdxOfChild = cellObj.dependents.indexOf(address);
            cellObj.dependents.splice(IdxOfChild, 1);
        }
    }

}

function setUI(value, rid, cid) {
    let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${rid}"][colId="${cid}"]`);
    cellToBeChanged.textContent = value;
    db[rid][cid].value = value;

    let dependents = db[rid][cid].dependents;
    for(let child of dependents){
        let {rowId, colId} = get_rowId_colId_from_address(child);
        let result = evaluateFormula(db[rowId][colId].formula);
        setUI(result, rowId, colId);
    }

}

function setDependent(formula, address){
    let formulaContent = formula.split(' ');
    
    // formula content : ['(', 'A1', '+', 'A2', ')']
    for (let content of formulaContent) {
        let ascii = content.charCodeAt(0);
        
        // if content is address of a cell
        if (ascii >= 65 && ascii <= 90) {
            let { rowId, colId } = get_rowId_colId_from_address(content);
            let cellObj = db[rowId][colId];
            cellObj.dependents.push(address);
        }
    }

}