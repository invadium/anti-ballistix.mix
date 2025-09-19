# Z-Alert: Anti-Ballistix

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

### Coding During Air Raid Alerts

When coding during an air raid alert, it is important to be
constantly aware of what is going on outside.

It is advasiable to turn of sound and music from the main menu.



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

