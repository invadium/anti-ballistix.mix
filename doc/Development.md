# Development

## Project Structure

We follow regular [Collider.JAM](https://collider.land) conventions -
e.g., the main source is in the ```./mod``` folder,
all classes and traits are in ```./dna```,
alive entities are in ```./lab```,
```./env``` defined the environment
and ```./trap``` sets the traps for signals.


## How to Debug

As a generic rule, always use the ```--debug/-d``` flag:

```
jam -d
```

### Jump Straight to the Game

Skip all preliminary screens and jump straight into the game.
Use the ```--scenario```command-line option to specify the exact scenario to jump into:

```
jam -d --scenario 2
```

Also, you could specify the number of flaks:

```
jam -d --scenario 1 --flaks 2
```

### Jump Right into the Main Menu

```
jam -d --menu
```


### Dump an Entity and Coordinates

Use ```Ctrl+LMB``` to print the translation of the current mouse cursor coordinates
into multiple coordinate spaces (world, sky, ground, grid...).

When clicking on an entity, the entity dump will also be printed in the console along with the coordinate info.


### Request a Ballistic Strike

You can request a ballistic strike when in debug mode.

Use ```Ctrl+Shift+LMB``` to request a ballistic strike from the current longitude (relative horizontal mouse cursor position).



### Coding During Air Raid Alerts

When coding during an air raid alert, it is important to be
constantly aware of what is going on outside.

It is advisable to turn off the sound and music from the main menu.

You can run Collider.JAM in "war mode", so it can monitor incoming aerial threats through a web service:

```
jam -d --war "Kyiv"
```

You need to specify a recognizable Ukrainian region after the ```--war``` flag, so Collider.JAM could monitor air raid alerts for that particular region.

When an alert is detected, Collider.JAM locks
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
* --showDimensions - hint entities visual dimensions (used for mouse picks and culling)
* --disableAutoFlak
* --debugShakes - randomly elevate vapor grid

