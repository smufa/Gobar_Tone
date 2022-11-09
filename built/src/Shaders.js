"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shaders = void 0;
var Shaders = /** @class */ (function () {
    function Shaders() {
    }
    Shaders.errorChecking = function (gl, shader) {
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(shader);
            throw "Could not compile WebGL program. \n\n".concat(info);
        }
    };
    Shaders.defaultVertex = function (gl) {
        var shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, "\n       #version 430\n       layout (location = 0) in vec4 aPosition;\n       layout (location = 1) in vec2 aTexCoord;\n\n       uniform mat4 uViewModel;\n       uniform mat4 uProjection;\n         \n       out vec2 vTexCoord;\n       void main() {\n         vTexCoord = aTexCoord;\n         gl_Position = uProjection * uViewModel * aPosition;\n       }\n    ");
        gl.compileShader(shader);
        this.errorChecking(gl, shader);
        return shader;
    };
    Shaders.defaultFragment = function (gl) {
        var shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, "\n      #version 430\n      uniform mediump sampler2D uTexture;\n      in vec2 vTexCoord;\n      out vec4 oColor;\n      void main() {\n        oColor = texture(uTexture, vTexCoord);\n      }\n    ");
        gl.compileShader(shader);
        this.errorChecking(gl, shader);
        return shader;
    };
    return Shaders;
}());
exports.Shaders = Shaders;
