function Mastermind() {

    /* GENERAL RULES*/

    /**
     * Represent  the fact if the color is well placed, present( but misplaced) or absent
     */
    const CORRECT = "CORRECT";
    const PRESENT = "PRESENT";
    const ABSENT = "ABSENT";


    /* SECRET CODE */
    /**
    * @private
    */
    var secret = createCombination();

    function createCombination() {
        var combi = [];

        for (let i = 0; i < 4; i++) {
            var alea = Math.random();
            if (alea < 0.25) {
                combi[i] = "blue";
            }
            if (alea >= 0.25 && alea < 0.5) {
                combi[i] = "yellow";
            }
            if (alea >= 0.5 && alea < 0.75) {
                combi[i] = "red";
            }
            if (alea >= 0.75) {
                combi[i] = "green";
            }
        }
        return combi;
    }


    /* VARIABLES */
    /**
    * @private
    * max tries authorized
    */
    const maxTries = 10;

    /**
     * @public
     * combination sent by the player
     */
    var playerCombination = [];
    /**
     * @public
     * correction combinaison
     */
    var correctionCombination = [];
    /**
     * @public
     * Tries Count
     */
    var triesCount = 0;




    /**
     * Validates the player's combination
     * @public
     */
    this.validateCombination = function validateCombination() {
        if (playerCombination.length !== secret.length) {
            return
        }

        // console.log("secret:" + secret);
        // console.log("player:" + playerCombination);


        for (i = 0; i <= secret.length - 1; i++) {
            var color = playerCombination[i];
            var correction = this.validateColor(color, i);
            correctionCombination.push(correction);
        }
        // console.log(correctionCombination);
        triesCount += 1;
        return correctionCombination;
    }


    /**
     * Validate if the color is CORRECT, PRESENT or ABSENT in the secret combination
     * @public
     */
    this.validateColor = function validateColor(color, i) {

        if (isWellPlaced(color, i)) {
            return CORRECT
        }
        if (isPresent(color)) {
            return PRESENT;
        }
        else {
            return ABSENT;
        }

    }

    /**
     * Validate if the color is well placed in the combination
     * @param {string} color color to valiate
     * @param {number} i place in the secret combination
     * @private
     */
    function isWellPlaced(color, i) {
        if (color === secret[i]) {
            return true
        }
    }

    /**
     * Validate if the color is present anywhere in the secret combination
     * @param {string} color 
     * @private
     */
    function isPresent(color) {
        if (secret.includes(color)) {
            return true;
        }
    }

    /**
     * add new color to the playerCombination
     * @param {string} color the color to add
     * @public
     */
    this.addColor = function addColor(color) {
        if (playerCombination.length < secret.length) {
            playerCombination.push(color);
        }
    }

    /**
     * tell us if the game is over.
     * @private
     */
    this.isOver = function isOver() {

        if (this.isGoodCombination()) {
            correctionCombination = [];
            playerCombination = [];
            console.log("You Win ! refresh to play again");
            alert("YOU WIN !!! refresh to play again");
            console.log("secret:" + secret);
            return true;
        }
        else if (triesCount === maxTries) {
            console.log("You loose ! refresh to play again");
            alert("YOU LOOSE !!! refresh to play again");

            return true;
        }
        else {
            correctionCombination = [];
            playerCombination = [];
            console.log("Not yet... try again !");
            return false;
        }
    }

    /**
     * Validate if the correctionCombinaison is perfect
     * @public
     */
    this.isGoodCombination = function isGoodCombination() {

        for (i = 0; i <= correctionCombination.length - 1; i++) {
            if (correctionCombination[i] !== CORRECT) {
                return false
            }

        }
        return true;
    }

    /**
     * Remove all colors of the player combination
     * @public
     */
    this.clearAnswer = function clearAnswer() {
        playerCombination = [];
        return playerCombination;
    }

}

