class AnimationView {
    /**
     * 
     * @param {string} type 
     * @param {string} id 
     */
    constructor(type, id) {
        const parent = document.getElementById("SequencesAnimation");

        const container = document.createElement('section');
        container.className = `container ${type} ${id}`;

        const separator = document.createElement('section');
        separator.className = "separator";
    }
}