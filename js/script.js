const elevatorsController = new ElevatorsController();
const floorHeight = 120;
const transitionEvent = whichTransitionEvent();

window.onload = () => {
  appInit();
};

/** @description App initiator.
 */
const appInit = () => {
  eventListenersSetter();
  initElevatorsInstances();
};

/** @description Event listeners setter
 */
const eventListenersSetter = () => {
  setFloorsButtonsListener();
  elevatorFreeListener();
};

/** @description Floors buttons click event setter.
 */
const setFloorsButtonsListener = () => {
  const floorsButtons = document.querySelectorAll('.floor-button');

  Array.from(floorsButtons).forEach(function(button) {
    button.addEventListener('click', floorButtonsClickHandler);
  });
};

/** @description An handler for the floors buttons click listener.
 * @param {object} event The event of the button click.
 */
const floorButtonsClickHandler = event => {
  const requestedLevel = event.target.getAttribute('data-level');

  if (
    elevatorsController.handledFloors.hasOwnProperty(requestedLevel) &&
    elevatorsController.handledFloors[requestedLevel]
  ) {
    return false;
  }

  elevatorsController.callsQueue.push(requestedLevel);
  elevatorCallsHandler(requestedLevel);
};

/** @description Initiates Elevator object instances with refernce to elevator car in the DOM.
 */
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

/** @description Elevator calls handler
 * @param requestedLevel The requested level
 */
const elevatorCallsHandler = requestedLevel => {
  const closestCar = elevatorsController.findClosestCar(requestedLevel);

  document
    .querySelector(`button[data-level='${requestedLevel}']`)
    .classList.add('active');

  if (closestCar) {
    elevatorsController.sendElevator(closestCar, requestedLevel);
  }
};

/** @description Global listener setter to identify when an elevator becomes free in case of a jam
 */
const elevatorFreeListener = () => {
  window.addEventListener('elevatoravailable', function() {
    elevatorQueueHandler();
  });
};

/** @description Elevator calls queue handler
 *               fires when elevator available event is dispatched
 */
const elevatorQueueHandler = () => {
  if (elevatorsController.callsQueue.length === 0) {
    return false;
  } else {
    elevatorCallsHandler(elevatorsController.callsQueue[0]);
  }
};
