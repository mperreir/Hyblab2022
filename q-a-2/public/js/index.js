"use strict";

class App extends React.Component {
  render() {
      return (
        <div style={{"paddingLeft": "10px"}}>
          <div style={{"paddingTop": "10px"}}>
            <Button disabled={false} negative={false} onClick={() => { } } value="C'est parti !" />
          </div>
          <div style={{"marginTop": "20px"}}>
              <LearnMore link="#" />
          </div>
        </div>
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*
// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Wait for the video to preload and display 1st slide
const video = videojs(document.querySelector('#background-video'));
video.one('loadeddata', (event) => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1000,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlide1();
  // Debug trace because the loadeddata event is
  // sometime not fired
  console.log("Video loaded");
});*/