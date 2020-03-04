/** @description Finds transition event for browser
 *  @return transition-end name for browser
 */
function whichTransitionEvent() {
  let t,
    el = document.createElement('fakeelement');

  let transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

/** @description Elevator arrived bell function
 */
const playElevatorSound = () => {
  const bell = document.createElement('audio');
  bell.src = './assets/elevator.mp3';

  bell.play();

  // Prevent memory leak
  bell.remove();
};
