let downloadBtn = document.querySelector('.save_file_icon');

downloadBtn.addEventListener('click', ()=>{
    let a = document.createElement('a');

    let StringCode = encodeURIComponent(JSON.stringify(sheetsDB));
    let dataStr = "data:text/json;charset=utf-8," + StringCode;

    a.href = dataStr;
    a.download = 'file.json';
    a.click();
});

let openBtn = document.querySelector('.open_file_icon');
let openFileInput = document.getElementById('open_file');

openBtn.addEventListener('click', ()=>{
    openFileInput.click();
});

openFileInput.addEventListener('change', ()=>{
    // get all files
    let filesArr = openFileInput.files;
    // select first file
    let file = filesArr[0];
    // file reader -> browser built in API
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', (event)=>{
        const jsonData = JSON.parse(event.target.result);
        sheetsDB = jsonData;
        db = sheetsDB[0];

        sheetsList.children = [];

        setinitUI();

        setSheets();
    });
});

function setSheets(){
    
    for(let child of sheetsList.childNodes){
        sheetsList.removeChild(child);
    }
    sheetsList.innerHTML = "";
    for(let i=0; i<sheetsDB.length; i++){
        openSheet();
    }
}

let newFileIcon = document.querySelector('.new_file_icon');
newFileIcon.addEventListener('click', ()=>{
    // db reset\
    
    sheetsDB = [];
    // db = [];
    initDB();

    db = sheetsDB[0];

    // map ui to match new changes
    setinitUI();
    setSheets();

});

function setinitUI(){
    
    for(let i=0; i<100; i++){
        for(let j=0; j<26; j++){
            let cellObj = db[i][j];
            let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${i}"][colId="${j}"]`);

            cellToBeChanged.innerText = cellObj.value;
            cellToBeChanged.style.color = cellObj.color;
            cellToBeChanged.style.backgoundColor = cellObj.bgcolor;
            cellToBeChanged.style.fontFamily = cellObj.fontFamily;
            cellToBeChanged.style.fontSize = cellObj.fontSize;
            cellToBeChanged.style.fontStyle = cellObj.bold;
            cellToBeChanged.style.textDecoration = cellObj.underline;
            cellToBeChanged.style.fontStyle = cellObj.italic;
            cellToBeChanged.style.textAlign = cellObj.alignment;
        }
    }
}

