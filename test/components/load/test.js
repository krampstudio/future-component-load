import 'webcomponents.js/webcomponents-lite.js' ;
import QUnit from 'qunitjs';
import '../../../components/load/load.js';


QUnit.test('The component is an eventifier', assert => {

    const loadElt = document.querySelector('f-load');
    assert.ok(loadElt instanceof HTMLElement, 'The element is a DOM element');

});

