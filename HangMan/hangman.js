/*canvas = null
 context = null;
 guessCounter = 0;

 canvas.width = screen.width / 2;
 canvas.height = .8 * screen.height;


 leftWidth = canvas.width;
 leftHeight = canvas.height;

 circleX = .6 * leftWidth;
 circleY = .325 * leftHeight;
 radius = 40;*/


function drawEllipse(context, centerX, centerY, width, height) {

    context.beginPath();

    context.moveTo(centerX, centerY - height / 2); // A1

    context.bezierCurveTo(
        centerX + width / 2, centerY - height / 2, // C1
        centerX + width / 2, centerY + height / 2, // C2
        centerX, centerY + height / 2); // A2

    context.bezierCurveTo(
        centerX - width / 2, centerY + height / 2, // C3
        centerX - width / 2, centerY - height / 2, // C4
        centerX, centerY - height / 2); // A1

    context.closePath();
}


function draw(context, guessCounter, circleX, circleY, radius) {

    switch (guessCounter) {
        case 1:

            context.beginPath();
            context.arc(circleX, circleY, radius, 0, 2 * Math.PI, false);
            context.lineWidth = 3;
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
            break;
        case 2:
            context.beginPath();
            context.moveTo(circleX, circleY + radius);
            context.lineTo(circleX, circleY + 5 * radius);
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
            break;
        case 3:
            context.beginPath();
            context.moveTo(circleX, circleY + 1.5 * radius);
            context.lineTo(circleX - 2 * radius, circleY + 3 * radius);
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
            break;
        case 4:
            context.beginPath();
            context.moveTo(circleX, circleY + 1.5 * radius);
            context.lineTo(circleX + 2 * radius, circleY + 3 * radius);
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
            break;
        case 5:
            context.beginPath();
            context.moveTo(circleX, circleY + 5 * radius);
            context.lineTo(circleX - 2 * radius, circleY + 7 * radius);
            context.strokeStyle = '#003300';
            context.stroke();
            break;
        case 6:
            context.beginPath();
            context.moveTo(circleX, circleY + 5 * radius);
            context.lineTo(circleX + 2 * radius, circleY + 7 * radius);
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
            alert("Sorry Better Luck in ur next Life ! :P")
            break;

        case 7:
            context.beginPath();
            context.moveTo(circleX, circleY + 5 * radius);
            drawEllipse(context, circleX, circleY+ 1.5*radius, radius, radius / 2);
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
            break;
        case 8:
            context.beginPath();
            context.moveTo(circleX, circleY-radius);
            context.lineTo(circleX-radius,circleY- 4*radius);
            context.moveTo(circleX-radius, circleY+ radius);
            //context.lineTo(circleX-radius, circleY - 4* radius);
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath()
            break;
    }
}


$("body").ready(function () {

    var canvas = document.getElementById("hangMan");
    var context = canvas.getContext("2d");
    var guessCounter = 0;

    canvas.width = screen.width / 2;
    canvas.height = .8 * screen.height;


    var leftWidth = canvas.width;
    var leftHeight = canvas.height;

    var circleX = .6 * leftWidth;
    var circleY = .325 * leftHeight;
    var radius = 40;

//alert(leftHeight);
    context.beginPath();
    context.fillStyle = "#631C39";
    context.fillRect(.15 * leftWidth, .1 * leftHeight, .6 * leftWidth, .045 * leftHeight);
    context.fillRect(.20 * leftWidth, .145 * leftHeight, .045 * leftWidth, .65 * leftHeight);
    context.fillRect(.15 * leftWidth, .795 * leftHeight, .3 * leftWidth, .045 * leftHeight);
    context.closePath();
    var movie = [
            {name: "Broken City", category: "war"},
            {name: "Gangster Squad", category: "action"},
            {name: "Silver Linings Playbook", category: "book"},
            {name: "Game of Thrones", category: "book"},
            {name:"Shawshank Redemption",category: "drama"}
        ]
        ;
    var category = [];
    var found = 0;
    category[0] = movie[0].category;
    for (var i = 1; i < movie.length; i++) {
        for (var j = 0; j < category.length; j++) {
            if (movie[i].category == category[j]) {
                found = 1;
                break;
            }
        }
        if(found == 0)
        {
            category.push(movie[i].category);
            found = 0;
        }
    }
    for (var i = 0; i < category.length; i++) {
        tag = "<span class='category " + category[i] + " ' value='" + category[i] + "'>&nbsp" + category[i] + "</span>";
        $('#categoryList').append(tag);
    }
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var checkArray = "AEIOU ";
    var tag;


    for (var i = 0; i < letters.length; i++) {
        if (checkArray.indexOf(letters[i]) >= 0) {
            tag = "<span class='letters " + letters[i] + " strike invalid' value='" + letters[i] + "'>&nbsp" + letters[i] + "</span>";
        }
        else {
            tag = "<span class='letters " + letters[i] + "' value='" + letters[i] + "'>&nbsp" + letters[i] + "</span>";
        }
        $('#lettersContainer').append(tag);
    }

//var randomMovieNumber = Math.random() * 10 % movie.length;

    var randomMovieNumber;

    function constructTag(letterToCheck) {

        var value = "_";
        if (checkArray.indexOf(letterToCheck) >= 0) {
            value = letterToCheck;
        }
        return "<span class = 'disp " + letterToCheck + "' value = '" + letterToCheck + "'>&nbsp;" + value + "</span>";
    }


    $(".letters").click(function () {

        var clickedLetter = $(this).attr("value");

        var toSearch = "#wordContainer > ." + clickedLetter;
        var str = "#lettersContainer > ." + clickedLetter;
        $(str).addClass("strike").addClass("clicked");

        if ($(toSearch).length <= 0) {

            draw(context,++guessCounter,circleX,circleY,radius);
//            switch (++guessCounter) {
//                case 1:
//
//                    context.beginPath();
//                    context.arc(circleX, circleY, radius, 0, 2 * Math.PI, false);
//                    context.lineWidth = 3;
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath();
//                    break;
//                case 2:
//                    context.beginPath();
//                    context.moveTo(circleX, circleY + radius);
//                    context.lineTo(circleX, circleY + 5 * radius);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath();
//                    break;
//                case 3:
//                    context.beginPath();
//                    context.moveTo(circleX, circleY + 1.5 * radius);
//                    context.lineTo(circleX - 2 * radius, circleY + 3 * radius);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath();
//                    break;
//                case 4:
//                    context.beginPath();
//                    context.moveTo(circleX, circleY + 1.5 * radius);
//                    context.lineTo(circleX + 2 * radius, circleY + 3 * radius);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath();
//                    break;
//                case 5:
//                    context.beginPath();
//                    context.moveTo(circleX, circleY + 5 * radius);
//                    context.lineTo(circleX - 2 * radius, circleY + 7 * radius);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    break;
//                case 6:
//                    context.beginPath();
//                    context.moveTo(circleX, circleY + 5 * radius);
//                    context.lineTo(circleX + 2 * radius, circleY + 7 * radius);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath();
//                    break;
//
//                case 7:
//                    context.beginPath();
//                    drawEllipse(context, 143, 575, radius, radius / 2);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath();
//                    break;
//                case 8:
//                    context.beginPath();
//                    context.moveTo(128, 575);
//                    context.lineTo(128, 200);
//                    context.strokeStyle = '#003300';
//                    context.stroke();
//                    context.closePath()
//                    break;
//            }
        }
        else {
            $(toSearch).html("&nbsp" + clickedLetter);
        }


    });

    $(".category").click(function () {

        var clickedCategory = $(this).attr("value");
        while (true) {
            randomMovieNumber = Math.floor((Math.random() * movie.length - 1 ) + 1)
            if (movie[randomMovieNumber].category == clickedCategory) {
                for (var i = 0; i < movie[randomMovieNumber].name.length; i++) {
                    $('#wordContainer').append(constructTag(movie[randomMovieNumber].name[i].toUpperCase()));
                }

                break;
            }
        }

    });
})
;