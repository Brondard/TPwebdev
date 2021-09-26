const getBaseURL = () => {
    return new URL('.',
        import.meta.url);
};

class MyLogo extends HTMLElement {
    style = `
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto:wght@100&display=swap');

    .focus-in-expand {
        -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

 
    .scale-up-center{-webkit-animation:scale-up-center .4s cubic-bezier(.39,.575,.565,1.000) both;animation:scale-up-center .4s cubic-bezier(.39,.575,.565,1.000) both}
    .scale-down-center{-webkit-animation:scale-down-center .4s cubic-bezier(.25,.46,.45,.94) both;animation:scale-down-center .4s cubic-bezier(.25,.46,.45,.94) both}

@-webkit-keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);

  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);

  }
}
@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
   
  }
}


@-webkit-keyframes scale-down-center{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(.5);transform:scale(.5)}}@keyframes scale-down-center{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(.5);transform:scale(.5)}}


@-webkit-keyframes scale-up-center{0%{-webkit-transform:scale(.5);transform:scale(.5)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes scale-up-center{0%{-webkit-transform:scale(.5);transform:scale(.5)}100%{-webkit-transform:scale(1);transform:scale(1)}}
    `;

    html = `
    <div style=:"width:100%">
    <br/>
        <div id="menu" style="width:45%; float:left; border:solid; background-color: lightgrey;">
        <label for="selecteurCouleur">Couleur : </label>
        <input type="color" id="selecteurCouleur">
        <br>
        <label for="selecteurTaille">Taille : </label>
        <input type="range" val=40 min=5 max=100 id="selecteurTaille">
        <br>
        <label for="anim_choice">Choisissez une animation : </label>
        <select name="animations_choice" id="anim_choice">
            <option value="">--Choisissez une animation--</option>
            <option value="anim_1">Focus in expand</option>
            <option value="anim_2">Scale up</option>
            <option value="anim_3">Scale Down</option>
        </select>
        <br>
        <label for="textChange">Ecrivez votre texte : </label>
        <input id="textChange" type="text">
        <br>
        <label for="font_choice">Choisissez une police : </label>
        <select name="font_choice" id="font_choice">
            <option value="">--Choisissez une police--</option>
            <option value="font1">roboto</option>
            <option value="font2">Georgia</option>
        </select>
        <br>
        <label for="img_choice">Choisissez une image : </label>
        <select name="img_choice" id="img_choice">
            <option value="">--Choisissez une image--</option>
            <option value="img1">voiture</option>
            <option value="img2">moto</option>
        </select>
        <br>
        <label for="selecteurOpac">Opacité : </label>
        <input type="range" val=40 min=0 max=100 id="selecteurOpac">
        </div>
        <div style="border:solid;margin-left:50%" id="logo" class="focus-in-expand"></div>
        </div>
    `;

    constructor() {
        super();
        // On crée le "shadow DOM"
        this.attachShadow({ mode: "open" });

        // récupérer les propriétés/attributs HTML
        this.couleur = this.getAttribute("couleur");
        this.text = this.getAttribute("text");
        this.animationClass = this.getAttribute("animation");
        this.controls = this.getAttribute("controls");
        this.size = this.getAttribute("size");
    }

    connectedCallback() {
        // ici on instancie l'interface graphique etc.
        this.shadowRoot.innerHTML = `<style>${this.style} color=${this.couleur} font-size=${this.size}  </style>` + this.html;

        this.logo = this.shadowRoot.querySelector("#logo");
        this.logo.innerHTML = `${this.text}`;
        this.logo.style.color = `${this.couleur}`;
        this.logo.style.fontSize = `${this.size}`;
        this.declareEcouteurs();
        this.fixRelativeURLs();
    }

    fixRelativeURLs() {
        let images = this.shadowRoot.querySelectorAll('img');
        images.forEach((e) => {
            console.log("dans le foreach")
            let imagePath = e.getAttribute('src');
            e.src = getBaseURL() + '/' + imagePath;
        });

        //console.log(getBaseURL() +  "images/flammes.jpg")
        this.logo.style.background = "url(" + getBaseURL() + "./images/flammes.jpeg)";
    }

    declareEcouteurs() {
        this.shadowRoot
            .querySelector("#selecteurCouleur")
            .addEventListener("input", (event) => {
                this.changeCouleur(event.target.value);
            });

        this.shadowRoot
            .querySelector("#img_choice")
            .addEventListener("input", (event) => {
                this.changeImg(event.target.value);
            });

        this.shadowRoot
            .querySelector("#selecteurOpac")
            .addEventListener("input", (event) => {
                this.changeOpac(event.target.value);
            });

        this.shadowRoot
            .querySelector("#selecteurTaille")
            .addEventListener("input", (event) => {
                this.changeSize(event.target.value);
            });

        this.shadowRoot
            .querySelector("select")
            .addEventListener("change", (event) => {
                this.changeAnimation(event.target.value);
            });

        this.shadowRoot
            .querySelector("#textChange")
            .addEventListener("change", (event) => {
                this.changeTexte(event.target.value);
            });

        this.shadowRoot
            .querySelector("#font_choice")
            .addEventListener("input", (event) => {
                this.changeFont(event.target.value);
            });
    }

    // Fonction

    changeImg(val) {
        if (val == "img1") {
            console.log("img1");
            this.logo.style.background = "url(" + getBaseURL() + "./images/voiture.png)";
        }
        if (val == "img2") {
            console.log("img2");
            this.logo.style.background = "url(" + getBaseURL() + "./images/moto.jpg)";
        }
    }

    changeOpac(val) {
        console.log(val / 100)
        this.logo.style.opacity = val / 100;
    }

    changeFont(val) {
        if (val == "font1") {
            console.log("font1");
            this.logo.style.fontFamily = "'Roboto', sans-serif"
        }
        if (val == "font2") {
            console.log("font2");
            this.logo.style.fontFamily = "Georgia, serif;"
        }
        if (val == "font3") {
            console.log("font3");
            this.logo.style.fontFamily = "'Oswald', sans-serif;"
        }
    }

    changeTexte(val) {
        this.logo.innerHTML = val;
    }

    changeCouleur(val) {
        this.logo.style.color = val;
    }

    changeSize(val) {
        this.logo.style.fontSize = val + "px";
    }

    changeAnimation(val) {
        if (val == "anim_1") {
            console.log("anim_1");
            this.setAttribute("animation", "focus-in-expand")
            this.shadowRoot
                .querySelector("#logo").className = "focus-in-expand";

        }
        if (val == "anim_2") {
            console.log("anim_2");
            this.setAttribute("animation", "scale-up-center")
            this.shadowRoot
                .querySelector("#logo").className = "scale-up-center";

        }
        if (val == "anim_3") {
            console.log("anim_3");
            this.setAttribute("animation", "scale-down-center")
            this.shadowRoot
                .querySelector("#logo").className = "scale-down-center";

        }
    }
}

customElements.define("my-logo", MyLogo);