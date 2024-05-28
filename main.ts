namespace SpriteKind {
    export const Star = SpriteKind.create()
    export const PhysicsBody = SpriteKind.create()
    export const Fuel = SpriteKind.create()
    export const Ammo = SpriteKind.create()
    export const Silver = SpriteKind.create()
    export const Gold = SpriteKind.create()
    export const SuperFuel = SpriteKind.create()
    export const EscapeShip = SpriteKind.create()
}
/**
 * Resource Variables
 */
// Collision Event Controller - Planet
sprites.onOverlap(SpriteKind.Player, SpriteKind.PhysicsBody, function (sprite, otherSprite) {
    if (otherSprite == smallPlanetSprite1) {
        beginWarp(0, 0)
        earned[2] = true
    } else if (otherSprite == smallPlanetSprite2) {
        beginWarp(1, 0)
        earned[3] = true
    } else if (otherSprite == smallPlanetSprite3) {
        beginWarp(2, 0)
        earned[4] = true
    } else if (otherSprite == smallPlanetSprite4) {
        beginWarp(3, 0)
        earned[5] = true
    } else if (otherSprite == largePlanetSprite1) {
        beginWarp(4, 0)
        earned[0] = true
    } else if (otherSprite == largePlanetSprite2) {
        beginWarp(5, 0)
        earned[1] = true
    }
})
// Collision Event Controller - Enemy v. Planet
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PhysicsBody, function (sprite, otherSprite) {
    sprite.destroy(effects.fire)
    enemyInGame = false
})
// Enemy Spawn Controller Function
function enemySpawn() {
    if (!(enemyInGame)) {
        pause(randint(10000, 50000))
        enemySprite = sprites.create(assets.image`enemy_N`, SpriteKind.Enemy)
        tiles.placeOnTile(enemySprite, tiles.getTileLocation(randint(0, 49), randint(0, 49)))
        player1Ship.say("An Alien Ship has appeared!", 1000)
    }
}
// Fuel / Odometer Function
function fuelTimer () {
    if (!(onPlanet) && resources[0] > 0) {
        resources[0]--
odometer += 1
        pause(2000)
    } else if (!(onPlanet) && resources[0] <= 0 && resources[4] > 0) {
        resources[0] = 0
        resources[4]--
pause(15000)
    } else if (!(onPlanet) && resources[0] <= 0 && resources[4] <= 0) {
        resources[0] = 0
        resources[4] = 0
        info.changeScoreBy(-6)
        pause(2000)
    }
}
// Collision Event Controller - Enemy v. Star
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Star, function (sprite, otherSprite) {
    sprite.destroy(effects.fire)
    enemyInGame = false
})
// ButtonB
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (resources[1] > 0) {
        resources[1]--
bullet = sprites.createProjectileFromSprite(assets.image`blast_N`, player1Ship, player1Ship.vx * 2, player1Ship.vy * 2)
        if (player1Ship.vx == 0 && player1Ship.vy == 0) {
            bullet.setVelocity(0, -70)
        }
        if (bullet.vx > 0.5) {
            bullet.setImage(assets.image`blast_E`)
        } else if (bullet.vx < -0.5) {
            bullet.setImage(assets.image`blast_W`)
        } else if (bullet.vy <= 0) {
            bullet.setImage(assets.image`blast_N`)
        } else if (bullet.vy > 0) {
            bullet.setImage(assets.image`blast_S`)
        }
    }
})
// Information Function
function information (resourceList: any[], achievementsEarned: any[], achievementsPossible: any[]) {
    let achievementString = "\n"
if (achievementsEarned[0]) {
        achievementString = "" + achievementString + achievementsPossible[0] + "\n"
    }
    if (achievementsEarned[1]) {
        achievementString = "" + achievementString + achievementsPossible[1] + "\n"
    }
    if (achievementsEarned[2]) {
        achievementString = "" + achievementString + achievementsPossible[2] + "\n"
    }
    if (achievementsEarned[3]) {
        achievementString = "" + achievementString + achievementsPossible[3] + "\n"
    }
    if (achievementsEarned[4]) {
        achievementString = "" + achievementString + achievementsPossible[4] + "\n"
    }
    if (achievementsEarned[5]) {
        achievementString = "" + achievementString + achievementsPossible[5] + "\n"
    }
    if (achievementsEarned[6]) {
        achievementString = "" + achievementString + achievementsPossible[6] + "\n"
    }
    if (achievementsEarned[7]) {
        achievementString = "" + achievementString + achievementsPossible[7] + "\n"
    }
    if (achievementsEarned[8]) {
        achievementString = "" + achievementString + achievementsPossible[8] + "\n"
    }
    if (achievementsEarned[9]) {
        achievementString = "" + achievementString + achievementsPossible[9] + "\n"
    }
    if (achievementsEarned[10]) {
        achievementString = "" + achievementString + achievementsPossible[10] + "\n"
    }
    game.showLongText("" + "Resources: \nFuel: " + resourceList[0] + "\nAmmo: " + resourceList[1] + "\nSilver: " + resourceList[2] + "\nGold: " + resourceList[3] + "\nSuperFuel: " + resourceList[4] + "\nAchievements Earned: " + achievementString, DialogLayout.Full)
}
// ButtonA
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    information(resources, earned, possible)
})
// Collision Event Controller - Spaceship
sprites.onOverlap(SpriteKind.Player, SpriteKind.EscapeShip, function (sprite, otherSprite) {
    if (otherSprite == smallPlanet1Ship) {
        beginWarp(0, 1)
    } else if (otherSprite == smallPlanet2Ship) {
        beginWarp(1, 1)
    } else if (otherSprite == smallPlanet3Ship) {
        beginWarp(2, 1)
    } else if (otherSprite == smallPlanet4Ship) {
        beginWarp(3, 1)
    } else if (otherSprite == largePlanet1Ship) {
        beginWarp(4, 1)
    } else if (otherSprite == largePlanet2Ship) {
        beginWarp(5, 1)
    }
})
// Collision Event Controller - Enemy v. Projectile
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.fire)
    otherSprite.destroy()
    enemyInGame = false
})
// Resource Generation Function
function generateResources (generationSeed: number[]) {
    for (let index = 0; index < generationSeed[4]; index++) {
        randX = randint(generationSeed[0], generationSeed[2])
        randY = randint(generationSeed[1], generationSeed[3])
        if (generationSeed[5] == 0) {
            fuelSprite = sprites.create(assets.image`fuel`, SpriteKind.Fuel)
            tiles.placeOnTile(fuelSprite, tiles.getTileLocation(randX, randY))
        } else if (generationSeed[5] == 1) {
            ammoSprite = sprites.create(assets.image`ammo`, SpriteKind.Ammo)
            tiles.placeOnTile(ammoSprite, tiles.getTileLocation(randX, randY))
        } else if (generationSeed[5] == 2) {
            silverSprite = sprites.create(assets.image`silver`, SpriteKind.Silver)
            tiles.placeOnTile(silverSprite, tiles.getTileLocation(randX, randY))
        } else if (generationSeed[5] == 3) {
            goldSprite = sprites.create(assets.image`gold`, SpriteKind.Gold)
            tiles.placeOnTile(goldSprite, tiles.getTileLocation(randX, randY))
        } else if (generationSeed[5] == 4) {
            superFuelSprite = sprites.create(assets.image`superFuel`, SpriteKind.SuperFuel)
            tiles.placeOnTile(superFuelSprite, tiles.getTileLocation(randX, randY))
        } else {
            console.log("ERROR: Resource Generation ID Out of Bounds")
            console.log(generationSeed[5])
        }
    }
}
// Collision Event Controller - Ammo
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ammo, function (sprite, otherSprite) {
    resources[1] += 2
lifetimeResources[1]++
otherSprite.destroy(effects.fire)
})
// Collision Event Controller - Fuel
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fuel, function (sprite, otherSprite) {
    resources[0] += 2
lifetimeResources[0]++
otherSprite.destroy(effects.fountain)
})
// Teleportation Function (ID refers to planet, direction refers to whether the player is traveling to the planet or back to space)
function beginWarp (id: number, direction: number) {
    if (direction == 0) {
        onPlanet = true
        if (id == 0) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(5, 75))
        } else if (id == 1) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(35, 75))
        } else if (id == 2) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(5, 105))
        } else if (id == 3) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(35, 105))
        } else if (id == 4) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(80, 30))
        } else if (id == 5) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(80, 80))
        }
    } else if (direction == 1) {
        onPlanet = false
        if (id == 0) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(4, 38))
        } else if (id == 1) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(6, 25))
        } else if (id == 2) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(45, 13))
        } else if (id == 3) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(47, 40))
        } else if (id == 4) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(38, 25))
        } else if (id == 5) {
            tiles.placeOnTile(player1Ship, tiles.getTileLocation(29, 30))
        }
    }
}
// Collision Event Controller - SuperFuel
sprites.onOverlap(SpriteKind.Player, SpriteKind.SuperFuel, function (sprite, otherSprite) {
    resources[4] += 1
lifetimeResources[4]++
otherSprite.destroy(effects.rings)
    info.changeScoreBy(50)
    earned[6] = true
})
// Collision Event Controller - Star
sprites.onOverlap(SpriteKind.Player, SpriteKind.Star, function (sprite, otherSprite) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(20, 25))
    info.changeLifeBy(randint(-1, -3))
    earned[7] = true
})
// Collision Event Controller - Silver
sprites.onOverlap(SpriteKind.Player, SpriteKind.Silver, function (sprite, otherSprite) {
    resources[2] += 1
lifetimeResources[2]++
otherSprite.destroy(effects.blizzard)
    info.changeScoreBy(25)
})
// Collision Event Controller - Gold
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gold, function (sprite, otherSprite) {
    resources[3] += 1
lifetimeResources[3]++
otherSprite.destroy(effects.halo)
    info.changeScoreBy(50)
    info.changeLifeBy(1)
})
// Collision Event Controller - Enemy v. Player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    otherSprite.destroy(effects.fire)
    enemyInGame = false
    earned[8] = true
})
let superFuelSprite: Sprite = null
let goldSprite: Sprite = null
let silverSprite: Sprite = null
let ammoSprite: Sprite = null
let fuelSprite: Sprite = null
let randY = 0
let randX = 0
let bullet: Sprite = null
let odometer = 0
let onPlanet = false
let enemySprite: Sprite = null
let enemyInGame = false
let player1Ship: Sprite = null
let largePlanet2Ship: Sprite = null
let largePlanet1Ship: Sprite = null
let smallPlanet4Ship: Sprite = null
let smallPlanet3Ship: Sprite = null
let smallPlanet2Ship: Sprite = null
let smallPlanet1Ship: Sprite = null
let largePlanetSprite2: Sprite = null
let largePlanetSprite1: Sprite = null
let smallPlanetSprite4: Sprite = null
let smallPlanetSprite3: Sprite = null
let smallPlanetSprite2: Sprite = null
let smallPlanetSprite1: Sprite = null
let possible: string[] = []
let earned: boolean[] = []
let resources: number[] = []
let bullet2 = null
resources = [20, 30, 0, 0, 0]
let lifetimeResources = [0, 0, 0, 0, 0]
earned = [false, false, false, false, false, false, false, false, false, false, false]
possible = [
"Visited Large Planet 1! ",
"Visited Large Planet 2! ",
"Visited Small Planet 1! ",
"Visited Small Planet 2! ",
"Visited Small Planet 3! ",
"Visited Small Planet 4! ",
"Uranium! ",
"Can I Survive This? ",
"High Five! ",
"Healthiest Spaceship Alive! ",
"Collector! "
]
info.setLife(3)
info.setScore(0)
// Background Initialization
tiles.setCurrentTilemap(tilemap`level`)
music.play(music.createSong(assets.song`score01`), music.PlaybackMode.LoopingInBackground)
// Planet Sprite Initialization
let sunSprite = sprites.create(assets.image`sun`, SpriteKind.Star)
smallPlanetSprite1 = sprites.create(assets.image`smallPlanet1`, SpriteKind.PhysicsBody)
smallPlanetSprite2 = sprites.create(assets.image`smallPlanet2`, SpriteKind.PhysicsBody)
smallPlanetSprite3 = sprites.create(assets.image`smallPlanet3`, SpriteKind.PhysicsBody)
smallPlanetSprite4 = sprites.create(assets.image`smallPlanet4`, SpriteKind.PhysicsBody)
largePlanetSprite1 = sprites.create(assets.image`largePlanet1`, SpriteKind.PhysicsBody)
largePlanetSprite2 = sprites.create(assets.image`largePlanet2`, SpriteKind.PhysicsBody)
// EscapeShip Sprite Initializaiton
smallPlanet1Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.EscapeShip)
smallPlanet2Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.EscapeShip)
smallPlanet3Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.EscapeShip)
smallPlanet4Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.EscapeShip)
largePlanet1Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.EscapeShip)
largePlanet2Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.EscapeShip)
// Planet Sprite Placement
tiles.placeOnTile(sunSprite, tiles.getTileLocation(25, 25))
tiles.placeOnTile(smallPlanetSprite1, tiles.getTileLocation(2, 38))
tiles.placeOnTile(smallPlanetSprite2, tiles.getTileLocation(4, 25))
tiles.placeOnTile(smallPlanetSprite3, tiles.getTileLocation(43, 13))
tiles.placeOnTile(smallPlanetSprite4, tiles.getTileLocation(45, 40))
tiles.placeOnTile(largePlanetSprite1, tiles.getTileLocation(36, 25))
tiles.placeOnTile(largePlanetSprite2, tiles.getTileLocation(27, 30))
// EscapeShip Sprite Placement
tiles.placeOnTile(smallPlanet1Ship, tiles.getTileLocation(7, 75))
tiles.placeOnTile(smallPlanet2Ship, tiles.getTileLocation(37, 75))
tiles.placeOnTile(smallPlanet3Ship, tiles.getTileLocation(7, 105))
tiles.placeOnTile(smallPlanet4Ship, tiles.getTileLocation(37, 105))
tiles.placeOnTile(largePlanet1Ship, tiles.getTileLocation(82, 30))
tiles.placeOnTile(largePlanet2Ship, tiles.getTileLocation(82, 80))
// Resource Generation
// Large Planet 1
generateResources([70, 0, 119, 49, 10, 0])
generateResources([70, 0, 119, 49, 15, 1])
generateResources([70, 0, 119, 49, 7, 2])
generateResources([
70,
0,
119,
49,
2,
3
])
generateResources([
70,
0,
119,
49,
1,
4
])
// Large Planet 2
generateResources([
70,
70,
119,
119,
5,
0
])
generateResources([
70,
70,
119,
119,
20,
1
])
generateResources([
70,
70,
119,
119,
10,
2
])
generateResources([
70,
70,
119,
119,
4,
3
])
generateResources([
70,
70,
119,
119,
1,
4
])
// Small Planet 1
generateResources([
0,
71,
18,
89,
5,
0
])
generateResources([
0,
71,
18,
89,
20,
1
])
// Small Planet 2
generateResources([
30,
71,
48,
89,
5,
0
])
generateResources([
30,
71,
48,
89,
10,
1
])
// Small Planet 3
generateResources([
0,
100,
18,
119,
20,
3
])
// Small Planet 4
generateResources([
30,
100,
48,
119,
20,
4
])
// Player Sprite Initialization
player1Ship = sprites.create(assets.image`playerShip1_N`, SpriteKind.Player)
tiles.placeOnTile(player1Ship, tiles.getTileLocation(20, 20))
controller.moveSprite(player1Ship)
scene.cameraFollowSprite(player1Ship)
// Sprite Direction Handlers
forever(function () {
    // Player Direction Handler
    // Spaceship Direction Handler
    if (onPlanet) {
        if (player1Ship.vx > 0) {
            player1Ship.setImage(assets.image`player1_R`)
        } else {
            player1Ship.setImage(assets.image`player1_L`)
        }
    } else if (!(onPlanet)) {
        if (player1Ship.vx > 0.5) {
            player1Ship.setImage(assets.image`playerShip1_E`)
        } else if (player1Ship.vx < -0.5) {
            player1Ship.setImage(assets.image`playerShip1_W`)
        } else if (player1Ship.vy < 0) {
            player1Ship.setImage(assets.image`playerShip1_N`)
        } else if (player1Ship.vy > 0) {
            player1Ship.setImage(assets.image`playerShip1_S`)
        }
    } else {
        console.log("ERROR: Direction Controller Failure")
    }
    // Enemy Sprite Direction Handler
    if (enemySprite != null) {
        if (enemySprite.vx > 0.5) {
            enemySprite.setImage(assets.image`enemy_E`)
        } else if (enemySprite.vx < -0.5) {
            enemySprite.setImage(assets.image`enemy_W`)
        } else if (enemySprite.vy < 0) {
            enemySprite.setImage(assets.image`enemy_N`)
        } else if (enemySprite.vy > 0) {
            enemySprite.setImage(assets.image`enemy_S`)
        }
    }
})
// Fuel/Odometer Timer
forever(function () {
    fuelTimer()
})
// Enemy Spawn Controller
forever(function () {
    enemySpawn()
})
// Enemy Follow Controller
forever(function () {
    if (enemySprite != null) {
        if (onPlanet) {
            enemySprite.follow(null)
        } else {
            enemySprite.follow(player1Ship, 75)
        }
    }
})
// Collection-Dependent Achievement Controller
forever(function () {
    if (info.life() >= 25) {
        earned[9] = true
    }
    if (lifetimeResources == [25, 65, 17, 26, 22]) {
        earned[10] = true
    }
})
