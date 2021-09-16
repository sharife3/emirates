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

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

//--> assign mock directly without jest.fn
window.IntersectionObserver = ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
});

window.alert = jest.fn();


window.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve([]),
})
);