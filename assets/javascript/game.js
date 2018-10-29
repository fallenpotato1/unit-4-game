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
        $(".alduin h2").remove()
        $(".libertyPrime h2").remove()
        $(".glowingOne h2").remove()
        $(".alduin").append("<h2 class='aHealth'>" + alduinHealth + "</h2>")
        $(".libertyPrime").append("<h2 class='lpHealth'>" + libertyPrimeHealth + "</h2>")
        $(".glowingOne").append("<h2 class='goHealth'>" + glowingOneHealth + "</h2>")
        $(".glowingOne").show()
        $(".libertyPrime").show()
        $(".alduin").show()
        startGame()
    }

    var alduinHealth = characters.eachCharacter.alduin.health
    var glowingOneHealth = characters.eachCharacter.glowingOne.health
    var libertyPrimeHealth = characters.eachCharacter.libertyPrime.health



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
        choseAlduin = false
        choseLibertyPrime = false
        choseGlowingOne = false
        isStarted = false
        var alduinHealth = 400
        var glowingOneHealth = 200
        var libertyPrimeHealth = 300
        $(".theButton").hide()


        $(".alduin").on("click", function () {
            const alduinDamage = 30
            const glowingOneDamage = 100
            const libertyPrimeDamage = 50

            if (isStarted === false && choseGlowingOne === false && choseLibertyPrime === false) {
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
                        alduinAttack(false, true)
                    })
                    $(".libertyPrime").on("click", function () {
                        $(".emptyRight").append(this)
                        $(".shoutButton").show()
                        $(".theButton").addClass("shoutButton")
                        $(".shoutButton").text("Shout Fire")
                        alduinAttack(true, false)
                    })
                }
            }

            function alduinAttack(first, second) {
                if (first === true && second === false) {
                    alduinLiberty()
                } else if (first === false && second === true) {
                    alduinGlowingOne()
                }
            }

            function alduinLiberty() {
                var alduinsHealth = alduinHealth
                var libertyPrimesHealth = libertyPrimeHealth
                $(".shoutButton").on("click", function () {
                    alduinsHealth = alduinsHealth - libertyPrimeDamage
                    libertyPrimesHealth = libertyPrimesHealth - alduinDamage
                    updateStuff(alduinsHealth, libertyPrimesHealth, glowingOneHealth)
                    if (alduinsHealth <= 0) {
                        aLoss()
                        alduinsHealth = 400
                        libertyPrimesHealth = 200
                    }
                })
            }

            function alduinGlowingOne() {
                var alduinsHealth = alduinHealth
                var glowingOnesHealth = glowingOneHealth
                $(".shoutButton").on("click", function () {
                    alduinsHealth = alduinsHealth - glowingOneDamage
                    glowingOnesHealth = glowingOnesHealth - alduinDamage
                    updateStuff(alduinsHealth, libertyPrimeHealth, glowingOnesHealth)
                    if (alduinsHealth <= 0) {
                        aLoss()
                        alduinsHealth = 400
                        glowingOnesHealth = 200
                    }
                })
            }

            var lostTimes = 0
            function aLoss() {
                if (lostTimes === 0) {
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
                        lostTimes++
                    })
                } else {
                    $(".resetButton").hide()
                    $(".lost").hide()
                    resetStats()
                }
            }
        })


        $(".libertyPrime").on("click", function () {
            const alduinDamage = 100
            const glowingOneDamage = 100
            const libertyPrimeDamage = 30

            if (isStarted === false && choseGlowingOne === false && choseAlduin === false) {
                $(".bottomPiece").append($(".alduin"))
                $(".bottomPiece").append($(".glowingOne"))
                isStarted = true
                choseLibertyPrime = true
                libertyDefender()
            }

            function libertyDefender() {
                if (isStarted === true && choseLibertyPrime === true) {
                    $(".glowingOne").on("click", function () {
                        $(".emptyRight").append(this)
                        $(".theButton").show()
                        $(".theButton").addClass("throwNuke")
                        $(".throwNuke").text("Throw Nuke")
                        libertyAttack(false, true)
                    })
                    $(".alduin").on("click", function () {
                        $(".emptyRight").append(this)
                        $(".theButton").show()
                        $(".theButton").addClass("throwNuke")
                        $(".throwNuke").text("Throw Nuke")
                        libertyAttack(true, false)
                    })
                }
            }

            function libertyAttack(first, second) {
                if (first === true && second === false) {
                    libertyAlduin()
                } else if (first === false && second === true) {
                    libertyGlowingOne()
                }
            }

            function libertyAlduin() {
                var alduinsHealth = alduinHealth
                var libertyPrimesHealth = libertyPrimeHealth
                $(".throwNuke").on("click", function () {
                    alduinsHealth = alduinsHealth - libertyPrimeDamage
                    libertyPrimesHealth = libertyPrimesHealth - alduinDamage
                    updateStuff(alduinsHealth, libertyPrimesHealth, glowingOneHealth)
                    if (libertyPrimesHealth <= 0) {
                        aLoss()
                        libertyPrimesHealth = 300
                        libertyPrimesHealth = 200
                    }
                })
            }

            function libertyGlowingOne() {
                var libertyPrimesHealth = libertyPrimeHealth
                var glowingOnesHealth = glowingOneHealth
                $(".throwNuke").on("click", function () {
                    libertyPrimesHealth = libertyPrimesHealth - glowingOneDamage
                    glowingOnesHealth = glowingOnesHealth - libertyPrimeDamage
                    updateStuff(alduinHealth, libertyPrimesHealth, glowingOnesHealth)
                    if (libertyPrimesHealth <= 0) {
                        aLoss()
                        libertyPrimesHealth = 300
                        glowingOnesHealth = 200
                    }
                })
            }

            var lostTimes = 0
            function aLoss() {
                if (lostTimes === 0) {
                    $(".nothing").append("<h1 class='lost'>You lost</h2>")
                    $(".theButton").hide()
                    $(".thebutton").removeClass(".throwNuke")
                    $(".nothing").append("<button class='resetButton'>Reset</button>")
                    $(".resetButton").on("click", function () {
                        $(".topPiece").prepend($(".alduin"))
                        $(".topPiece").prepend($(".libertyPrime"))
                        $(".topPiece").prepend($(".glowingOne"))
                        $(".resetButton").hide()
                        $(".lost").hide()
                        resetStats()
                        lostTimes++
                    })
                } else {
                    $(".resetButton").hide()
                    $(".lost").hide()
                }
            }
        })


    }



    startGame()













});