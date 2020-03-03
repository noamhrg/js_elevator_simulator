class ElevatorsController {
  constructor(elevators) {
    this.elevators = elevators;
    this.callsQueue = [];
    this.handledFloors = {};
  }

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

  sendElevator(elevator, level) {
    elevator.goTo(level);

    this.callsQueue = this.callsQueue.filter(value => {
      return value !== level;
    });

    this.handledFloors[level] = true;
  }
}
