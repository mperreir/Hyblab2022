const createAudio = function(path, loop) {
    const sound  = new Howl({
        src: [path],
        loop: loop,
        volume: 1.0,
        rate: 0.7,
        onend: () => {}
      });
      return sound;
}
/*
 * Librairie à importer dans le html : https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js
 * Play the sound from your js file
 
    const sound = createSound(data/test.mp3");
    sound.play();
*/