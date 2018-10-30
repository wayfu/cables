// inputs
const parentPort = op.inObject('Link');
const labelPort = op.inValueString('Text', 'Number');
const inputValuePort = op.inValue('Input', 0);
const setDefaultValueButtonPort = op.inTriggerButton('Set Default');
const defaultValuePort = op.inValue('Default', 0);
defaultValuePort.setUiAttribs({ hidePort: true, greyout: true });

// outputs
const siblingsPort = op.outObject('Children');
const valuePort = op.outValue('Result', defaultValuePort.get());

// vars
var el = document.createElement('div');
el.classList.add('sidebar__item');
el.classList.add('sidebar__text-input');
var label = document.createElement('div');
label.classList.add('sidebar__item-label');
var labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);
//var inputWrapper = document.createElement('div');
//inputWrapper.classList.add('sidebar__text-input-input-wrapper');
//el.appendChild(inputWrapper);
var input = document.createElement('input');
input.classList.add('sidebar__text-input-input');
input.setAttribute('type', 'text');
input.setAttribute('value', defaultValuePort.get());
//inputWrapper.appendChild(input);
el.appendChild(input);
input.addEventListener('input', onInput);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
defaultValuePort.onChange = onDefaultValueChanged;
op.onDelete = onDelete;
inputValuePort.onChange = onInputValuePortChanged;
setDefaultValueButtonPort.onTriggered = setDefaultValue;

// functions

function setDefaultValue() {
    defaultValuePort.set(parseFloat(inputValuePort.get()));
    if(CABLES.UI){
        gui.patch().showOpParams(op); /* update DOM */
    }
}

function onInputValuePortChanged() {
    let val = parseFloat(inputValuePort.get());
    if(isNaN(val)) { val = 0; }
    input.value = val;
    valuePort.set(val);
}

function onInput(ev) {
    let newVal = parseFloat(ev.target.value);
    if(isNaN(newVal)) { newVal = 0; }
    valuePort.set(newVal);
    inputValuePort.set(newVal);
    if(CABLES.UI){
        gui.patch().showOpParams(op); /* update DOM */
    }
}

function onDefaultValueChanged() {
    /*
    var defaultValue = defaultValuePort.get();
    valuePort.set(defaultValue);
    input.value = defaultValue;
    */
}

function onLabelTextChanged() {
    var labelText = labelPort.get();
    label.textContent = labelText;
    if(CABLES.UI) {
        op.setTitle('Number Input: ' + labelText);    
    }
}

function onParentChanged() {
    var parent = parentPort.get();
    if(parent && parent.parentElement) {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    } else { // detach
        if(el.parentElement) {
            el.parentElement.removeChild(el);    
        }
    }
}

function showElement(el) {
    if(el) {
        el.style.display = 'block';
    }
}

function hideElement(el) {
    if(el) {
        el.style.display = 'none';
    }
}

function onDelete() {
    removeElementFromDOM(el);
}

function removeElementFromDOM(el) {
    if(el && el.parentNode && el.parentNode.removeChild) {
        el.parentNode.removeChild(el);    
    }
}
