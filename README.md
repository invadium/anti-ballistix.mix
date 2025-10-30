# Z-Alert: Anti-Ballistix

### Welcome to Anti-Ballistix, a Missile Command inspired game about modern anti-aircraft defence!

> This is the only game that I know of coded exclusively during air raid alerts.
> Late evening/night alerts are usually long, so I start my coding stream
> if there is no immediate threat and move slowly with my coding.


## How to Play

On [itch.io](https://invadium.itch.io/) (coming soon...).

Or run it locally with Collider.JAM (node.js is needed).

Run the following console commands:

```
npm i -g collider.jam
git clone https://github.com/invadium/anti-ballistix.mix.git
cd anti-ballistix-mix
jam play
```



## Concept

**The Theme: Aerial attack on a modern city**

**The Goal: Protect the infrastructure at all costs!**

* Control anti-aircraft crews and knock off incoming projectiles
* A spiritual successor of Missile Command
* Local co-op
* Relax with the family during Air Raid Alerts
* The city lights in the background show the state of the infrastructure - keep the lights glowing!
* Meta: buy ammunition, upgrade air defences


## How to Debug

### Jump Straight to the Game

Skip all preliminary screens and jump straight into the game.
Use ```--scenario``` command line option to specify the exact scenario to jump into:

```
jam -d --scenario 2
```

Also, you could specify the number of flaks:

```
jam -d --scenario 1 --flaks 2
```



### Coding During Air Raid Alerts

When coding during an air raid alert, it is important to be
constantly aware of what is going on outside.

It is advasiable to turn of sound and music from the main menu.

You can run Collider.JAM in the "war mode"
so it could monitor the incoming aerial threats
through a web-service:

```
jam -d --war "Kyiv"
```

You need to specify a recognizable Ukrainian region
after the ```--war``` flag, so Collider.JAM could
monitor air raid alert for that particular region.

When alert is detected, Collider.JAM locks
in the bootloader with the "Alert" message.



### Debug Hit Boxes

You need to set ```env.showSolids = true```.

Use ```--showSolids``` command line flag for convenience:

```
jam -d --scenario 1 --showSolids
```


### Disable Idle Flak Capture

Use ```--disableAutoFlak``` command line option or just set ```env.disableAutoFlak = true```.

### Available Flags

* --showSolids
* --showCoordinates
* --disableAutoFlak

