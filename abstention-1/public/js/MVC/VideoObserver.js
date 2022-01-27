const { Observer } = require("../utils");

class AnimationObserver extends Observer {
    constructor(video){
        super();
        this.video = video;
    }

    update(observable, object){
        let scroll = observable.scroll;
    }
}