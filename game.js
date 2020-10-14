var game = new Mastermind();

document.addEventListener("DOMContentLoaded", function () {

    var $validationButton = document.querySelector("#validationButton");
    var currentLine = document.querySelector(".current");

    /**
     * Button Validation
     */
    $validationButton.addEventListener("click", function () {

        const hints = game.validateCombination();

        if (hints === undefined) {
            console.warn("Minimum 4 couleurs dans le code à soumettre");
            return;
        }
        game.isGoodCombination();


        const $smallCircles = currentLine.querySelectorAll(".correctionCircles .smallCircle")

        for (let i = 0; i < $smallCircles.length; i++) {

            const $smallCircle = $smallCircles[i];
            const hint = hints[i];

            if (hint === "CORRECT") {
                $smallCircle.classList.add("correct");
            } else if (hint === "PRESENT") {
                $smallCircle.classList.add("present");
            }
        }

        var over = game.isOver();


        if (over === true) {

            var allLines = document.querySelectorAll(".empty");
            for (let i = 0; i < allLines.length; i++) {
                var line = allLines[i];
                line.classList.remove("empty");


            }
        }

        var nextLine = document.querySelector(".empty");
        if (nextLine === null) {
            currentLine = null;
            console.warn("plus d'autres lignes");
            return;

        }


        else {
            currentLine.classList.remove("current");
            nextLine.classList.add("current");
            nextLine.classList.remove("empty");

            currentLine = nextLine;
        }
    })

    /**
     * Buttons Colors
     */
    const $actionButtons = document.querySelectorAll(".circleButton");
    for (const $button of $actionButtons) {
        $button.addEventListener("click", function () {

            //add color to the combination
            var color = $button.dataset.color;
            game.addColor(color);


            //add the color on the view
            //all circles
            const $circles = currentLine.querySelector(".colorButtons")
            // first transparent button
            const $nextCircle = $circles.querySelector(".transparent");

            //if no next circle, return
            if ($nextCircle === null) {
                console.warn("Pas plus de 4 couleurs dansle code à soumettre");
                return;
            }
            // add the right color
            if (color === "blue") {
                $nextCircle.classList.remove("transparent");
                $nextCircle.classList.add("circleBlue");
                $nextCircle.classList.add("colored");
            }
            if (color === "yellow") {
                $nextCircle.classList.remove("transparent");
                $nextCircle.classList.add("circleYellow");
                $nextCircle.classList.add("colored");
            }
            if (color === "red") {
                $nextCircle.classList.remove("transparent");
                $nextCircle.classList.add("circleRed");
                $nextCircle.classList.add("colored");
            }
            if (color === "green") {
                $nextCircle.classList.remove("transparent");
                $nextCircle.classList.add("circleGreen");
                $nextCircle.classList.add("colored");
            }

        });
    }


    /**
     * Button Clear All
     */
    const $clearButton = document.querySelector(".clearButton");
    $clearButton.addEventListener("click", function (clearLine) {
        game.clearAnswer();

        var $circles = currentLine.querySelectorAll(".circle");

        for (let i = 0; i < $circles.length; i++) {

            var $circle = $circles[i];

            $circle.classList.add("transparent");
            $circle.classList.remove("colored");
            $circle.classList.remove("circleBlue");
            $circle.classList.remove("circleYellow");
            $circle.classList.remove("circleRed");
            $circle.classList.remove("circleGreen");
        }
    })

});
