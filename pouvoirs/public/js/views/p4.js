function init_p4() {
    function css(elements, style) {
        elements.forEach(element => {
            for (const property in style)
                element.style[property] = style[property];
        })
    }

    /////////////////////////////////////////////////////////////////////////////////for fonction//////////////////  

    /*
    const logimg = document.createElement('img');
    logimg.src = "/image/POUVOIR_4.svg";
    logimg.id = "logoimg";
    css([logimg], {
        'width': '87.4%',
        'height': 'auto'
    })

    const pageheader = document.createElement('div');
    pageheader.id = "pageheader";
    pageheader.appendChild(logimg);
    css([pageheader], {
        'width': '100%',
        'height': 'auto',
    })
    */
    
    /////////////////////////////////////////////////////////////////////////////////for titre//////////////////  

    const introduce = document.createElement('div');
    introduce.id = "intriduce";
    css([introduce], {
        'width': '100%',
        'height': 'auto'
    })

    const introimg = document.createElement('img');
    introimg.id = "logoimg";
    introimg.src = "img/elements/SECRETAIRE GRAND.svg";
    introduce.appendChild(introimg);
    introimg.style.cssText = "margin-left:8.5%;padding-top:24px;";
    css([introimg], {
        'width': '79.5%',
        'height': 'auto',
        'margin-left': '8.5%',
        'padding-top': '10%'
    })

    const introtext = document.createElement('div');
    introtext.id = "introtext";
    introtext.innerText = "Malgré tous vos efforts, le pays fait face à une grave crise qui menace le pays.Pour gérer cette situation, la Constitution vous laisse la possibilité de recourir à des pouvoirs exceptionnels. Mais avant toute mesure, il vous faudra consulter plusieurs personnes. Choisissez les bonnes personnes auprès desquelles vous pouvez consulter."
    css([introtext], {
        'width': '62%',
        'height': '24.5%',
        'margin-left': '22%',
        'margin-top': '-51%',
        'margin-bottom': '23%',
        'font-size': '12px',
        'font-weight': '900'
    })
    introduce.appendChild(introtext);
    ////////////////////////////////////////////////////////////////////////////////for intro text/////////////

    const button1canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    button1canvas.setAttribute("viewBox", "0 0 162 142");
    const button3canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    button3canvas.setAttribute("viewBox", "0 0 162 142");
    css([button1canvas, button3canvas], {
        'width': '35.16%',
        'height': 'auto',
        'margin-right': '3.14%',
        'fill': 'none'
    })

    const button2canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    button2canvas.setAttribute("viewBox", "0 0 162 142");
    const button4canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    button4canvas.setAttribute("viewBox", "0 0 162 142");
    css([button2canvas, button4canvas], {
        'width': '35.16%',
        'height': 'auto',
        'fill': 'none'
    })


    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.id = "rect1";
    button1canvas.appendChild(rect1);
    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button2canvas.appendChild(rect2);
    const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button3canvas.appendChild(rect3);
    const rect4 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button4canvas.appendChild(rect4);
    css([rect1, rect2, rect3, rect4], {
        'width': '162',
        'height': '142',
        'rx': '25',
        'fill': '#D4C2F0'
    })

    const pos1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button1canvas.appendChild(pos1);
    const pos2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button2canvas.appendChild(pos2);
    const pos3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button3canvas.appendChild(pos3);
    const pos4 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    button4canvas.appendChild(pos4);
    css([pos1, pos2, pos3, pos4], {
        'x': '7',
        'y': '93',
        'width': '148',
        'height': '43',
        'rx': '21.5',
        'fill': 'white'
    })

    const text1 = document.createElement('div');
    text1.innerText = "L'ASSEMBLÉE DES MAIRES DE FRANCE"
    css([text1], {
        'width': '33%',
        'height': 'auto',
        'margin-top': '-1.5%',
        'margin-right': '15%',
        'margin-left': '17.5%',
        'color': '#4F00EC',
        'font-size': '12px',
        '-webkit-transform-origin-x': '0',
        '-webkit-transform': 'scale(0.80)',
        'font-weight': '900',
        'position': 'absolute',
        'z-index': '100',
        'float': 'left'
    })

    const text2 = document.createElement('div');
    text2.innerText = "Président de l’Assemblée Nationale et du Sénat"
    css([text2], {
        'width': '40%',
        'height': 'auto',
        'margin-top': '-1.5%',
        'margin-right': '15%',
        'margin-left': '53.9%',
        'color': '#4F00EC',
        'font-size': '12px',
        '-webkit-transform-origin-x': '0',
        '-webkit-transform': 'scale(0.750)',
        'font-weight': '900',
        'position': 'absolute',
        'z-index': '100',
        'float': 'left'
    })

    const text3 = document.createElement('div');
    text3.innerText = "CONSEIL CONSTITUTIONNEL"
    css([text3], {
        'width': '31%',
        'height': 'auto',
        'margin-top': '-2%',
        'margin-right': '15%',
        'margin-left': '18.5%',
        'color': '#4F00EC',
        'font-size': '12px',
        '-webkit-transform-origin-x': '0',
        '-webkit-transform': 'scale(0.80)',
        'font-weight': '900',
        'position': 'absolute',
        'z-index': '100',
        'float': 'left',
        'font-family': 'First Fun'
    })

    const text4 = document.createElement('div');
    text4.innerText = "PREMIER MINISTRE"
    css([text4], {
        'width': '31%',
        'height': 'auto',
        'margin-top': '0%',
        'margin-right': '15%',
        'margin-left': '56.5%',
        'color': '#4F00EC',
        'font-size': '12px',
        '-webkit-transform-origin-x': '0',
        '-webkit-transform': 'scale(0.80)',
        'font-weight': '900',
        'position': 'absolute',
        'z-index': '100',
        'float': 'left',
        'font-family': 'First Fun'
    })



    const maires = document.createElement('img');
    maires.src = "img/elements/ASSEMBLE DES MAIRES.svg";
    css([maires], {
        'width': '15%',
        'height': 'auto',
        'margin-right': '22%'
    })

    const president = document.createElement('img');
    president.src = "img/elements/PRESIDENT DES MAIRES.svg";
    css([president], {
        'width': '18%',
        'height': 'auto'
    })

    const vf1 = document.createElement('img');
    vf1.src = "img/elements/button_invalid.svg";
    css([vf1], {
        'width': '4%',
        'height': 'auto',
        'margin-right': '8.4%',
        'visibility': 'hidden'
    })

    const vf2 = document.createElement('img');
    vf2.src = "img/elements/button_valid.svg";
    css([vf2], {
        'width': '4%',
        'height': 'auto',
        'margin-left': '5.5%',
        'margin-right': '-0.35%',
        'visibility': 'hidden'
    })

    //////////////////////////////////////////////////////////////////////////////for button 1 & 2/////////////////

    const conseil = document.createElement('img');
    conseil.src = "img/elements/CONSEIL CONSTITU.svg";
    css([conseil], {
        'width': '14%',
        'height': 'auto',
        'margin-right': '22%'
    })

    const ministre = document.createElement('img');
    ministre.src = "img/elements/PREMIER MINISTRE.svg";
    css([ministre], {
        'width': '18%',
        'height': 'auto',
    })

    const vf3 = document.createElement('img');
    vf3.src = "img/elements/button_valid.svg";
    css([vf3], {
        'width': '4%',
        'height': 'auto',
        'margin-right': '9.1%',
        'visibility': 'hidden'
    })

    const vf4 = document.createElement('img');
    vf4.src = "img/elements/button_valid.svg";
    css([vf4], {
        'width': '4%',
        'height': 'auto',
        'margin-left': '6%',
        'margin-right': '0%',
        'visibility': 'hidden'
    })
    ////////////////////////////////////////////////////////////////////////////////for button 3 & 4/////////////////////

    const buttonline1 = document.createElement('div');
    buttonline1.id = "buttonline1";
    buttonline1.appendChild(button1canvas);
    buttonline1.appendChild(button2canvas);

    const buttonline2 = document.createElement('div');
    buttonline2.id = "buttonline2";
    buttonline2.appendChild(button3canvas);
    buttonline2.appendChild(button4canvas);
    css([buttonline1, buttonline2], {
        'text-align': 'center',
        'vertical-align': 'middle'
    })

    const imageline1 = document.createElement('div');
    imageline1.id = "imgline1";
    imageline1.appendChild(vf1);
    imageline1.appendChild(maires);
    imageline1.appendChild(president);
    imageline1.appendChild(vf2);
    imageline1.appendChild(text1);
    imageline1.appendChild(text2);


    const imageline2 = document.createElement('div');
    imageline2.id = "imgline2";
    imageline2.appendChild(vf3);
    imageline2.appendChild(conseil);
    imageline2.appendChild(ministre);
    imageline2.appendChild(vf4);
    imageline2.appendChild(text3);
    imageline2.appendChild(text4);

    css([imageline1, imageline2], {
        'margin-top': '-38%',
        'text-align': 'center',
        'vertical-align': 'middle'
    })

    const line1 = document.createElement('div');
    line1.id = "line1";
    line1.appendChild(buttonline1);
    line1.appendChild(imageline1);
    //line1.appendChild(posline1);

    css([line1], {
        'margin-top': '7%',
        'margin-bottom': '11%'
    })

    const line2 = document.createElement('div');
    line2.id = "line2";
    line2.appendChild(buttonline2);
    line2.appendChild(imageline2);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const click1 = document.createElement('div');
    click1.id = "click1";
    click1.innerText = "fjvh";
    css([click1], {
        'margin-left': '13.3%',
        'margin-right': '15%',
        'margin-bottom': '11%',
        'margin-top': '-56.6%',
        'background-color': '#000',
        'width': '35%',
        'height': '17.1%',
        'position': 'absolute',
        'z-index': '200',
        'float': 'left',
        'opacity': '0'
    })
    const click2 = document.createElement('div');
    click2.id = "click1";
    click2.innerText = "fjv"
    css([click2], {
        'margin-left': '51.7%',//51.7
        'margin-right': '15%',
        'margin-bottom': '11%',
        'margin-top': '-56.6%',
        'background-color': '#000',
        'width': '35%',
        'height': '17.1%',
        'position': 'absolute',
        'z-index': '200',
        'opacity': '0'
    })

    const click3 = document.createElement('div');
    click3.id = "click3";
    click3.innerText = "fjv";
    css([click3], {
        'margin-left': '13.3%',
        'margin-right': '15%',
        'margin-bottom': '11%',
        'margin-top': '-22.5%',
        'background-color': '#000',
        'width': '35%',
        'height': '17.1%',
        'position': 'absolute',
        'z-index': '200',
        'float': 'left',
        'opacity': '0'
    })
    const click4 = document.createElement('div');
    click4.id = "click4";
    click4.innerText = "fjv"
    css([click4], {
        'margin-left': '51.7%',//51.7
        'margin-right': '15%',
        'margin-bottom': '11%',
        'margin-top': '-22.5%',
        'background-color': '#000',
        'width': '35%',
        'height': '17.1%',
        'position': 'absolute',
        'z-index': '200',
        'opacity': '0'
    })



    const clickcube = document.createElement('div');
    clickcube.id = "line2";
    clickcube.appendChild(click1);
    clickcube.appendChild(click2);
    clickcube.appendChild(click3);
    clickcube.appendChild(click4);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const div = document.createElement('div');
    //div.appendChild(pageheader);
    div.appendChild(introduce);
    div.appendChild(line1);
    div.appendChild(line2);
    div.appendChild(clickcube);

    let nodeParent = document.querySelector('#container');
    nodeParent.appendChild(div);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    click1.onclick = function () {
        rect1.style.fill = "#FF2019";
        vf1.style.visibility = "visible";

    }
    click2.onclick = function () {
        rect2.style.fill = "#0AF2E1";
        vf2.style.visibility = "visible";

    }
    click3.onclick = function () {
        rect3.style.fill = "#0AF2E1";
        vf3.style.visibility = "visible";

    }
    click4.onclick = function () {
        rect4.style.fill = "#0AF2E1";
        vf4.style.visibility = "visible";

    }
}
