// let downloadBtn = document.querySelector('.save_file_icon');

// downloadBtn.addEventListener('click', ()=>{
//     let a = document.createElement('a');

//     let StringCode = encodeURIComponent(JSON.stringify(sheetsDB));
//     let dataStr = "data:text/json;charset=utf-8," + StringCode;

//     a.href = dataStr;
//     a.download = 'file.json';
//     a.click();
// });

// let openBtn = document.querySelector('.open_file_icon');
// let openFileInput = document.getElementById('open_file');

// openBtn.addEventListener('click', ()=>{
//     openFileInput.click();
// });

// openFileInput.addEventListener('change', ()=>{
//     // get all files
//     let filesArr = openFileInput.files;
//     // select first file
//     let file = filesArr[0];
//     // file reader -> browser built in API
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.addEventListener('load', (event)=>{
//         const jsonData = JSON.parse(event.target.result);
//         sheetsDB = jsonData;
//         db = sheetsDB[0];

//         sheetsList.children = [];

//         setinitUI();

//         setSheets();
//     });
// });

// function setSheets(){
//     for(let i=0; i<sheetsDB.length-1; i++){
//         openSheet();
//     }
// }

// let newFileIcon = document.querySelector('.new_file_icon');
// newFileIcon.addEventListener('click', ()=>{
//     // db reset
//     sheetsDB = [];
//     // db = [];
//     initDB();

//     // map ui to match new changes
//     setinitUI();

// });

// function setinitUI(){
    
//     for(let i=0; i<100; i++){
//         for(let j=0; j<26; j++){
//             let cellObj = db[i][j];
//             let cellToBeChanged = document.querySelector(`.grid .cell[rowId="${i}"][colId="${j}"]`);

//             cellToBeChanged.innerText = cellObj.value;
//             cellToBeChanged.style.color = cellObj.color;
//             cellToBeChanged.style.backgoundColor = cellObj.bgcolor;
//             cellToBeChanged.style.fontFamily = cellObj.fontFamily;
//             cellToBeChanged.style.fontSize = cellObj.fontSize;
//             cellToBeChanged.style.fontStyle = cellObj.bold;
//             cellToBeChanged.style.textDecoration = cellObj.underline;
//             cellToBeChanged.style.fontStyle = cellObj.italic;
//             cellToBeChanged.style.textAlign = cellObj.alignment;
//         }
//     }
// }

let downloadBtn = document.querySelector(".fa-save");
let openBtn = document.querySelector(".open_file_icon");
let openInput = document.getElementById('open_file');
let newInput = document.querySelector(".new_file_icon");

downloadBtn.addEventListener("click", function (e) {
    // anchor create
    let a = document.createElement("a");
    // file put -> db array 
    var StringCode = encodeURIComponent(JSON.stringify(sheetsDb));
    var dataStr = "data:text/json;charset=utf-8," +
        StringCode;
    a.href = dataStr;
    a.download = "file.json";
    // // anchor click
    a.click();
    // styling -> pass
    // var ws = XLSX.utils.json_to_sheet(db);
    // var wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    // XLSX.writeFile(wb, "file.xlsx");
})
openBtn.addEventListener("click", function (e) {
    openInput.click();
})
openInput.addEventListener("change", function (e) {
    // files array
    let filesArr = openInput.files;
    // console.log(filesArr);
    // first file select
    // first file get  
    let file = filesArr[0];
    // fileReader -> browser inbuilt
    const reader = new FileReader();
    // read as text 
    reader.readAsText(file);
    reader.addEventListener('load', (event) => {
        // img.src = event.target.result;
        let JSONdata = JSON.parse(event.target.result);
        sheetsDb = JSONdata
        db = sheetsDb[0];
        sheetsList.children = [];
        setinitUI();
        setSheets();
    });
})
function setSheets() {
    // console.log(sheetsDb.length)
    for (let i = 0; i < sheetsDb.length - 1; i++) {
        openSheet();
    }
}
newInput.addEventListener("click", function () {
    // set db to empty
    sheetsDb = [];
    // set initial entries
    initDB(); // -> initial Db
    // ui -> map accoriding to new db
    setinitUI();
})
function setinitUI() {
    for (let i = 0; i < 100; i++) {

        for (let j = 0; j < 26; j++) {
            //    set all the properties on ui with matchiing rid,cid
            let cellObject = db[i][j];
            let tobeChangedCell = document.querySelector(`.grid .cell[rowId='${i}'][colId='${j}']`);
            // console.log(cellObject.value);
            // console.log(tobeChangedCell)
            tobeChangedCell.innerText = cellObject.value;
            tobeChangedCell.style.color = cellObject.color;
            tobeChangedCell.style.backgroundColor = cellObject.backgroundColor;
            tobeChangedCell.style.fontFamily = cellObject.fontFamily;
            tobeChangedCell.style.textAlign = cellObject.halign;
            tobeChangedCell.style.textDecoration = cellObject.underline == false ? "none" : "underline";
            tobeChangedCell.style.fontStyle = cellObject.italic == false ? "normal" : "italic";
            tobeChangedCell.style.fontSize = cellObject.fontSize;
        }
    }
}