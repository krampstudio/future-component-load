/**
 * Register the <f-load> component.
 * It loads remote content on click.
 *
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */

import { fwc } from 'future.js';

/**
 * @exports {fwc} fLoad - the component model
 */
const fLoad = fwc('f-load')

    //listen on errors
    .on('error', e => {
        throw e;
    })

    .on('click', function(elt) {

        window
            .fetch(elt.src)
            .then(res  => res.text())
            .then(html => elt.target.innerHTML = html)
            .catch(e   => this.trigger('error', e));
    })

    //attributes
    .attrs('src', 'target')

    //define getter/setters
    .access('target', {
        get(val) {
            //elt.target will return a DOM element
            return document.querySelector(val);
        }
    })

    //regsiter the component
    .register();

export default fLoad;
