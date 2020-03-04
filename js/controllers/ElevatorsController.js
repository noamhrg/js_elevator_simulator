class ElevatorsController {
  constructor(elevators) {
    this.elevators = elevators;
    this.callsQueue = [];
    this.handledFloors = {};
  }

  /** @description Finds the closest avaiable car
   * @param {number} requestedLevel The level destination
   * @return {object} closest Elevator object is returned, if no available elevator returns false
   */
  findClosestCar(requestedLevel) {
    const availableElevators = this.elevators.filter(
      elevator => !elevator.busy
    );

    if (!availableElevators.length) {
      return false;
    } else {
      let closest = availableElevators.reduce(function(prev, curr) {
        return Math.abs(curr.currentFloor - requestedLevel) <
          Math.abs(prev.currentFloor - requestedLevel)
          ? curr
          : prev;
      });

      return closest;
    }
  }

  /** @description Sends elevator to destination floor,
   *               cleans calls queue and marks floor as handled
   * @param elevator The closest available elevator
   * @param level The level destination
   */
  sendElevator(elevator, level) {
    elevator.goTo(level);

    this.callsQueue = this.callsQueue.filter(value => {
      return value !== level;
    });

    this.handledFloors[level] = true;
  }
}
