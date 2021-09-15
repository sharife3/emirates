// import "jsdom-global/register";
// import * as Enzyme from "enzyme";
// import * as EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
var Enzyme = require('enzyme');
var EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');
// at the top of file , even  , before importing react
// Setup enzyme"s react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
function doNothing() {
    // nothing
}
function addListenerFun() {
    return {
        matches: false,
        addListener: () => { doNothing(); },
        removeListener: () => { doNothing(); },
        media: ""
    };
}
window.matchMedia = window.matchMedia || addListenerFun;