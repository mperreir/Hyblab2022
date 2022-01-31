class Observable {

    constructor(){
        this.observers = [];
        this.state = false;
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(object = null){
        if (this.state) {
            this.state = false;
            this.observers.forEach(o => {
                o.update(this, object);
            });
            // this.state = false;
        }
    }

    clearObservers(){
        this.observers = [];
    }

    setChanged(){
        this.state = true;
    }

    removeObserver(observer){
        this.observers.splice(observer, 1)
    }
}

class Observer {
    constructor() {

    }

    update(observable, object = null) {

    }
}

class LinearInterpolate {
    static divide(keys1, keys2) {
        let onlyIn1 = [];
        let intersection = [];
        let onlyIn2 = [];

        keys1.sort();
        keys2.sort();

        let i = 0, j = 0;

        while (i < keys1.length && j < keys2.length) {
            if (keys1[i] === keys2[j]) {
                intersection.push(keys1[i]);
                i++;
                j++;
            }
            else if (keys1[i] < keys2[j]) {
                onlyIn1.push(keys1[i]);
                i++;
            }
            else {
                onlyIn2.push(keys2[j]);
                j++;
            }
        }

        if (i < keys1.length) {
            for (; i < keys1.length; i++){
                onlyIn1.push(keys1[i]);
            }
        }
        else {
            for (; j < keys2.length; j++){
                onlyIn2.push(keys2[j]);
            }
        }

        return [onlyIn1, intersection, onlyIn2];
    }

    static number(startVal, endVal, progress) {
        return (endVal-startVal)*progress + startVal;
    }

    static array(start, end, progress) {
        return start.map((value, index) => LinearInterpolate.number(value, end[index], progress));
    }
}



// Desactivation du scroll

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}