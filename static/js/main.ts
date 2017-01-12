'use strict';

/**
 * Main
 */
class Main {

    private nav: Header;

    constructor() {
        this.nav = new Header();
    }

    public static bootstrap(): Main {
        return new Main();
    }

}

/**
 * Nav
 */
class Header {

    el: Element;

    constructor() {
        this.el = document.querySelector('.pl-header');

        this.el.classList.add('is-loaded');
    }

}

// Get this party started
document.addEventListener('DOMContentLoaded', Main.bootstrap);
