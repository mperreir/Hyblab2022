const createAnimation = function(divName, path, loop) {

	var newContainer = document.getElementById(divName);
	const animation = bodymovin.loadAnimation({
		container: newContainer,
		path: path,
		renderer: 'svg',
		loop: loop,
		direction:-1,
		autoplay: false,
		rendererSettings: {
			preserveAspectRatio: "xMaxYMax meet"
		}
	});
	return animation;
}
	/*
	* play the animation from your js file

	    const animation = createAnimation("example","data/test2.json",false);
    	animation.play();

	* Do something once animation has been played

    	animation.addEventListener('complete', () => {
		console.log('played');
		});
	*/