class AnimationTransition {
    constructor({keyframes, player, container, actions} = {}) {
        this.player = document.querySelector(player);
        this.keyframes = keyframes;
        this.container = document.querySelector(container);
        this.actions = actions;

        window.addEventListener("scroll", () => this.scrollHandler())
    }

    getContainerVisibility() {
        // Get the bounding box for the lottie player or container
        // top : distance entre le haut de l'écran et le haut de l'élément
        // positif quand l'élément est en dessous de l'écran, négatif au dessus
        // height : hauteur (en pixel) de l'élément
        const { top, height } = this.container.getBoundingClientRect();
    
        // Calculate current view percentage
        // current : Distance entre le haut de l'élément et le bas de l'écran
        // positif quand l'élément est au dessus de l'écran, négatif en dessous
        const current = window.innerHeight - top;
        // max : valeur à partir de laquelle on ne voit plus l'élément à l'écran
        const max = window.innerHeight + height;
    
        // L'élément est visible quand : 0 < current < max
        // En prenant le ratio r de current / max on peut distinguer 3 cas :
        // r < 0 : L'élément n'est pas encore apparu
        // 0 <= r <= 1 : L'élément est visible à l'écran
        // r > 1 : L'élément est apparu et n'est plus visible
        return current / max;
    }

    scrollHandler() {
        const currentPercent = this.getContainerVisibility();

        const action = this.actions.find(
            ({ visibility }) => currentPercent >= visibility[0] && currentPercent <= visibility[1],
        );

        if(!action) return;

        const [start, end] = this.findCurrentFrameValue(currentPercent);
        // console.log(start, end);
        
        const interpolationPercent = this.map(currentPercent, action.visibility[0], action.visibility[1], 0, 1);
        const currentValue = this.keyframes[start].interpolateWith(this.keyframes[end], interpolationPercent);
        console.log(currentValue.toCSS());

        this.player.style.cssText = currentValue.toCSS();
        
    }

    findCurrentFrameValue(currentFrame){
        let keys = Object.keys(this.keyframes);
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