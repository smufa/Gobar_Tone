"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebGL_1 = require("./WebGL");
var Shaders_1 = require("./Shaders");
function main() {
    var canvas = document.querySelector('canvas');
    var gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    }
    else {
        var defaultProgram = WebGL_1.WebGL.createProgram(gl, [Shaders_1.Shaders.defaultVertex(gl), Shaders_1.Shaders.defaultFragment(gl)]);
    }
}
window.onload = main;
