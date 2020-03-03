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

const playElevatorSound = () => {
  const bell = document.createElement('audio');
  bell.src = './assets/elevator.mp3';

  bell.play();

  bell.remove();
};
