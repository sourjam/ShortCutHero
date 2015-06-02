//Variables
var lightOpacity = 0.5; //unselected play field color
var darkOpacity = 0.9; // selected play field color
var y = 522; // heights for all play fields
var yy = y;
var chromeY = 522;
var wordY = 522;
var photoshopY = 522;
var sublimeY = 522;
var rand;
var playerScored = false;
var motion = false;
var pscore = 0; // player right
var pwrong = 0; // player wrong
var badArray = []; // wrong answers are stored in an array

var timerBlock; //for time until next block drop

// Vars for remembering player scope
var progScope = ["chrome","word","photoshop","sublime"];
var currScope = 0;
var blockScope = 0;
// Arrays for storing the current move for each scope
var chromeArr = [];
var wordArr = [];
var photoshopArr = [];
var sublimeArr = [];
var chromeCount = 0;
var wordCount = 0;
var photoshopCount = 0;
var sublimeCount = 0;
var currentChrome;
var currentWord;
var currentPhotoshop;
var currentSublime;
var testArray;

// Storing position of dropped blocks on field
var posIndex = [0, 0, 0, 0];
var posArray = [522, 460, 398, 336, 274, 212, 150, 88];
// Converting keycodes to keys for mousetrap.js
var alphaArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];
// Arrays for program shortcuts
var chromecuts = [
    {name: "Open File", kcode01: "o", kcode02: "ctrl"},
    {name: "Switch to Last Tab", kcode01: "9", kcode02: "ctrl"},
    {name: "History", kcode01: "h", kcode02: "ctrl"},
    {name: "Downloads", kcode01: "j", kcode02: "ctrl"},
    {name: "Highlight URL", kcode01: "l", kcode02: "ctrl"},
    {name: "Search", kcode01: "k", kcode02: "ctrl"},
    {name: "Print Page", kcode01: "p", kcode02: "ctrl"},
    {name: "Find", kcode01: "f", kcode02: "ctrl"},
    {name: "Reload", kcode01: "r", kcode02: "ctrl"},
    {name: "Open Source", kcode01: "u", kcode02: "ctrl"},
    {name: "Save Bookmark", kcode01: "d", kcode02: "ctrl"},
    {name: "Normal Size", kcode01: "0", kcode02: "ctrl"},
    {name: "Save Page", kcode01: "s", kcode02: "ctrl"}
    ];
var wordcuts = [
    {name: "Open", kcode01: "o", kcode02: "ctrl"},
    {name: "Find", kcode01: "f", kcode02: "ctrl"},
    {name: "Save", kcode01: "s", kcode02: "ctrl"},
    {name: "Print", kcode01: "p", kcode02: "ctrl"},
    {name: "Cut", kcode01: "x", kcode02: "ctrl"},
    {name: "Copy", kcode01: "c", kcode02: "ctrl"},
    {name: "Paste", kcode01: "v", kcode02: "ctrl"},
    {name: "Bold", kcode01: "b", kcode02: "ctrl"},
    {name: "Italic", kcode01: "i", kcode02: "ctrl"},
    {name: "Underline", kcode01: "u", kcode02: "ctrl"},
    {name: "Undo", kcode01: "z", kcode02: "ctrl"},
    {name: "Redo", kcode01: "y", kcode02: "ctrl"},
    {name: "Go To", kcode01: "g", kcode02: "ctrl"},
    {name: "Replace Text", kcode01: "h", kcode02: "ctrl"},
    {name: "Insert Link", kcode01: "k", kcode02: "ctrl"},
    {name: "Select All", kcode01: "a", kcode02: "ctrl"},
    {name: "Center Text", kcode01: "e", kcode02: "ctrl"},
    {name: "Justify Text", kcode01: "j", kcode02: "ctrl"},
    {name: "Right Align", kcode01: "r", kcode02: "ctrl"},
    {name: "Left Align", kcode01: "l", kcode02: "ctrl"}
    ];
var photoshopcuts = [
    {name: "Move", kcode01: "v"},
    {name: "Marquee", kcode01: "m"},
    {name: "Lasso", kcode01: "l"},
    {name: "Magic Wand", kcode01: "w"},
    {name: "Crop", kcode01: "c"},
    {name: "Eyedropper", kcode01: "i"},
    {name: "Spot Healing Brush", kcode01: "j"},
    {name: "Brush", kcode01: "b"},
    {name: "Clone Stamp", kcode01: "s"},
    {name: "History Brush", kcode01: "y"},
    {name: "Eraser", kcode01: "e"},
    {name: "Gradient", kcode01: "g"},
    {name: "Dodge", kcode01: "o"},
    {name: "Pen", kcode01: "p"},
    {name: "Type", kcode01: "t"},
    {name: "Path Selection", kcode01: "a"},
    {name: "Rectangle", kcode01: "u"},
    {name: "3D Object Rotate", kcode01: "k"},
    {name: "3D Camera Rotate", kcode01: "n"},
    {name: "Hand", kcode01: "h"},
    {name: "Zoom", kcode01: "z"}
    ];
var sublimecuts = [
    {name: "Find", kcode01: "f", kcode02: "ctrl"},
    {name: "Save", kcode01: "s", kcode02: "ctrl"},
    {name: "Cut", kcode01: "x", kcode02: "ctrl"},
    {name: "Copy", kcode01: "c", kcode02: "ctrl"},
    {name: "Paste", kcode01: "v", kcode02: "ctrl"},
    {name: "Join line", kcode01: "j", kcode02: "ctrl"},
    {name: "Goto word", kcode01: ";", kcode02: "ctrl"},
    {name: "Quick-open", kcode01: "p", kcode02: "ctrl"},
    {name: "Goto Line", kcode01: "g", kcode02: "ctrl"},
    {name: "Undo", kcode01: "z", kcode02: "ctrl"},
    {name: "Soft Undo", kcode01: "u", kcode02: "ctrl"},
    {name: "Redo", kcode01: "y", kcode02: "ctrl"},
    {name: "Goto Symbol", kcode01: "r", kcode02: "ctrl"},
    {name: "Replace", kcode01: "h", kcode02: "ctrl"},
    {name: "Select All", kcode01: "a", kcode02: "ctrl"},
    {name: "Jump parentheses", kcode01: "m", kcode02: "ctrl"},
    {name: "Select Word", kcode01: "d", kcode02: "ctrl"},
    {name: "Select Line", kcode01: "l", kcode02: "ctrl"}
    ];

// Change play field scope to the right
addEventListener('keydown', function _rightScope(event){
    if (event.keyCode == 39 && currScope < progScope.length - 1) {
        document.getElementById(progScope[currScope]+"area").style.opacity = lightOpacity;
        document.getElementById(progScope[currScope]).style.opacity = lightOpacity;
        currScope += 1;
        document.getElementById(progScope[currScope]+"area").style.opacity = darkOpacity;  
        document.getElementById(progScope[currScope]).style.opacity = darkOpacity;   
        //console.log("switched to: "+progScope[currScope]);
    }else if (event.keyCode == 39 && currScope == progScope.length - 1) {
        document.getElementById(progScope[currScope]+"area").style.opacity = lightOpacity;
        document.getElementById(progScope[currScope]).style.opacity = lightOpacity;
        currScope = 0;
        document.getElementById(progScope[currScope]+"area").style.opacity = darkOpacity;
        document.getElementById(progScope[currScope]).style.opacity = darkOpacity;  
        //console.log("switched to: "+progScope[currScope]);
    }
});
// Change play field scope to the left
addEventListener('keydown', function _leftScope(event){
    if (event.keyCode == 37 && currScope > 0) {
        document.getElementById(progScope[currScope]+"area").style.opacity = lightOpacity;
        document.getElementById(progScope[currScope]).style.opacity = lightOpacity;
        currScope -= 1;
        document.getElementById(progScope[currScope]+"area").style.opacity = darkOpacity;
        document.getElementById(progScope[currScope]).style.opacity = darkOpacity;
        //console.log("switched to: "+progScope[currScope]);
    }else if (event.keyCode == 37 && currScope == 0) {
        document.getElementById(progScope[currScope]).style.opacity = lightOpacity;            
        document.getElementById(progScope[currScope]+"area").style.opacity = lightOpacity;
        currScope = progScope.length -1;
        document.getElementById(progScope[currScope]+"area").style.opacity = darkOpacity;
        document.getElementById(progScope[currScope]).style.opacity = darkOpacity;
        //console.log("switched to: "+progScope[currScope]);
    }
});

// anima.js initialize
var world = anima.world();
function animaHandler(tempid){
    window.play = world.add(document.getElementById('container'));
    window.dangle = world.add(document.getElementById(tempid));
};
function animaDropper(tempid){
    window.play = world.add(document.getElementById('container'));
    window.drople = world.add(document.getElementById(tempid));
};
// Copy for wrong text
var badMojos = ['Incorrect!'];

// Knuth Shuffle Function
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};
// Knuth Shuffle Function

function addPoint(){
  pscore += 1;  
}; // add point to player score

function getRandomWhole(min, max) {
  var rand = Math.random() * (max - min) + min;
    return Math.round(rand);
}

// Remove last object in array when player acts
function popArray(string){
    switch(string){
        case "chromecuts":
            chromecuts.pop();
        break;
        case "wordcuts":
            wordcuts.pop();
        break;
        case "photoshopcuts":
            photoshopcuts.pop();
        break;
        case "sublimecuts":
            sublimecuts.pop();
        break;
    }
}
//Increase count of blocks
function upCount(string){
    switch(string){
        case "chrome":
            chromeCount += 1;
            return chromeCount;
        break;
        case "word":
            wordCount += 1;
            return wordCount;
        break;
        case "photoshop":
            photoshopCount += 1;
            return photoshopCount;
        break;
        case "sublime":
            sublimeCount += 1;
            return sublimeCount;
        break;
    }
}
//Return current count of blocks
function returnCount(string){
    switch(string){
        case "chrome":
            return chromeCount;
        break;
        case "word":
            return wordCount;
        break;
        case "photoshop":
            return photoshopCount;
        break;
        case "sublime":
            return sublimeCount;
        break;
    }
}
//Return height of play field depending on blocks dropped
function returnColumns(string) {
    switch(string){
        case "chrome":
            return chromeY;
            break;
        case "word":
            return wordY;
            break;
        case "photoshop":
            return photoshopY;
            break;
        case "sublime":
            return sublimeY;
            break;
    }
}
// Update height of active play field based on height of dropped block for right answer
function updateColumn(string){ 
    switch(string){
     case "chrome":
            chromeY = chromeY - 62;
            break;
        case "word":
            wordY = wordY - 62;
            break;
        case "photoshop":
            photoshopY = photoshopY - 62;
            break;
        case "sublime":
            sublimeY = sublimeY - 62;
            break;
    }
}
// Update height of active play field based on height of wrong answer block
function plusColumn(string) { 
    switch(string){
     case "chrome":
            chromeY = chromeY + 62;
            //console.log(chromeY);
            break;
        case "word":
            wordY = wordY + 62;
            //console.log(wordY);
            break;
        case "photoshop":
            photoshopY = photoshopY + 62;
            //console.log(photoshopY);
            break;
        case "sublime":
            sublimeY = sublimeY + 62;
            //console.log(sublimeY);
            break;
    }
}
// Return length of shortcut array for player moves
function returnArraylength(string){
    switch(string){
        case "chrome":
            return chromeArr.length;
            break;
        case "word":
            return wordArr.length;
            break;
        case "photoshop":
            return photoshopArr.length;
            break;
        case "sublime":
            return sublimeArr.length;
            break;
    }
}
// Adding id and order position of block to current object
function addArrayid(string, id, index){
    switch(string){
        case "chrome":
            currentChrome.id = id;
            currentChrome.pos = index + 1;
            break;
        case "word":
            currentWord.id = id;
            currentWord.pos = index + 1;
            break;
        case "photoshop":
            currentPhotoshop.id = id;
            currentPhotoshop.pos = index + 1;
            break;
        case "sublime":
            currentSublime.id = id;
            currentSublime.pos = index + 1;
            break;
    }
}
// Return first object in play field array based on player scope
function returnCurrentarray(string){
    switch(string){
        case "chrome":
            return chromeArr[0].id;
            break;
        case "word":
            return wordArr[0].id;
            break;
        case "photoshop":
            return photoshopArr[0].id;
            break;
        case "sublime":
            return sublimeArr[0].id;
            break;
    }
}
// Return name of current block based on player scope
function returnRandarray(string){
    switch(string){
        case "chrome":
            return currentChrome.name;
            break;
        case "word":
            return currentWord.name;
            break;
        case "photoshop":
            return currentPhotoshop.name;
            break;
        case "sublime":
            return currentSublime.name;
            break;
    }
}
// Return id of current block based on player scope
function returnRandid(string){
    switch(string){
        case "chrome":
            return currentChrome.id;
            break;
        case "word":
            return currentWord.id;
            break;
        case "photoshop":
            return currentPhotoshop.id;
            break;
        case "sublime":
            return currentSublime.id;
            break;
    }
}
// Remove current block after player action from array
function sliceCurrentarray(string){
    switch(string){
        case "chrome":
            chromeArr = chromeArr.slice(1);
            break;
        case "word":
            wordArr = wordArr.slice(1);
            break;
        case "photoshop":
            photoshopArr = photoshopArr.slice(1);
            break;
        case "sublime":
            sublimeArr = sublimeArr.slice(1);
            break;
    }
}

// Event listener to start game
// Swap start text for initial score, set initial play field selected, and begin block dropping
addEventListener('click', function _func(event) {
    document.getElementById('pscore').innerHTML = "Score: " +pscore;
    document.getElementById(progScope[currScope]+"area").style.opacity = darkOpacity;
    document.getElementById(progScope[currScope]).style.opacity = darkOpacity;
    removeEventListener('click', _func);
    timerBlock = setInterval(createBlock, 1500);
    startRound();
});

// Shuffle all shortcut arrays and generate random number for which play field to drop block in
function initMemory(){
    shuffle(chromecuts);
    shuffle(wordcuts);
    shuffle(photoshopcuts);
    shuffle(sublimecuts);
    rand = getRandomWhole(0, progScope.length - 1);
    //rand = 0; // test num for Chrome area only
    //Retrieve name of shortcut from object based on which program was chosen
    testArray = progScope[rand]+"cuts";
    switch(testArray){
        case "chromecuts":
            currentChrome = chromecuts[chromecuts.length - 1];
           // console.log("current array:" + currentArray);
        break;
        case "wordcuts":
            currentWord = wordcuts[wordcuts.length - 1];
        break;
        case "photoshopcuts":
            currentPhotoshop = photoshopcuts[photoshopcuts.length - 1];
        break;
        case "sublimecuts":
            currentSublime = sublimecuts[sublimecuts.length - 1];
        break;
    }
}

// Creates a block to drop on play field based on player scope and shuffled shortcut arrays
function createBlock(){
    initMemory();
    var dode = document.createElement('div');
    document.getElementById(progScope[rand]+"area").appendChild(dode);
    dode.id = "dode" +progScope[rand]+ upCount(progScope[rand]);
    addArrayid(progScope[rand], dode.id, returnArraylength(progScope[rand]));
    popArray(progScope[rand]+"cuts");
    dode.className = "cblock";
    var t = document.createTextNode(returnRandarray(progScope[rand]));
    dode.appendChild(t);
    animaHandler(dode.id);
    var rect = document.getElementById(dode.id).getBoundingClientRect();
    var intY = progScope[rand];
    dangle.animate({translate: [0, returnColumns(progScope[rand])-85, 0]}, 400, "ease-in-quart");
    dangle.animate({translate: [0, -20, 0]}, 50)
    dangle.animate({translate: [0, 20, 0]}, 20).on('end', switchCurrent);
    updateColumn(progScope[rand]);
    checkArrays();
};

// Pushes new block to current move list
function switchCurrent(){
    switch(progScope[rand]){
        case "chrome":
            chromeArr.push(currentChrome);
            break;
        case "word":
            wordArr.push(currentWord);
            break;
        case "photoshop":
            photoshopArr.push(currentPhotoshop);
            break;
        case "sublime":
            sublimeArr.push(currentSublime);
            break;
    }
}

// Retrieves height based on player scope and dropped blocks and animates the drop
function updateBlockY(string){
    switch(string) {
        case "chrome":
            var positions = posArray.slice(posIndex[0], 7);
            for(var i = 0; i < chromeArr.length; i++){
                var mover = chromeArr[i].id;
                var rect = document.getElementById(mover).getBoundingClientRect();
                document.getElementById(mover).style.marginTop = rect.top-124+"px";
                animaHandler(mover);
                dangle.animate({translate: [0, 62, 0]}, 100, "ease-in-quart");
                dangle.animate({translate: [0, -10, 0]}, 30);
                dangle.animate({translate: [0, 10, 0]}, 20);
            }
            break;
        case "word":
            var positions = posArray.slice(posIndex[1], 7);
            for(var i = 0; i < wordArr.length; i++){
                var mover = wordArr[i].id;
                var rect = document.getElementById(mover).getBoundingClientRect();
                document.getElementById(mover).style.marginTop = rect.top-124+"px";
                animaHandler(mover);
                dangle.animate({translate: [0, 62, 0]}, 100, "ease-in-quart");
                dangle.animate({translate: [0, -10, 0]}, 30);
                dangle.animate({translate: [0, 10, 0]}, 20);
            }
            break;
        case "photoshop":
            var positions = posArray.slice(posIndex[2], 7);
            for(var i = 0; i < photoshopArr.length; i++){
                var mover = photoshopArr[i].id;
                var rect = document.getElementById(mover).getBoundingClientRect();
                document.getElementById(mover).style.marginTop = rect.top-124+"px";
                animaHandler(mover);
                dangle.animate({translate: [0, 62, 0]}, 100, "ease-in-quart");
                dangle.animate({translate: [0, -10, 0]}, 30);
                dangle.animate({translate: [0, 10, 0]}, 20);
            }
            break;
        case "sublime":
            var positions = posArray.slice(posIndex[3], 7);
            for(var i = 0; i < sublimeArr.length; i++){
                var mover = sublimeArr[i].id;
                var rect = document.getElementById(mover).getBoundingClientRect();
                document.getElementById(mover).style.marginTop = rect.top-124+"px";
                animaHandler(mover);
                dangle.animate({translate: [0, 62, 0]}, 100, "ease-in-quart");
                dangle.animate({translate: [0, -10, 0]}, 30);
                dangle.animate({translate: [0, 10, 0]}, 20);
            }
            break;
    }
}

// Scoring via mousetrap.js key binding for ctrl key combos
function mouseScore(){
    event.preventDefault();
    pscore += 1;
    playerScored = true;
    var dblock = document.getElementById(returnCurrentarray(progScope[currScope]));
    dblock.style.display = 'none';
    sliceCurrentarray(progScope[currScope]);
    plusColumn(progScope[currScope]);
    updateBlockY(progScope[currScope]);
    // Updates play field depending on if player scored
    if (progScope[currScope] == progScope[rand]){
    document.getElementById(returnRandid(progScope[rand])).style.marginTop += 62+"px";   
    }
    Mousetrap.unbind('mod+'+returnKcode(progScope[currScope]));
    Mousetrap.reset();
}

// Failed action via mousetrap.js key binding
function mouseFail(){
    event.preventDefault();
    updatePosindex(progScope[currScope]);
    var dblock = document.getElementById(returnCurrentarray(progScope[currScope]));
    dblock.innerHTML = badMojos[Math.floor(Math.random()*badMojos.length)];
    dblock.className = "dblock";
    sliceCurrentarray(progScope[currScope]);
    Mousetrap.reset();
    resetRound();
}

//For loop to bind all keys in alphaArray to mousetrap.js
function mouseBindall(){
       alphaArray.forEach(function(v,i){
          Mousetrap.bind(alphaArray[i], mouseFail);
           Mousetrap.bind('mod+'+alphaArray[i], mouseFail);
       });
}

// Start scoring for player actions
function startRound(){
    document.addEventListener("keydown", function _check(event){
        if (event.keyCode == "39" || event.keyCode == "37") {
            // Ignore left and right keys since they're tied to player scope
        } else if ( returnKcode(progScope[currScope]) == undefined) {
            // Ignore undefined keycodes and others that may affect browser
            event.preventDefault();
            document.removeEventListener("keydown", _check);
            resetRound();
        } else if (isKcodemeta(progScope[currScope]) == 'ctrl') {
            // check if keycode is a single key or combo for mousetrap binding
            var kc = 'mod+'+returnKcode(progScope[currScope]);
            mouseBindall();
            Mousetrap.bind(kc, mouseScore);
            document.removeEventListener("keydown", _check);
            resetRound();
        } else if(isKcodemeta(progScope[currScope]) != 'ctrl' ) {
            // binding single key via mousetrap.js
            var kc = returnKcode(progScope[currScope]);
            mouseBindall();
            Mousetrap.bind(kc, mouseScore);
            document.removeEventListener("keydown", _check);
            resetRound();
        } 
    });    
};
//Update index for for which block to drop for which array based on player scope
function updatePosindex(string){
       switch(string){
           case "chrome":
               posIndex[0] ++;
               break;
           case "word":
               posIndex[1] ++;
               break;
           case "photoshop":
               posIndex[2] ++;
               break;
           case "sublime":
               posIndex[3] ++;
               break;
       }
}
// Returns key code for shortcut object for player action
function returnKcode(scope){
    switch (scope){
        case "chrome":
            return chromeArr[0].kcode01;
            break;
        case "word":
            return wordArr[0].kcode01;
            break;
        case "photoshop":
            return photoshopArr[0].kcode01;
            break;
        case "sublime":
            return sublimeArr[0].kcode01;
            break;
    }
}
// Is the keycode meta i.e. ctrl, alt, command, etc -- stored in object
function isKcodemeta(scope){
    switch (scope){
        case "chrome":
            return chromeArr[0].kcode02;
            break;
        case "word":
            return wordArr[0].kcode02;
            break;
        case "photoshop":
            return photoshopArr[0].kcode02;
            break;
        case "sublime":
            return sublimeArr[0].kcode02;
            break;
    }
}
// End game -- all block copy altered for blocks on field
function endGame(){
    var matches = document.querySelectorAll('div.cblock');
    var matchesd = document.querySelectorAll('div.dblock');
    console.log(matches);
    for (var i = 0; i < matches.length; i++){
        matches[i].innerText = 'GAME OVER';
        matches[i].style.backgroundColor = 'red';
    }
    for (var i = 0; i < matchesd.length; i++){
        matchesd[i].innerText = 'GAME OVER';
        matchesd[i].style.backgroundColor = 'red';
    }
    document.removeEventListener('keydown', _check);
};
// Checks height of fields to determine whether player is about to lose -- then stops interval
function checkArrays(){
    if (wordY < 88 || chromeY < 88 || photoshopY < 88 || sublimeY < 88){
    clearInterval(timerBlock); 
    Mousetrap.reset();
    dangle.animate({translate: [0, -5, 0]}, 10)
    dangle.animate({translate: [0, 5, 0]}, 10)
    endGame();
    }
}

//Updates player score
function resetRound(){
document.getElementById('pscore').innerHTML = "Score: " +pscore;
    startRound();
};
   



