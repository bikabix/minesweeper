/**
 * Created by masoud on 11/4/2015.
 */
var panel = [];
var mustSweep = [];
var mines = getMine();
var used = [];
var flags = [];
var finished = false;
var faults = [];
function render() {

    var aroundIds = getAroundOfBoxes();
    var aroundMinesCount = getAroundMinesCount(mines, aroundIds);

    for (var i = 1; i <= 81; i++) {
        var div = document.createElement('div');
        var box = {};

        div.id = i;
        div.className = "box default-back";

        box.mine = false;
        if (_.contains(mines, i)) {
            box.mine = true;
            div.className = "box mine default-back";
        }
        box.aroundIds = aroundIds[i];
        box.aroundMinesCount = aroundMinesCount[i];
        box.flag = false;
        panel[i] = box;

        document.getElementById("game").appendChild(div);

        div.addEventListener("click", boxClick);
        div.addEventListener("contextmenu", boxRightClick);
    }
}

window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
})

function boxRightClick(e) {

    if (finished || _.contains(used, parseInt(e.target.id, 10)))
        return;

    if (panel[e.target.id].flag) {
        $('#' + e.target.id).removeClass().addClass('box default-back');
        flags = _.difference(flags, [parseInt(e.target.id, 10)]);
        panel[e.target.id].flag = false;
    }
    else {
        $('#' + e.target.id).removeClass().addClass('box flag-back');
        panel[e.target.id].flag = true;
        flags.push(parseInt(e.target.id, 10));
    }
    isFinished();

}

function isFinished() {

    if (flags.length + used.length == 81 && flags.length <= mines.length) {

        faults = _.difference(flags, mines);
        if (faults.length > 0) {
            $(faults).each(function (i, e) {
                $('#' + e).removeClass().addClass('box wrong-flag-back');
            });

            $('#header').removeClass('start').addClass('failed');
        }
        else {
            $('#header').removeClass('start').addClass('successful');
        }

        finished = true;

    }
}

function boxClick(e) {
    if (finished || !$('#' + e.target.id).hasClass('default-back')) {
        return;
    }

    if (panel[e.target.id].mine) {
        $('.mine').removeClass('default-back').addClass('mine-back');
        $('#' + e.target.id).removeClass('mine-back').addClass('mine-click-back');
        $('#header').removeClass('start').addClass('failed');
        finished = true;
        faults = _.difference(flags, mines);
        $(faults).each(function (i, e) {
            $('#' + e).removeClass().addClass('box wrong-flag-back');
        });

        isFinished();
        return;
    }
    var box = panel[e.target.id];
    mustSweep.push(parseInt(e.target.id, 10));
    doSweep();
    isFinished();
}

function doSweep() {

    while (mustSweep.length) {
        var itemId = mustSweep.pop();
        var item = panel[itemId];
        used.push(itemId);
        if (item.aroundMinesCount == 0 && !_.contains(flags, itemId)) {
            mustSweep = _.union(mustSweep, _.difference(item.aroundIds, used));
            $('#' + itemId).removeClass('default-back').addClass('default-clicked-back');
        } else {
            $('#' + itemId).removeClass('default-back').addClass('default-mine-around-back-' + item.aroundMinesCount);
        }
    }
}

render();


