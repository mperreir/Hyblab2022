const init_p6 = function () {
    const dialog_before = document.querySelector("#p6 .dialog-before");
    const dialog_moua = document.querySelector("#p6 .dialog-moua")
    const dialog_pressed = document.querySelector("#p6 .dialog-pressed");
    const dialog_not_pressed = document.querySelector("#p6 .dialog-not-pressed");

    const decompte = document.querySelector("#p6 .decompte");
    const bouton_rouge = document.querySelector("#p6 .bouton-rouge");
    const power_header = document.querySelector("#p6 .pouvoir-header");
    const illu_fin = document.querySelector("#p6 .illu-fin");

    const dialog_arrow = document.querySelectorAll("#p6 .arrow-small, .arrow-medium, .arrow-big");

    const dialog_info1 = document.querySelector("#p6 .info1");
    const dialog_info2 = document.querySelector("#p6 .info2");

    const clockEffect = createAudio("data/sounds/clockTicking.mp3");
    const goodAns = createAudio("data/sounds/good_choice.mp3", false,0.7, 1);
    const explosionSE = createAudio("data/sounds/explosion.mp3", false,0.4, 1);

    dialog_before.querySelector(".dialog-text").innerHTML = getText("p6-etatmajor");
    dialog_moua.querySelector(".dialog-text").innerHTML = getText("p6-moua");
    dialog_pressed.querySelector(".dialog-text").innerHTML = getText("p6-push");
    dialog_not_pressed.querySelector(".dialog-text").innerHTML = getText("p6-notpush")

    
    dialog_info1.querySelector(".dialog-text").innerHTML = getText("p6-info1");
    dialog_info2.querySelector(".dialog-text").innerHTML = getText("p6-info2");

    let choice_made = 0;
    let timeout;

    const arrow_anim = anime({
        targets: dialog_arrow,
        translateY: "20%",
        direction: 'alternate',
        loop: true,
        easing: "linear",
        duration: 300
    });

    shakeElement(dialog_before);

    dialog_before.addEventListener('click', () => {
        anime({
            targets: dialog_before,
            opacity: [1, 0],
            easing: 'linear',
            complete: () => {
                dialog_before.style.display = "none";
                dialog_moua.style.display = "block";
                anime({
                    targets: dialog_moua,
                    opacity: [0, 1],
                    easing: 'linear',
                });
            }
        })
    }, 
    {once : true}
    );
    
    dialog_moua.addEventListener('click', () => {
        anime({
            targets: dialog_moua,
            opacity: [1, 0],
            easing: 'linear',
            complete: () => {
                dialog_moua.style.display = "none";
                decompte.style.display = "flex";
                anime({
                    targets: decompte,
                    opacity: [0, 1],
                    easing: 'linear',
                    complete: () => {
                        print_decompte(5);
                        clockEffect.play();
                        ready_bouton();
                    }
                });
            }
        })
    }, 
    {once : true}
    );


    const ready_bouton = () => {
        bouton_rouge.addEventListener('click', () => {
        clockEffect.unload();
        shakeElement(power_header);
        shakeElement(bouton_rouge);
        shakeElement(decompte);
        explosionSE.play();
        choice_made = 1;
        clearTimeout(timeout);
        anime({
            targets: bouton_rouge,
            scale: 0.90,
            easing: 'linear',
            direction: 'alternate',
            duration: 150,
            complete: () => {
                anime({
                    targets: [decompte, bouton_rouge],
                    opacity: [1, 0],
                    easing: 'linear',
                    complete: () => {
                        decompte.style.display = "none";
                        bouton_rouge.style.display = "none";
                        dialog_pressed.style.display = "block";
                        illu_fin.style.display = "block";
                        showTitle("p6");

                        anime({
                            targets: [dialog_pressed, illu_fin],
                            opacity: [0, 1],
                            easing: 'linear',
                        })
                    }

                })
            }
        });
    }, {once: true}
    )
};

    dialog_pressed.addEventListener('click', () => {
        anime({
            targets : dialog_pressed,
            opacity : [1,0],
            easing : 'linear',
            complete : () => {
                dialog_pressed.style.display = "none";
                dialog_info1.style.display = "block";
                anime({
                    targets : dialog_info1,
                    opacity : [0,1]
                })
                
            }
        })}
        ,{once: true}
    );

    dialog_not_pressed.addEventListener('click', () => {
        anime({
            targets : dialog_not_pressed,
            opacity : [1,0],
            easing : 'linear',
            complete : () => {
                dialog_not_pressed.style.display = "none";
                dialog_info1.style.display = "block";
                anime({
                    targets : dialog_info1,
                    opacity : [0,1]
                })
                
            }
        })}
        ,{once: true}
    );

    dialog_info1.addEventListener('click', () => {
        anime({
            targets : dialog_info1,
            opacity : [1,0],
            easing : 'linear',
            complete : () => {
                dialog_info1.style.display = "none";
                dialog_info2.style.display = "block";
                anime.remove(dialog_arrow);
                anime({
                    targets : dialog_info2,
                    opacity : [0,1],
                    complete : () => {
                        showArrow();
                    }
                })
                
            }
        })}
        ,{once: true}
    );

    const decompte_func = function () {
        if (choice_made == 0) {
            choice_made = 1;
            anime({
                targets: [decompte, bouton_rouge],
                opacity: [1, 0],
                easing: 'linear',
                complete: () => {
                    decompte.style.display = "none";
                    bouton_rouge.style.display = "none";
                    dialog_not_pressed.style.display = "block"
                    illu_fin.style.display = "block";
                    showTitle("p6");
                    goodAns.play();
                    anime({
                        targets: [dialog_not_pressed, illu_fin],
                        opacity: [0, 1],
                        easing: 'linear'
                    })
                }

            });
        }
    };

    const print_decompte = function (i) {
        if (i > 0)
            timeout = setTimeout(() => { print_decompte(i - 1) }, 1200);
        else
            decompte_func();
        decompte.querySelector("p b").innerText = i;

        anime({
            targets: decompte,
            opacity: [0.5, 1],
            scale: [1.3, 1],
            duration: 150,
            easing: 'linear'
        });
    }
};

