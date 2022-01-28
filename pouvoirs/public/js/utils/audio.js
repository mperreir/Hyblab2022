const createAudio = function(path, loop, rate,volume) {
    const sound  = new Howl({
        src: [path],
        loop: loop,
        volume: volume,
        rate: rate,
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