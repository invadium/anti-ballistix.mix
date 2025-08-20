/*
 * Overlord contains ghosts to manage the game.
 *
 * It also works as a global event trap for the city state.
 * 
 * The core nodes are:
 *
 * <li> [/lab/overlord/barrage](#./lab/overlord/barrage) - spawns drones and missiles according to the scenario config and current wave.
 * <li> [/lab/overlord/power](#./lab/overlord/power) - monitors available power, balances electricity by switching buildings on/off, checks end of the game conditions.
 * 
 */

const Z    = 0
const name = 'overlord'
