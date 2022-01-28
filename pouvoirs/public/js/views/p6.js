const init_p6 = function() {
    const dialog_before = document.querySelector("#p6 .dialog-before");
    const dialog_pressed = document.querySelector("#p6 .dialog-pressed");
    const dialog_not_pressed = document.querySelector("#p6 .dialog-not-pressed");
    const decompte = document.querySelector("#p6 .decompte")
    const bouton_rouge = document.querySelector("#p6 .bouton-rouge");
    const power_header = document.querySelector("#p6 .pouvoir-header")

    dialog_before.style.display = "block";
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
                decompte.style.display = "block";
                anime({
                    targets : [decompte, bouton_rouge],
                    opacity : [0,1],
                    easing : 'linear'
                });
                timeout = setTimeout(decompte_func, 5000);
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
                   targets : decompte,
                   opacity : [1, 0],
                   easing : 'linear',
                   complete : () => {
                       decompte.style.display = "none";
                       dialog_pressed.style.display = "block"
                       anime({
                            targets : dialog_pressed,
                            opacity : [0, 1],
                            easing : 'linear'
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
                       anime({
                            targets : dialog_not_pressed,
                            translateY : "50%",
                            opacity : [0, 1],
                            easing : 'linear'
                       })
                   }

               });


    };

};

