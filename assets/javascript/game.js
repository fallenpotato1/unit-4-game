$(document).ready(function () {
    const characters = {
        eachCharacter: {
            libertyPrime: {
                name: "Liberty Prime",
                health: 300,
                damage: 50
            },
            alduin: {
                name: "Alduin",
                health: 400,
                damage: 30
            },
            glowingOne: {
                name: "The Glowing One",
                health: 200,
                damage: 10
            }
        }
    }



    function resetStats() {
        alduinHealth = characters.eachCharacter.alduin.health
        glowingOneHealth = characters.eachCharacter.glowingOne.health
        libertyPrimeHealth = characters.eachCharacter.libertyPrime.health
        console.log(alduinHealth)
        console.log(characters.eachCharacter.alduin.damage)
        $(".alduin h2").remove()
        $(".libertyPrime h2").remove()
        $(".glowingOne h2").remove()
        $(".alduin").append("<h2 class='aHealth'>" + alduinHealth + "</h2>")
        $(".libertyPrime").append("<h2 class='lpHealth'>" + libertyPrimeHealth + "</h2>")
        $(".glowingOne").append("<h2 class='goHealth'>" + glowingOneHealth + "</h2>")
        isStarted = false
        choseAlduin = false
        choseLibertyPrime = false
        choseGlowingOne = false
        $(".glowingOne").show()
        $(".libertyPrime").show()
        $(".alduin").show()
        startGame()
    }

    var alduinHealth = characters.eachCharacter.alduin.health
    var glowingOneHealth = characters.eachCharacter.glowingOne.health
    var libertyPrimeHealth = characters.eachCharacter.libertyPrime.health

    const alduinDamage = characters.eachCharacter.alduin.damage
    const glowingOneDamage = characters.eachCharacter.glowingOne.damage
    const libertyPrimeDamage = characters.eachCharacter.libertyPrime.damage


    $(".alduin").append("<h2 class='aHealth'>" + alduinHealth + "</h2>")
    $(".libertyPrime").append("<h2 class='lpHealth'>" + libertyPrimeHealth + "</h2>")
    $(".glowingOne").append("<h2 class='goHealth'>" + glowingOneHealth + "</h2>")

    var isStarted = false
    var choseAlduin = false
    var choseLibertyPrime = false
    var choseGlowingOne = false
    var defendLibertyPrime = false
    var defendAlduin = false
    var defendGlowingOne = false


    function updateStuff(aHealth, lpHealth, goHealth) {
        if (isStarted === true) {
            $(".changeMe").text("Who do you wish to fight?")
            $(".yourCharacter").text("Your Character")
            $(".alduin h2").remove()
            $(".libertyPrime h2").remove()
            $(".glowingOne h2").remove()
            $(".alduin").append("<h2 class='aHealth'>" + aHealth + "</h2>")
            $(".libertyPrime").append("<h2 class='lpHealth'>" + lpHealth + "</h2>")
            $(".glowingOne").append("<h2 class='goHealth'>" + goHealth + "</h2>")
        }
    }

    function startGame() {
        $(".theButton").hide()
        $(".alduin").on("click", function () {
            if (isStarted === false && choseAlduin === false) {
                $(".bottomPiece").append($(".libertyPrime"))
                $(".bottomPiece").append($(".glowingOne"))
                isStarted = true
                choseAlduin = true
                alduinDefender()
            }
            function alduinDefender() {
                if (isStarted === true && choseAlduin === true) {
                    $(".glowingOne").on("click", function () {
                        $(".emptyRight").append(this)
                        $(".theButton").show()
                        $(".theButton").addClass("shoutButton")
                        $(".shoutButton").text("Breath Fire")
                        defendGlowingOne = true
                        alduinAttack()
                    })
                    $(".libertyPrime").on("click", function () {
                        $(".emptyRight").append(this)
                        $(".theButton").show()
                        $(".theButton").addClass("shoutButton")
                        $(".shoutButton").text("Breath Fire")
                        defendLibertyPrime = true
                        alduinAttack()
                    })
                }
            }

            

            function alduinLiberty() {
                alduinsHealth = alduinsHealth - libertyPrimeDamage
                libertyPrimesHealth = libertyPrimesHealth - alduinDamage
                if (alduinsHealth <= 0) {
                    aLoss()
                    alduinsHealth = 400
                    libertyPrimesHealth = 300
                    defendLibertyPrime = false
                } else if (libertyPrimesHealth <= 0) {
                    aWin()
                    alduinsHealth = 400
                    libertyPrimesHealth = 300
                }
                updateStuff(alduinsHealth, libertyPrimesHealth, glowingOneHealth)
                alduinAttack()
            }

            var alduinsHealth = alduinHealth
            var glowingOnesHealth = glowingOneHealth

            function alduinGlowingOne() {
                
                alduinsHealth = alduinsHealth - glowingOneDamage
                glowingOnesHealth = glowingOnesHealth - alduinDamage
                if (alduinsHealth <= 0) {
                    aLoss()
                    alduinsHealth = 400
                    glowingOnesHealth = 200
                } else if (glowingOnesHealth <= 0) {
                    $(".glowingOne").hide()
                    $(".emptyRight").append($(".libertyPrime"))
                    defendGlowingOne = false
                    defendLibertyPrime = true
                } else {
                    alduinAttack()
                }
                updateStuff(alduinsHealth, libertyPrimeHealth, glowingOnesHealth)
            }
            function alduinAttack() {

                if (defendLibertyPrime === true && defendGlowingOne === false) {
                    $(".shoutButton").on("click", alduinLiberty())
                } else if (defendGlowingOne === true && defendLibertyPrime === false) {
                    $(".shoutButton").on("click", alduinGlowingOne())
                }

            }
            function aLoss() {
                $(".nothing").append("<h1 class='lost'>You lost</h2>")
                $(".theButton").hide()
                $(".thebutton").removeClass(".shoutButton")
                $(".nothing").append("<button class='resetButton'>Reset</button>")
                $(".resetButton").on("click", function () {
                    $(".topPiece").prepend($(".alduin"))
                    $(".topPiece").prepend($(".libertyPrime"))
                    $(".topPiece").prepend($(".glowingOne"))
                    $(".resetButton").hide()
                    $(".lost").hide()
                    resetStats()
                })
            }

            function secondLoss() {
                $(".lose").show()
                $(".theButton").show()
                $(".thebutton").removeClass(".shoutButton")
                $(".resetButton").show()
                $(".resetButton").on("click", function () {
                    $(".topPiece").prepend($(".alduin"))
                    $(".topPiece").prepend($(".libertyPrime"))
                    $(".topPiece").prepend($(".glowingOne"))
                    $(".resetButton").hide()
                    $(".lost").hide()
                    resetStats()
                })
            }
        })
    }
    startGame()













});