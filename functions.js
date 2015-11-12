/**
 * Created by masoud on 11/11/2015.
 */
//returns 10 mines
function getMine() {
    var mines = []
    while (mines.length < 5) {
        var result = _.random(1, 81);
        if (!(_.contains(mines, result))) {
            mines.push(result);
        }
    }
    return mines;
}

function getAroundOfBoxes() {
    var result = [];
    for (var i = 1; i <= 81; i++) {
        result[i] = getAroundOfEachBox(i);
    }
    return result;
}


function getAroundOfEachBox(num) {
    var around = [];
    var right, left, top, bottom;
    right = ((num % 9) != 0);
    left = ((num % 9) != 1);
    top = (num > 9);
    bottom = (num <= 72);
    var objAr = [];
    //right
    if (right) {
        around.push(num + 1);
        objAr.push(num + 1);


    }
    //left
    if (left) {
        around.push(num - 1);
        objAr.push(num - 1);
    }
    //top
    if (top) {
        around.push(num - 9);
        objAr.push(num - 9);
    }
    //bottom
    if (bottom) {
        around.push(num + 9);
        objAr.push(num + 9);
    }
    //top right
    if (right && top) {
        around.push(num - 8);
        objAr.push(num - 8);
    }
    //bottom right
    if (right && bottom) {
        around.push(num + 10);
        objAr.push(num + 10);

    }
    //top left
    if (left && top) {
        around.push(num - 10);
        objAr.push(num - 10);
    }
    //bottom left
    if (left && bottom) {
        around.push(num + 8);
        objAr.push(num + 8);
    }

    return around;
}


function getAroundMinesCount(mines, arounds) {
    var result = [];
    for (var i = 1; i <= 81; i++) {
        var x = _.intersection(arounds[i], mines);
        result[i] = x.length;

    }
    return result;
}