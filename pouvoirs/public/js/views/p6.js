const init_p6 = function() {
    const dialog_before = document.querySelector("#p6 .dialog-before");
    const dialog_pressed = document.querySelector("#p6 .dialog-pressed");
    const dialog_not_pressed = document.querySelector("#p6 .dialog-not-pressed");
    const decompte = document.querySelector("#p6 .decompte")
    const bouton_rouge = document.querySelector("#p6 .bouton-rouge");
    const power_header = document.querySelector("#p6 .pouvoir-header");
    const illu_fin = document.querySelector("#p6 .illu-fin");

    let timeout;
    let choice_made = 0;



    dialog_before.addEventListener('click', () =>{
        anime({
            targets : dialog_before,
            opacity: [1, 0],
            easing: 'linear',
            complete : () => {
                dialog_before.style.display = "none";
                bouton_rouge.style.display = "block";
                decompte.style.display = "flex";
                anime({
                    targets : [decompte, bouton_rouge],
                    opacity : [0,1],
                    easing : 'linear',
                    complete : () => {print_decompte(5);}
                });
            }
        })
    });

    bouton_rouge.addEventListener('click', () => {
        clearTimeout(timeout);
        if(choice_made == 0){
        anime({
            targets : bouton_rouge,
            scale : 0.98,
            easing : 'linear',
            direction : 'alternate',
            duration : 150,
            complete : () => {
               anime({
                   targets : [decompte, bouton_rouge],
                   opacity : [1, 0],
                   easing : 'linear',
                   complete : () => {
                       decompte.style.display = "none";
                       bouton_rouge.style.display = "none";
                       dialog_pressed.style.display = "block";
                       illu_fin.style.display = "block";

                       anime({
                            targets : [dialog_pressed, illu_fin],
                            opacity : [0, 1],
                            easing : 'linear',
                       })
                   }

               }) 
            }
        });
        choice_made = 1;
    }
    });
    
    const decompte_func = function() {
               anime({
                   targets : [decompte, bouton_rouge],
                   opacity : [1, 0],
                   easing : 'linear',
                   complete : () => {
                       decompte.style.display = "none";
                       bouton_rouge.style.display = "none";
                       dialog_not_pressed.style.display = "block"
                       illu_fin.style.display = "block";
                       anime({
                            targets : [dialog_not_pressed, illu_fin],
                            opacity : [0, 1],
                            easing : 'linear'
                       })
                   }

               });


    };

    const print_decompte = function(i) {
        decompte.querySelector("p").innerText = i;
        anime({
            targets : decompte,
            opacity : [0.5, 1],
            scale : [1.3, 1],
            duration : 150,
            easing : 'linear'
        });
        if(i > 0)
            timeout = setTimeout(() => { print_decompte(i-1)}, 1000);
        else
            decompte_func();
    }

};

