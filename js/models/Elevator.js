class Elevator {
  constructor(name, car) {
    this.name = name;
    this.car = car;
    this.currentFloor = 0;
    this.busy = false;
    this.restTime = 2000; // milliseconds
    this.speedPerFloor = 700; // milliseconds
  }

  /** @description Sends elevator car to destination floor
   * @param {number} level The floor to send car to
   */
  goTo(level) {
    let distance = Math.abs(this.currentFloor - level);
    let rideDuration = this.speedPerFloor * distance;

    this.busy = true;
    this.car.style.transition = `bottom ${rideDuration / 1000}s ease`;
    this.car.style.bottom = level * floorHeight + 'px';

    setTimeout(() => {
      this.arrived(level);
    }, rideDuration);

    setTimeout(() => {
      this.freeElevator();
    }, rideDuration + this.restTime);
  }

  /** @description Fires when elevator reaches to destination floor
   * @param {number} level The floor the elevator arrived to
   */
  arrived(level) {
    playElevatorSound();
    this.currentFloor = level;

    document
      .querySelector(`button[data-level='${this.currentFloor}']`)
      .classList.remove('active');
  }

  /** @description Frees elevator after elevator rest time
                   dispatches elevator free event if elevators call queue is bigger than 0
   */
  freeElevator() {
    this.busy = false;

    delete elevatorsController.handledFloors[this.currentFloor];

    if (elevatorsController.callsQueue.length) {
      const elevatorAvailableEvent = new CustomEvent('elevatoravailable');
      dispatchEvent(elevatorAvailableEvent);
    }
  }
}
