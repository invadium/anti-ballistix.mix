# Playable Prototype
    V city in the background
    V stars appearing in the sky
    V vaporwave grid wanishin in the horizon
    V infrastructure layer
    V infrastructure damage
    V powerstation hit/destroy particle effects
    V drones
    V score overlay
    V call them scenarios
    V player jumping between flaks
    V fix the glitch with multi-explosions behind the power stations
    V proper Z-ordering for infrastructure and projectiles
    V flak overheating
    V visual hint about flak barrel overheat (make the barrel redish or whitish?)
    V increase flak bullet spread when overheated (spread threshold, then increase)
    V z-targeting to increase missile/drone precision
    V precision drone attacks with explosions
    V when in the main menu after game over, the Escape shouldn't start a new game
    V scenario selection
    V scenario common setup utils
    V configure the initial number of flaks
    V wave indicator
    V overheat penalty (can't shoot for some time)
    V barrel recoil 
    V power plant hit shake
    V include debug scenarios when debugging
    V end of the wave message with basic stat, e.g. "Intercepted 80/100 (80%)"
    V game stat subsystem

> fix the flak jumping bug with a bot still controlling the flak after I jump in (something to do with IDLE status??? Is it really happening?)
> waves (part of scenario life cycle)
> wave difficulty curve (a tool to draw it visually? drone curve, ballistics curve etc...)

> scenario life cycle
> scenario success/fail conditions?

> hide cursor option in the menu
> define coordinate spaces
> normalize coordinate naming - relative (0-1), percentage (0-100) etc...
> custom man pages with core design and structure
> proper readme with the project structure, prerequisites, how to play, how to debug etc...
> core sfx

# juice
> upgrade kinetix to be able to reduce shake amplitude with time/iterations
> incoming missile hint (like a comm ((( signal)
> incoming drone hint
> ground hit tectonic waves
> flak hit penalty (like overhead - can't shoot for some time)
> flak hit camera shake???
> warp drones beyond the screen
> configurable idle autostart [45 - 90 - 180 - never]
> lock the flak for a 1-2 seconds after a player jumps in
> flak jump in feedback (shake it or maybe scale it?)
> flak jump in lock/hold, so you can't jump into another one instantly (?)
> muzzle flashes
> arc + player number under the controlled flak


# advanced
>>> more projectiles
    > ballistic missiles
    > cruise missiles
    > aeroballistic missiles
    > hypersonic missiles
    > glide bombs
    > various drones
>>> more AA systems
    > missile interceptors
    > advanced radars?
    > hints on the incoming next and direction (based on advanced radar data?)
>>> more destructable objects
    > destructable power towers and power lines connecting power stations
    > destructable radars (buy as upgrades, can be destroyed by the drones/missiles)
> local high score table

>>> gamepad remapping

# meta
> actual air raid alert checker and indicator
> SimCity-like newspaper with recent news and attack stats & infographics (launched/intercepted)
> Tycoon elements - buy ammunition, upgrades, new flaks and anti-aircraft systems etc...

# future
> global high score table?
> tuning console

V state control
V title screen
V menu subsystem
V options submenu
V flak guns
V keyboard/gamepad control subsystem
V flak autocapture by players
V AA projectiles
V collision detection
V vectorized explosions
V soundtrack mixer
