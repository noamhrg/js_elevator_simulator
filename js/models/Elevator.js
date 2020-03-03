class Elevator {
  constructor(name, car) {
    this.name = name;
    this.car = car;
    this.currentFloor = 0;
    this.busy = false;
    this.restTime = 2000; // milliseconds
    this.speedPerFloor = 700; // milliseconds
  }

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

  arrived(level) {
    playElevatorSound();
    this.currentFloor = level;

    document
      .querySelector(`button[data-level='${this.currentFloor}']`)
      .classList.remove('active');
  }

  freeElevator() {
    this.busy = false;

    delete elevatorsController.hanldedFloors[this.currentFloor];

    const elevatorAvailableEvent = new CustomEvent('elevatoravailable');
    dispatchEvent(elevatorAvailableEvent);
  }
}
