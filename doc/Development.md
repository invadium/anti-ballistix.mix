# How to Develop


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

### Jump Right into the Main Menu

```
jam -d --menu
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

