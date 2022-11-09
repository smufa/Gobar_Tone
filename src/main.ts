import { WebGL } from "./WebGL"
import { Shaders } from "./Shaders"

function main(): void {
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext("webgl2");
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
  } else {
    const defaultProgram = WebGL.createProgram(gl, [Shaders.defaultVertex(gl), Shaders.defaultFragment(gl)]);
      
  }
}

window.onload = main;
