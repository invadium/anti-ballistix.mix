# Z-Alert: Anti-Ballistix


### Welcome to Anti-Ballistix, a Missile Command-inspired game about modern anti-air defence!

> A unique game coded exclusively during air raid alerts.
> Late evening/night alerts are usually long, so I start my coding stream
> if there is no immediate threat and move slowly with my development.
> Tools: [Collider.JAM](https://collider.land), vim, browser, node.js, Audacity



## Content

- [Conecpt](#concept)
- [How to Play](#how-to-play)
- [How to Develop](doc/Development.md)



## Concept

**The Theme: Aerial attack on a modern city power infrastructure**

**The Goal: Protect the power stations at all costs!**

* Control anti-air crews and knock off incoming projectiles
* The city lights in the background show the state of the infrastructure - keep the lights glowing!
* Once the power infrastructure gets damaged, you can observe results over the skyline
* A spiritual successor to Missile Command
* Local co-op - play with your friends and family
* Meta: buy ammunition and additional protection, upgrade air defences, and repair the power stations with your accumulated bonuses (?)



## How to Play

### Itch.io

The [itch.io](https://invadium.itch.io/) edition is coming soon...

### Run Locally

**Prerequisite:** [Node.js](https://nodejs.org) MUST be installed.

Run the following console commands:

```
npm i -g collider.jam
git clone https://github.com/invadium/anti-ballistix.mix.git
cd anti-ballistix-mix
jam play
```

First, we install the [Collider.JAM](https://collider.land) game framework globally,
then clone the game repository
and run the ```jam``` command inside to launch the game.



## Controls

Use the keyboard or gamepad.

### Keyboard Player 1

* A/D - turn the turret
* Space/Left Shift - shoot
* Q - jump to the next free flak

### Keyboard Player 2

* Left/Right Arrows - turn the turret
* Right Ctrl or Right Shift - shoot
* Home - jump to the next free flak

### Gamepads

* D-pad - turn the turret
* A/B - shoot

### Special Controls

* P - pause the game
* [ and ] - slow down and speed up time in the moment
* Ctrl+[ and Ctrl+] - permanently slow down or speed up time
* ' - set normal time speed



## Debug and Development

For information about development and existing debug options, refer to the [Development](doc/Development.md) page.


