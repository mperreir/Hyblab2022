class AnimationObserver extends Observer {
    constructor(){
        super();
    }

    update(observable, object) {
        const currentPercent = observable.scroll;

        // const action = observable.actions.find(
        //     ({ visibility }) => currentPercent >= visibility[0] && currentPercent <= visibility[1],
        // );

        const actions = observable.currentActions;

        // console.log(action);

        if(!action) return;

        const [start, end] = this.findCurrentFrameValue(action.keyframes, currentPercent);
        // console.log(start, end);
        
        const interpolationPercent = this.map(currentPercent, action.visibility[0], action.visibility[1], 0, 1);
        const currentValue = action.keyframes[start].interpolateWith(action.keyframes[end], interpolationPercent);
        console.log(observable.player);

        observable.player.style.cssText = currentValue.toCSS();
    }

    findCurrentFrameValue(keyframes, currentFrame){
        let keys = Object.keys(keyframes);
        if (currentFrame < keys[0]){
            return [0, 0]
        } else if (currentFrame > keys[keys.length - 1]) {
            return [keys.length - 1, keys.length - 1]
        }

        return this._findCurrentFrameValue(keys, currentFrame, 0, keys.length-1)
    }

    _findCurrentFrameValue(keys, currentFrame, start, end){
        let middle = Math.floor((start+end)/2);

        if (keys[middle] <= currentFrame && currentFrame <= keys[middle+1]){
            return [middle, middle+1]
        } else if (currentFrame < keys[middle]){
            return this._findCurrentFrameValue(keys, currentFrame, start, middle)
        } else{
            return this._findCurrentFrameValue(keys, currentFrame, middle, end)
        }
    }

    map(x, a, b, c, d) { return (x - a) / (b - a) * (d - c) + c; }
}