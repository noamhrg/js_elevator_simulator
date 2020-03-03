const elevatorsController = new ElevatorsController();
const floorHeight = 120;
const transitionEvent = whichTransitionEvent();

window.onload = () => {
  appInit();
};

const appInit = () => {
  eventListenersSetter();
  initElevatorsInstances();
};

const eventListenersSetter = () => {
  setFloorsButtonsListener();
  elevatorFreeListener();
};

const setFloorsButtonsListener = () => {
  const floorsButtons = document.querySelectorAll('.floor-button');

  Array.from(floorsButtons).forEach(function(button) {
    button.addEventListener('click', function(event) {
      const requestedLevel = event.target.getAttribute('data-level');

      if (
        elevatorsController.hanldedFloors.hasOwnProperty(requestedLevel) &&
        elevatorsController.hanldedFloors[requestedLevel]
      ) {
        return false;
      }

      elevatorsController.callsQueue.push(requestedLevel);
      elevatorCallsHandler(requestedLevel);
    });
  });
};

const initElevatorsInstances = () => {
  const elevators = [];
  const elevatorsCars = document.querySelectorAll('.elevator .car');

  Array.from(elevatorsCars).forEach(function(car) {
    const elevatorName = car.parentElement.getAttribute('data-elevator-name');
    let elevatorInstance = new Elevator(elevatorName, car);
    elevators.push(elevatorInstance);

    elevatorsController.elevators = elevators;
  });
};

const elevatorFreeListener = () => {
  window.addEventListener('elevatoravailable', function() {
    elevatorQueueHandler();
  });
};

const elevatorCallsHandler = requestedLevel => {
  const closestCar = elevatorsController.findClosestCar(requestedLevel);

  document
    .querySelector(`button[data-level='${requestedLevel}']`)
    .classList.add('active');

  if (closestCar) {
    elevatorsController.sendElevator(closestCar, requestedLevel);
  }
};

const elevatorQueueHandler = () => {
  if (elevatorsController.callsQueue.length === 0) {
    return false;
  } else {
    elevatorCallsHandler(elevatorsController.callsQueue[0]);
  }
};
