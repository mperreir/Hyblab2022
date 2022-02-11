var debug;
var ajoutPrefixe = '_';
var debugxy = '';
/*Initialisation*/
function init(owner_id, evt) {
    hide_help(owner_id);
    debug = false;
    var prefixe_ids = owner_id + ajoutPrefixe;
    //	masque_regions_absentes()
    if (eval(prefixe_ids + 'help_last') == 1) {
        var graph_data = eval(prefixe_ids + 'graph_data');
        show_help_dot_ligcol(owner_id, graph_data.length - 1, graph_data[0].length - 1);
    }
    //tri de symboles des cartes pour faire passer les plus petits devant (faute de pouvoir le faire dans le XSL)
    var list2SortPrefix = prefixe_ids + 'carte';
    var list2SortSuffix = '_symboles';
    var maps = getElemParmiAutreElem(owner_id, list2SortPrefix + '[0-9]*' + list2SortSuffix, 'g');
    for (var i = 1; i <= maps.length; i++) {
        sort_list(owner_id, list2SortPrefix + i + list2SortSuffix, 'size');
    }
} // end init function

function txt_debug(owner_id, txt) {
    setSVGdata(owner_id, owner_id + ajoutPrefixe + 'debug', txt);
}

function setSVGdata(owner_id, p_id, p_data) {
    var elmt = ownerSVG(owner_id).getElementById(p_id);
    if (typeof elmt == 'undefined' || elmt == null) {
        console.log('erreur SVGdata : p_data=' + p_data + ' p_id=' + p_id);
    } else {
        elmt.firstChild.data = p_data;
    }
}

function setSVGattr(owner_id, p_id, p_attrname, p_attrval) {
    var svgelement = ownerSVG(owner_id).getElementById(p_id);
    if (svgelement != null && p_attrval != null) {
        svgelement.setAttributeNS(null, p_attrname, p_attrval);
    }
}
function addSVGattr(owner_id, p_id, p_attrname, p_attrval) {
    var svgelement = ownerSVG(owner_id).getElementById(p_id);
    if (svgelement != null) {
        var attr_value = getSVGattr(owner_id, p_id, p_attrname);
        if (attr_value != null) {
            svgelement.setAttributeNS(null, p_attrname, attr_value + ';' + p_attrval);
        } else {
            svgelement.setAttributeNS(null, p_attrname, ';' + p_attrval);
        }
    }
}
function removeSVGattr(owner_id, p_id, p_attrname, p_attrval) {
    var svgelement = ownerSVG(owner_id).getElementById(p_id);
    if (svgelement != null) {
        var attr_value = getSVGattr(owner_id, p_id, p_attrname);
        svgelement.setAttributeNS(null, p_attrname, attr_value.replace(';' + p_attrval, ''));
    }
}
function getSVGattr(owner_id, p_id, p_attrname) {
    //	if (debug) alert(p_id+'	'+p_attrname+'<--'+p_attrval);
    //console.log("getSVGattr owid="+owner_id+" p_id="+p_id);

    var svgelement = ownerSVG(owner_id).getElementById(p_id);
    if (svgelement == null) {
        return null;
    } else {
        return svgelement.getAttributeNS(null, p_attrname);
    }
}

function setSVGtext(owner_id, p_nomvar) {
    setSVGdata(owner_id, p_nomvar, eval(p_nomvar));
}

function ownerSVG(p_id) {
    return document.getElementById(p_id);
}

function findPosLeft(obj) {
    var curleft = obj.offsetLeft || 0;
    while ((obj = obj.offsetParent)) {
        curleft += obj.offsetLeft;
    }
    return curleft;
}

function findPosTop(obj) {
    var curtop = obj.offsetTop || 0;
    while ((obj = obj.offsetParent)) {
        curtop += obj.offsetTop;
    }
    return curtop;
}




function position_x(owner_id, ev) {
    var owner = ownerSVG(owner_id);
    var bodyRect = document.body.getBoundingClientRect(),
        ownerRect = owner.getBoundingClientRect(),
        offsetLeft = ownerRect.left - bodyRect.left;
    debugxy = 'brl=' + bodyRect.left + ' or=' + ownerRect.left + ' px=' + ev.pageX + ' ol=' + offsetLeft;

    /* On modifie les coordonnées de la position du clique pour prendre en compte le ratio entre les dimensions du viewBox du SVG et les dimensions réelles du SVG */
    /* Sinon, les infobulles ne se mettent pas au bon endroit */
    var ownerWidth = document.getElementById(owner_id).clientWidth;
    var viewBoxWidth = document.getElementById(owner_id+"_cadre").width.animVal.value;
    var ratioX = (viewBoxWidth + 1) / ownerWidth;
    return (ev.pageX - offsetLeft) * ratioX;
}

function position_y(owner_id, ev) {

    var owner = ownerSVG(owner_id);
    var bodyRect = document.body.getBoundingClientRect(),
        ownerRect = owner.getBoundingClientRect(),
        offsetTop = ownerRect.top - bodyRect.top;

    /* On modifie les coordonnées de la position du clique pour prendre en compte le ratio entre les dimensions du viewBox du SVG et les dimensions réelles du SVG */
    /* Sinon, les infobulles ne se mettent pas au bon endroit */
    var ownerHeight = document.getElementById(owner_id).clientHeight;
    var viewBoxHeight = document.getElementById(owner_id+"_cadre").height.animVal.value;
    var ratioY = viewBoxHeight / ownerHeight;
    return (ev.pageY - offsetTop + 5) * ratioY;
}

function depasse_lib(owner_id, lib, largeur, limite, ligne_lib) {
    if (largeur > limite) {
        //decouper en deux
        var lib_long = lib;
        var nbcar_dec = Math.floor(lib_long.length * limite / largeur);
        var bout1 = lib_long.substr(0, nbcar_dec);
        var bout2 = lib_long.substr(nbcar_dec);
        var dernier_blanc = pos_dernier_sep(bout1, ' ');
        if (dernier_blanc > 0) {
            bout1 = lib_long.substr(0, dernier_blanc - 1);
            bout2 = lib_long.substr(dernier_blanc);
        }
        setSVGdata(owner_id, owner_id + ajoutPrefixe + 'help-lib' + ligne_lib, bout1);
        setSVGdata(owner_id, owner_id + ajoutPrefixe + 'help-lib' + ligne_lib + 'b', bout2);
        return true;
    } else {
        return false;
    }
}

function hide_help(owner_id) {
    setSVGattr(owner_id, owner_id + ajoutPrefixe + 'help', 'opacity', '0');
}
function get_libligne(data, ligne, colonne) {
    var libligne;
    try {
        libligne = data[ligne][0];
        // pour d�clencher l'erreur, ce que ne fait pas la ligne pr�c�dente
        var l = libligne.length;
    } catch (err) {
        libligne = '??';
    }
    if (libligne.indexOf('|') == -1) {
        return libligne;
    } else {
        // extraire en fonction de la colonne
        return get_elem_liste_string(libligne, colonne, '|');
    }
}
function show_help_xy(owner_id, x, y, ligne, colonne, colonne2, colonne3) {
    var rectbulle_height, rectbulle_left, queue_height, rect_height, rect_width, trans_x, trans_y, max_l, rect_corner, rect_halfcorner, rect_left, ligne_factor;
    var lib_ligne, lib_colonne, lib_colonne2, lib_colonne3;

    ligne_factor = 1.3;
    queue_height = 15;
    rect_corner = 10;
    var prefixe_ids = owner_id + ajoutPrefixe;
    var help_nblig = eval(prefixe_ids + 'help_nblig');
    var help_fontsize = eval(prefixe_ids + 'help_fontsize');
    var graph_l = eval(prefixe_ids + 'graph_l');
    var graph_data = eval(prefixe_ids + 'graph_data');
    //Recuperation des libelles de ligne et colonne
    try {
        lib_colonne = graph_data[0][colonne];
        // pour declencher l'erreur, ce que ne fait pas la ligne precedente
        var l = lib_colonne.length;
    } catch (err) {
        lib_colonne = '??';
    }
    lib_ligne = get_libligne(graph_data, ligne, colonne);

    /*
    try {
        libligne = graph_data[ligne][0];
        // pour declencher l'erreur, ce que ne fait pas la ligne precedente
        l=libligne.length;
    } catch(err) {
        libligne = "??";
    }
    */
    var help_value = graph_data[ligne][colonne];

    //Construction des libelles de la bulle d'aide
    var help_libs = [];
    setSVGattr(owner_id, prefixe_ids + 'help-libs', 'transform', 'translate(0,' + help_fontsize * ligne_factor * 0.2 + ')');
    if (typeof colonne2 !== 'undefined') {
        //si on a une 2nde colonne(cas du nuage de point), on a un 2nd libelle de colonne
        try {
            lib_colonne2 = graph_data[0][colonne2];
            var l = lib_colonne2.length;
        } catch (err) {
            lib_colonne2 = '??';
        }
        var help_value2 = graph_data[ligne][colonne2];
        help_libs[1] = lib_ligne;
        help_libs[2] = lib_colonne + ' : ' + help_value;
        help_libs[3] = lib_colonne2 + ' : ' + help_value2;
        //help_libs[4]='';
        //setSVGattr(owner_id,prefixe_ids+"help-lib2","style","font-weight:bold;");
        if (typeof colonne3 !== 'undefined' && help_nblig == 4) {
            //si on a une 3eme colonne(cas du nuage de point avec symboles proportionnels), on a un 3eme libelle de colonne
            try {
                lib_colonne3 = graph_data[0][colonne3];
                var l = lib_colonne3.length;
            } catch (err) {
                lib_colonne3 = '??';
            }
            var help_value3 = graph_data[ligne][colonne3];
            //setSVGattr(owner_id,prefixe_ids+"help-lib4","style","font-weight:bold;");
            setSVGattr(owner_id, prefixe_ids + 'help-libs', 'transform', 'translate(0,-' + help_fontsize * ligne_factor * (1 - 0.2) + ')');
            help_libs[4] = lib_colonne3 + ' : ' + help_value3;
        }
    } else {
        help_libs[1] = lib_colonne;
        help_libs[2] = lib_ligne;
        help_libs[3] = help_value;
        if (help_nblig < 3) {
            //cas ou on a 2 lignes de libelles ou moins : on ne montre pas le libelle de colonne
            help_libs[1] = '';
        }
        if (help_nblig < 2) {
            //cas ou on n'a qu'une ligne de libelle : on ne montre pas le libelle de ligne
            help_libs[2] = '';
        }
    }
    //Remplissage de la bulle avec le libelle
    for (var l_lig = 1; l_lig <= 4; l_lig++) {
        if (typeof help_libs[l_lig] !== 'undefined') {
            setSVGdata(owner_id, prefixe_ids + 'help-lib' + l_lig, help_libs[l_lig]);
        }
    }
    //Decoupage auto en deux lignes si bulle trop large
    var svgdoc = ownerSVG(owner_id);
    var width1 = svgdoc.getElementById(prefixe_ids + 'help-lib1').getBBox().width;
    var width2 = svgdoc.getElementById(prefixe_ids + 'help-lib2').getBBox().width;
    var width3 = svgdoc.getElementById(prefixe_ids + 'help-lib3').getBBox().width;
    try {
        var width4 = svgdoc.getElementById(prefixe_ids + 'help-lib4').getBBox().width;
    } catch (err) {
        var width4 = 0;
    }
    var max_width = Math.max(width1, width2, width3, width4);
    var lib_depasse = [false, false, false];
    var width_limit = graph_l - 3 * rect_corner;
    var nblig_help = help_nblig;
    if (max_width > width_limit && help_nblig >= 2) {
        if (depasse_lib(owner_id, help_libs[2], width2, width_limit, 2)) {
            lib_depasse[2] = true;
            width2 = svgdoc.getElementById(prefixe_ids + 'help-lib2').getBBox().width;
            nblig_help++;
        }
        if (depasse_lib(owner_id, help_libs[1], width1, width_limit, 1)) {
            lib_depasse[1] = true;
            width1 = svgdoc.getElementById(prefixe_ids + 'help-lib1').getBBox().width;
            nblig_help++;
        }
        max_width = Math.max(width1, width2, width3);
    }
    rect_width = max_width + 2 * rect_corner;
    // console.log(lib_depasse)
    // console.log(owner_id,owner_id+ " x="+x+" y="+y)
    rectbulle_height = Math.round(help_fontsize * ligne_factor * (nblig_help + 0.5));
    rect_height = rectbulle_height + queue_height;
    rect_halfcorner = Math.round(rect_corner / 2);
    rectbulle_left = rectbulle_height - 2 * rect_corner;
    var ligne_help = 1;
    // console.log(owner_id,owner_id+ " x="+x+" y="+y)
    var top_libs = -help_fontsize * ligne_factor * nblig_help;
    top_libs = rect_halfcorner - (3 - help_nblig - 0.5) * help_fontsize * ligne_factor;
    for (var l_lig = 1; l_lig <= 4; l_lig++) {
        var libobj_name = prefixe_ids + 'help-lib' + l_lig;
        setSVGattr(owner_id, libobj_name, 'y', Math.round(top_libs + help_fontsize * ligne_factor * (ligne_help - 1)));
        ligne_help = ligne_help + 1;
        setSVGattr(owner_id, libobj_name, 'x', rect_corner);
        if (l_lig < 3) {
            var libobj_name_b = libobj_name + 'b';
            if (lib_depasse[l_lig] == true) {
                setSVGattr(owner_id, libobj_name_b, 'y', Math.round(top_libs + help_fontsize * ligne_factor * (ligne_help - 1)));
                ligne_help = ligne_help + 1;
                setSVGattr(owner_id, libobj_name, 'x', rect_width - rect_corner);
                setSVGattr(owner_id, libobj_name, 'style', 'text-anchor:end;');
                setSVGattr(owner_id, libobj_name_b, 'x', rect_width - rect_corner);
                setSVGattr(owner_id, libobj_name_b, 'opacity', 1);
            } else {
                setSVGattr(owner_id, libobj_name, 'style', 'text-anchor:start;');
                setSVGattr(owner_id, libobj_name_b, 'opacity', 0);
            }
        }
    }
    trans_x = x + 0;
    trans_y = y - rect_height;
    // bute bord droit
    var x_pointe;
    if (trans_x + rect_width + 5 > graph_l) {
        trans_x = graph_l - rect_width - 5;
        x_pointe = x - trans_x;
    } else {
        x_pointe = 0;
    }
    // bute en haut
    if (trans_y < 0) {
        rect_height = rect_height + trans_y;
        trans_y = 0;
        if (rect_height < rectbulle_height) {
            rect_height = rectbulle_height;
        }
    }

    //Calcul du Path de la bulle
    //Commandes path miniscule : relatif, majuscule : absolu
    //Debut deux coins arrondis
    var path_d1 =
        'M' +
        rect_corner +
        ' ' +
        rectbulle_height +
        ' c-' +
        rect_corner +
        ' 0 -' +
        rect_corner +
        ' -' +
        rect_halfcorner +
        ' -' +
        rect_corner +
        ' -' +
        rect_corner +
        ' v-' +
        rectbulle_left +
        ' c0 -' +
        rect_corner +
        ' ' +
        rect_halfcorner +
        ' -' +
        rect_corner +
        ' ' +
        rect_corner +
        ' -' +
        rect_corner +
        ' ';
    //Trait horizontal en fonction de la longueur necessaire
    var path_d2 = 'h' + (rect_width - 2 * rect_corner) + ' ';
    //Deux coins arrondis et debut de la fleche de bulle
    var path_d3 =
        'c' +
        rect_corner +
        ' 0 ' +
        rect_corner +
        ' ' +
        rect_halfcorner +
        ' ' +
        rect_corner +
        ' ' +
        rect_corner +
        ' v' +
        rectbulle_left +
        ' c0 ' +
        rect_corner +
        ' -' +
        rect_halfcorner +
        ' ' +
        rect_corner +
        ' -' +
        rect_corner +
        ' ' +
        rect_corner +
        ' ';
    //Pointe fleche de bulle x=0 si bulle ne mord pas a droite, sinon x en fonction du deplacement de bulle
    var xdeb_patte = Math.round((55 + x_pointe + 60) / 2);
    if (xdeb_patte > rect_width - 2 * rect_corner) {
        xdeb_patte = rect_width - 2 * rect_corner;
    }
    var path_d4 = 'H' + xdeb_patte + ' L' + x_pointe + ' ' + rect_height + ' ';
    var path_d5 = 'L' + (xdeb_patte - 24) + ' ' + rectbulle_height + ' H' + rect_corner + '';
    setSVGattr(owner_id, prefixe_ids + 'help-bubble', 'd', path_d1 + path_d2 + path_d3 + path_d4 + path_d5);
    setSVGattr(owner_id, prefixe_ids + 'help', 'transform', 'translate(' + trans_x + ',' + trans_y + ')');
    setSVGattr(owner_id, prefixe_ids + 'help', 'opacity', '1');
}

function show_help(owner_id, ev, ligne, colonne, colonne2, colonne3) {
    show_help_xy(owner_id, position_x(owner_id, ev), position_y(owner_id, ev) - 5, ligne, colonne, colonne2, colonne3);
}

function get_dot_id(owner_id, ligne, colonne) {
    return owner_id + ajoutPrefixe + 'point-C' + colonne + '-L' + ligne;
}

function show_help_dot(owner_id, ev, ligne, colonne, colonne2, colonne3) {
    var prefixe_ids = owner_id + ajoutPrefixe;
    var keep_title = eval(prefixe_ids + 'keep_title');
    // pour le cas ou les intitules de colonnes sont forces par 'libcolonnes'
    // on a garde les libelles originaux
    var lib_colonne_brut = eval(prefixe_ids + 'lib_colonne_brut');
    var graph_data = eval(prefixe_ids + 'graph_data');
    var dot_id = get_dot_id(owner_id, ligne, colonne);
    // var dot_id=ev.target.id //correction possible : plutot que calculer l'id, on va chercher la cible, pb : on ne passe pas l'evenement dans hide_help...
    // console.log(ev.target.id);
    setSVGattr(owner_id, dot_id, 'fill-opacity', '1');
    if (keep_title == 1) {
        var title_lib = lib_colonne_brut[colonne];
        if (typeof colonne2 !== 'undefined') {
            title_lib = title_lib + ' / ' + lib_colonne_brut[colonne2];
        }
        if (typeof colonne3 !== 'undefined') {
            title_lib = title_lib + ' / ' + lib_colonne_brut[colonne3];
        }
        setSVGattr(owner_id, dot_id, 'title', title_lib);
    }
    show_help(owner_id, ev, ligne, colonne, colonne2, colonne3);
}

function show_help_dot_xy(owner_id, x, y, ligne, colonne) {
    setSVGattr(owner_id, get_dot_id(owner_id, ligne, colonne), 'fill-opacity', '1');
    show_help_xy(owner_id, x, y, ligne, colonne);
}
function show_help_dot_ligcol(owner_id, ligne, colonne) {
    var dot_id = get_dot_id(owner_id, ligne, colonne);
    var dot = document.getElementById(dot_id);
    var x = dot.getAttribute('cx');
    var y = dot.getAttribute('cy');
    show_help_dot_xy(owner_id, x, y, ligne, colonne);
}

function hide_help_dot(owner_id, ligne, colonne) {
    setSVGattr(owner_id, get_dot_id(owner_id, ligne, colonne), 'fill-opacity', '0');
    hide_help(owner_id);
}

function show_hide_help_line(owner_id, ligne, colonne, opacity) {
    setSVGattr(owner_id, get_dot_id(owner_id, ligne, colonne), 'fill-opacity', opacity);
    setSVGattr(owner_id, get_dot_id(owner_id, ligne - 1, colonne), 'fill-opacity', opacity);
}

function show_help_line(owner_id, ligne, colonne) {
    show_hide_help_line(owner_id, ligne, colonne, '1');
}

function hide_help_line(owner_id, ligne, colonne) {
    show_hide_help_line(owner_id, ligne, colonne, '0');
}

function show_help_poly(owner_id, ev, ligne, colonne) {
    // si xsouris < xpoint1+diametre cercle point 1 ou > xpoint2-diametre cercle point2, montrer aide point
    // sinon, montrer aide ligne
    x_souris = position_x(owner_id, ev);
    y_souris = position_y(owner_id, ev);
    cercle_1 = get_dot_id(ligne - 1, colonne);
    cercle_2 = get_dot_id(ligne, colonne);
    x_point1 = parseInt(getSVGattr(owner_id, cercle_1, 'cx'));
    y_point1 = parseInt(getSVGattr(owner_id, cercle_1, 'cy'));
    r_point1 = parseInt(getSVGattr(owner_id, cercle_1, 'r'));
    x_point2 = parseInt(getSVGattr(owner_id, cercle_2, 'cx'));
    y_point2 = parseInt(getSVGattr(owner_id, cercle_2, 'cy'));
    r_point2 = parseInt(getSVGattr(owner_id, cercle_2, 'r'));
    //	setSVGdata("debug","x_souris="+x_souris+" x_point1=" + x_point1+" x_point2=" + x_point2+" r_point1=" + r_point1+" somme="+(x_point1 + r_point1 + 1)+(x_souris < (x_point1 + r_point1+1)));
    if (x_souris < (x_point1 + x_point2) / 2) {
        hide_help_line(owner_id, ligne, colonne);
        show_help_dot_xy(owner_id, x_point1, y_point1, ligne - 1, colonne);
    } else {
        if (x_souris > (x_point1 + x_point2) / 2) {
            hide_help_line(owner_id, ligne, colonne);
            show_help_dot_xy(owner_id, x_point2, y_point2, ligne, colonne);
        } else {
            show_help_line(owner_id, ligne, colonne);
            hideHelp(owner_id);
        }
    }
}

function hide_help_poly(owner_id, ev, ligne, colonne) {
    hide_help_line(owner_id, ligne, colonne);
    hide_help(owner_id);
}

function hide_help_path(owner_id) {
    var prefixe_ids = owner_id + ajoutPrefixe;
    setSVGattr(owner_id, prefixe_ids + 'path_selec', 'opacity', '0');
    setSVGattr(owner_id, prefixe_ids + 'rect_selec', 'opacity', '0');
    hide_help(owner_id);
}

function show_help_path(owner_id, ev, ligne, colonne, p_id) {
    var prefixe_ids = owner_id + ajoutPrefixe;
    try {
        // pour declencher l'erreur, ce que ne fait pas la ligne precedente
        show_help_xy(owner_id, position_x(owner_id, ev), position_y(owner_id, ev) - 5, ligne, colonne);
        if (typeof p_id == 'undefined') {
            path_id = ev.target.id;
        } else {
            path_id = p_id;
        }
        var path_zone = getSVGattr(owner_id, path_id, 'd');
        var transform_zone = getSVGattr(owner_id, path_id, 'transform');
        setSVGattr(owner_id, prefixe_ids + 'path_selec', 'd', path_zone);
        setSVGattr(owner_id, prefixe_ids + 'path_selec', 'transform', transform_zone);
        setSVGattr(owner_id, prefixe_ids + 'path_selec', 'opacity', '1');
        //pareil sur la barre eventuelle
        path_rect = getSVGattr(owner_id, path_id + '_barre', 'd');
        if (path_rect !== null) {
            setSVGattr(owner_id, prefixe_ids + 'rect_selec', 'd', path_rect);
            setSVGattr(owner_id, prefixe_ids + 'rect_selec', 'opacity', '1');
        }
    } catch (err) {
        ligne = '??';
    }
}

function rangArray(element, liste) {
    for (rang = 1; rang <= liste.length; rang++) {
        if (liste[rang - 1] == element) {
            return rang;
        }
    }
    return 0;
}

function show_help_rect(owner_id, ev, codegeo, colonne) {
    var code_geo_data = eval(owner_id + '_code_geo_data');
    var ligne = rangArray(codegeo, code_geo_data);
    //calculer ligne a partir du code
    //indexOF d'array non supporte en IE8
    rect_id = ev.target.id;
    path_id = rect_id.replace('_barre', '');
    show_help_path(owner_id, ev, ligne, colonne, path_id);
}

function pos_dernier_sep(chaine, sep) {
    var longueur = chaine.length;
    var pos = longueur;
    for (pos = longueur; pos > 0; pos--) {
        if (chaine.charAt(pos - 1) == sep) {
            return pos;
        }
    }
    return 0;
}

function show_hide_objet(owner_id, type, id) {
    var prefixe_ids = owner_id + ajoutPrefixe;
    var idLegende = prefixe_ids + 'legende-C' + id;
    var idObjet = prefixe_ids + type + '-C' + id;
    var idObjets = getElemParmiAutreElem(owner_id, prefixe_ids + type + '-C' + id + '[a-zA-Z0-9]*', '*');
    var idObjetPoints = idObjet + '-points';
    var idObjetMarques = getElemParmiAutreElem(owner_id, prefixe_ids + 'courbes-marques-C' + id + '-L[0-9]*', 'use');
    var idObjetLignes = idObjet;
    var idObjetClone = idObjet + '_c';
    var classLegende = getSVGattr(owner_id, idLegende, 'class');
    var classAction = prefixe_ids + 'clicked';
    var regExp = new RegExp('\\s?\\b' + classAction + '\\b', 'gi');
    var svgdoc = ownerSVG(owner_id);
    if (regExp.test(classLegende)) {
        //show
        classLegende = classLegende.replace(regExp, '');
        setSVGattr(owner_id, idLegende, 'opacity', '1');
        for (i = 0; i < idObjets.length; i++) {
            //			setSVGattr(owner_id,idObjets[i].id,"style","");
            removeSVGattr(owner_id, idObjets[i].id, 'style', 'display:none');
        }
        //		setSVGattr(owner_id,idObjetPoints,"style","");
        removeSVGattr(owner_id, idObjetPoints, 'style', 'display:none');
        //		setSVGattr(owner_id,idObjetLignes,"style","");
        removeSVGattr(owner_id, idObjetLignes, 'style', 'display:none');
        for (i = 0; i < idObjetMarques.length; i++) {
            //			setSVGattr(owner_id,idObjetMarques[i].id,"style","");
            removeSVGattr(owner_id, idObjetMarques[i].id, 'style', 'display:none');
        }
        if (svgdoc.getElementById(idObjetClone) !== null) {
            setSVGattr(owner_id, idObjetClone, 'opacity', '1');
        }
    } else {
        //hide
        classLegende += ' ' + classAction;
        setSVGattr(owner_id, idLegende, 'opacity', '0.2');
        for (var i = 0; i < idObjets.length; i++) {
            addSVGattr(owner_id, idObjets[i].id, 'style', 'display:none');
        }
        addSVGattr(owner_id, idObjetPoints, 'style', 'display:none');
        addSVGattr(owner_id, idObjetLignes, 'style', 'display:none');
        for (var i = 0; i < idObjetMarques.length; i++) {
            addSVGattr(owner_id, idObjetMarques[i].id, 'style', 'display:none');
        }
        if (svgdoc.getElementById(idObjetClone) !== null) {
            setSVGattr(owner_id, idObjetClone, 'opacity', '0');
            normalize_objet(owner_id, type, id);
        }
    }
    setSVGattr(owner_id, idLegende, 'class', classLegende);
}

function getSVGStyle(owner_id, classSearched, cssSearched) {
    try {
        style = ownerSVG(owner_id).getElementsByTagName('style')[0].firstChild.data;
        var regExp = new RegExp('.*.' + classSearched + '.*{.*' + cssSearched + '.*:(.*);.*}', 'gi');
        return regExp.exec(style)[1];
    } catch (err) {
        return '';
    }
}

function maximize_objet(owner_id, type, id, delta_width) {
    var prefixe_ids = owner_id + ajoutPrefixe;
    var idObjet = prefixe_ids + type + '-C' + id;
    var idObjetClone = idObjet + '_c';
    var classObjet = prefixe_ids + type + id;
    //on fait passer l'objet devant en clonant un objet a la fin
    node = ownerSVG(owner_id).getElementById(idObjet);
    cloned = node.cloneNode(false);
    cloned.setAttribute('id', idObjetClone);
    lastOne = node.parentNode.lastChild;
    node.parentNode.insertBefore(cloned, lastOne);
    // console.log("classObjet="+classObjet);
    /*
    strokewidth=parseInt(getSVGStyle(owner_id,classObjet,"stroke-width"))+delta_width;
    setSVGattr(owner_id,idObjetClone,"style","stroke-width:"+strokewidth);
*/

    var old_stroke_width = getSVGStyle(owner_id, classObjet, 'stroke-width');
    if (old_stroke_width != '') {
        strokewidth = parseInt(old_stroke_width) + delta_width;
    } else {
        var obj_style = getSVGattr(owner_id, idObjetClone, 'style');
        var regExp = new RegExp('.*stroke-width *: *([0-9.]*) *;.*', 'gi');
        strokewidth = parseInt(regExp.exec(obj_style)[1]) + delta_width;
    }
    addSVGattr(owner_id, idObjetClone, 'style', 'stroke-width:' + strokewidth);
    //alert(getSVGattr(idObjetClone,"style"))
}

function normalize_objet(owner_id, type, id) {
    var prefixe_ids = owner_id + ajoutPrefixe;
    var idObjet = prefixe_ids + type + '-C' + id;
    var idObjetClone = idObjet + '_c';
    // console.log(idObjet);
    node = ownerSVG(owner_id).getElementById(idObjetClone);
    node.parentNode.removeChild(node);
}

function sort_list(owner_id, idlist, attribut) {
    var list = ownerSVG(owner_id).getElementById(idlist);
    if (list) {
        var items = list.childNodes;
        var itemsArr = [];
        for (var i in items) {
            if (items[i].nodeType == 1) {
                // test pour ne pas prendre les espaces pour des noeuds (selon les navigateurs)
                itemsArr.push(items[i]);
            }
        }
        itemsArr.sort(function(a, b) {
            aa = parseInt(a.getAttribute(attribut));
            bb = parseInt(b.getAttribute(attribut));
            return aa == bb ? 0 : aa < bb ? 1 : -1;
        });
        for (var i = 0; i < itemsArr.length; ++i) {
            list.appendChild(itemsArr[i]);
        }
    }
}

function getElemParmiAutreElem(owner_id, pRegExpElem, pAutreElem) {
    var tab = ownerSVG(owner_id).getElementsByTagName(pAutreElem);
    var items = [];
    if (tab) {
        for (var i = 0; i < tab.length; i++) {
            if (tab[i] !== null) {
                var regExp = new RegExp(pRegExpElem, 'gi');
                var resu = tab[i].id.match(pRegExpElem);
                if (resu) {
                    items.push(tab[i]);
                }
            }
        }
        return items;
    }
}

function getElemMax(owner_id, pIdElem) {
    tabliste = getElemParmiAutreElem(owner_id, '([A-Za-z0-9]*)-mark([0-9]*)', 'use');
    var maxi = 0;
    for (var i = 0; i < tabliste.length; i++) {
        maxi = Math.max(maxi, tabliste[i].getAttribute('width'));
    }
}
function getZoomRect(id_svg, id_path, code, pourcentage_marge) {
    //on recupere le polygone de la zone a zoomer (path)
    var id_zoompath = id_svg + '_' + id_path + '_' + code;
    //alert(id_zoompath)
    var zoom_path = getSVGattr(owner_id, id_zoompath, 'd');
    /*	zoom_path=zoom_path.replace('L','')
    zoom_path=zoom_path.replace('M','')
    zoom_path=zoom_path.replace('  ',' ')
    */
    // tableau pour stocker les x et les y du polygone
    var path_x = new Array();
    var path_y = new Array();
    // boucle de dematricage du path
    //parcours du soom_path, pour extraire les x et les y
    var num_car = 0;
    var value = '';
    var x = true; // on charge alternativement les x et les y
    while (num_car < zoom_path.length) {
        var car = zoom_path.charAt(num_car);
        if (car in ['-', '0', '1', '3', '4', '5', '6', '7', '8', '9']) {
            value += car;
        } else {
            if (value != '') {
                if (x == true) {
                    path_x.push(value);
                } else {
                    path_y.push(value);
                }
                x = !x;
                value = '';
            }
        }
        num_car++;
    }
    //extraction du rectangle englobant le polygone : calculs de min et max des x et y
    // syntaxe ... (spread operator, equivalent a apply) supportee par ECMASCRIPT 6
    var min_x_zone = Math.min(...path_x);
    var min_y_zone = Math.min(...path_y);
    var max_x_zone = Math.max(...path_x);
    var max_y_zone = Math.max(...path_y);
    var largeur_zone = max_x_zone - min_x_zone;
    var hauteur_zone = max_y_zone - min_y_zone;
    // prise en compte de la marge en pourcentage
    var dx_marge = largeur_zone * pourcentage_marge / 100;
    var dy_marge = hauteur_zone * pourcentage_marge / 100;
    var x_rect_zone = min_x_zone - dx_marge;
    var y_rect_zone = min_y_zone - dy_marge;
    var l_rect_zone = largeur_zone + 2 * dx_marge;
    var h_rect_zone = hauteur_zone + 2 * dy_marge;
    var prefixe = id_svg + '_';
    // test de visualisation du rectangle pour debug, a supprimer
    /*
    var path_rect_zone="M "+(x_rect_zone-100)+","+(y_rect_zone-300)+" l "+(l_rect_zone)+",0"+" l 0,"+(h_rect_zone)+" l "+(-l_rect_zone)+",0 Z"
        if (path_rect_zone !== null)
        {
            setSVGattr(owner_id,prefixe+"rect_selec","d",path_rect_zone);
            setSVGattr(owner_id,prefixe+"rect_selec","opacity","1");
        }
        */
    // fin test

    //recuperation des positions et taille du rectangle d'inclusion de la carte (*1 pour passer en numerique)
    var x_rect_inclusion = getSVGattr(owner_id, prefixe + 'rect_inclusion_carte', 'x') * 1;
    var y_rect_inclusion = getSVGattr(owner_id, prefixe + 'rect_inclusion_carte', 'y') * 1;
    var l_rect_inclusion = getSVGattr(owner_id, prefixe + 'rect_inclusion_carte', 'width') * 1;
    var h_rect_inclusion = getSVGattr(owner_id, prefixe + 'rect_inclusion_carte', 'height') * 1;
    //calcul de l'echelle a�appliquer
    var carte_scale = get_zoom_scale(l_rect_zone, h_rect_zone, l_rect_inclusion, h_rect_inclusion);
    // calcul de la translation a appliquer pour caler le polygone (rectangle incluant zone) au centre du rectangle d'inclusion
    // on aligne les centres des deux rectangles
    var x_centre_rect_zone = x_rect_zone + l_rect_zone / 2;
    var y_centre_rect_zone = y_rect_zone + h_rect_zone / 2;
    var x_centre_rect_inclusion = x_rect_inclusion + l_rect_inclusion / 2;
    var y_centre_rect_inclusion = y_rect_inclusion + h_rect_inclusion / 2;
    var dx_carte = x_centre_rect_inclusion - x_centre_rect_zone * carte_scale;
    var dy_carte = y_centre_rect_inclusion - y_centre_rect_zone * carte_scale;
    // application de la translation et de l'echelle a la carte (realisation du zoom sur le territoire)
    setSVGattr(owner_id, prefixe + 'carte1', 'transform', 'translate(' + dx_carte + ',' + dy_carte + ') scale(' + carte_scale + ')');
    /* optionnel mise en surbrillance temporaire de la region
    */
    setSVGattr(owner_id, prefixe + 'path_selec', 'd', zoom_path);
    setSVGattr(owner_id, prefixe + 'path_selec', 'opacity', '1');

    /*
    */
}
function get_elem_liste_string(liste_string, rang, sep) {
    var pos_sep = liste_string.indexOf(sep);
    if (pos_sep == -1) {
        if (rang == 1) {
            return liste_string;
        } else {
            return '';
        }
    } else {
        if (rang == 1) {
            return liste_string.substr(0, pos_sep);
        } else {
            return get_elem_liste_string(liste_string.substr(pos_sep + 1, liste_string.length - pos_sep - 1), rang - 1, sep);
        }
    }
}
function get_zoom_scale(l_rect_zone, h_rect_zone, l_rect_inclusion, h_rect_inclusion) {
    // calcul du taux de zoom pour que le rectangle de la zone rentre pile poil dans le rectangle d'inclusion
    var ratio_rect_inclusion = h_rect_inclusion / l_rect_inclusion;
    var ratio_rect_zone = h_rect_zone / l_rect_zone;
    /*
    if (!(h_rect_zone < h_rect_inclusion) && (l_rect_zone < l_rect_inclusion))
    { return h_rect_inclusion/h_rect_zone;}

    if ((h_rect_zone < h_rect_inclusion) && !(l_rect_zone < l_rect_inclusion))
    { return l_rect_inclusion/l_rect_zone;}
*/
    if (ratio_rect_zone < ratio_rect_inclusion) {
        return l_rect_inclusion / l_rect_zone;
    } else {
        return h_rect_inclusion / h_rect_zone;
    }
}
