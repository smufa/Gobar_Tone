"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGL = void 0;
var WebGL = /** @class */ (function () {
    function WebGL() {
    }
    WebGL.createProgram = function (gl, shaders) {
        var program = gl.createProgram();
        for (var _i = 0, shaders_1 = shaders; _i < shaders_1.length; _i++) {
            var shader = shaders_1[_i];
            gl.attachShader(program, shader);
        }
        gl.linkProgram(program);
        var status = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!status) {
            var log = gl.getProgramInfoLog(program);
            throw new Error("Cannot link program:\n".concat(log));
        }
        // const attributes = {};
        // const activeAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        // for (let i = 0; i < activeAttributes; i++) {
        //   const { name } = gl.getActiveAttrib(program, i);
        //   attributes[name] = gl.getAttribLocation(program, name);
        // }
        // function addToObject(object, path, value) {
        //   const partRegex = /\.?(\w+)(\[(\d+)\])?/g;
        //   const matches = [...path.matchAll(partRegex)];
        //   const lastMatch = matches.pop();
        //   let currentObject = uniforms;
        //   for (const [, part, , indexstr] of matches) {
        //     if (indexstr) {
        //       const index = Number(indexstr);
        //       currentObject[part] ??= [];
        //       currentObject = currentObject[part];
        //       currentObject[index] ??= {};
        //       currentObject = currentObject[index];
        //     } else {
        //       currentObject[part] ??= {};
        //       currentObject = currentObject[part];
        //     }
        //   }
        //   const [, part, , indexstr] = lastMatch;
        //   if (indexstr) {
        //     const index = Number(indexstr);
        //     currentObject[part] ??= [];
        //     currentObject = currentObject[part];
        //     currentObject[index] = value;
        //   } else {
        //     currentObject[part] = value;
        //   }
        // }
        // const uniforms = {};
        // const activeUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        // for (let i = 0; i < activeUniforms; i++) {
        //   const { name, size } = gl.getActiveUniform(program, i);
        //   const isArray = name.endsWith('[0]');
        //   if (isArray) {
        //     const arrayName = name.substring(0, name.length - 3);
        //     for (let k = 0; k < size; k++) {
        //       const elementName = `${arrayName}[${k}]`;
        //       addToObject(uniforms, elementName, gl.getUniformLocation(program, elementName));
        //     }
        //   } else {
        //     addToObject(uniforms, name, gl.getUniformLocation(program, name));
        //   }
        // }
        // return { program, attributes, uniforms };
        return program;
    };
    WebGL.createTexture = function (gl, _a) {
        var _b = _a.texture, texture = _b === void 0 ? gl.createTexture() : _b, unit = _a.unit, _c = _a.target, target = _c === void 0 ? gl.TEXTURE_2D : _c, _d = _a.level, level = _d === void 0 ? 0 : _d, _e = _a.iformat, iformat = _e === void 0 ? gl.RGBA : _e, _f = _a.format, format = _f === void 0 ? gl.RGBA : _f, _g = _a.type, type = _g === void 0 ? gl.UNSIGNED_BYTE : _g, image = _a.image, data = _a.data, width = _a.width, height = _a.height, wrapS = _a.wrapS, wrapT = _a.wrapT, min = _a.min, mag = _a.mag, mip = _a.mip;
        if (unit != null) {
            gl.activeTexture(gl.TEXTURE0 + unit);
        }
        gl.bindTexture(target, texture);
        if (image) {
            gl.texImage2D(target, level, iformat, format, type, image);
        }
        else {
            // if both data and image are null, just allocate
            gl.texImage2D(target, level, iformat, width, height, 0, format, type, data);
        }
        if (wrapS) {
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrapS);
        }
        if (wrapT) {
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrapT);
        }
        if (min) {
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, min);
        }
        if (mag) {
            gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, mag);
        }
        if (mip) {
            gl.generateMipmap(target);
        }
        return texture;
    };
    WebGL.createBuffer = function (gl, _a) {
        var _b = _a.buffer, buffer = _b === void 0 ? gl.createBuffer() : _b, _c = _a.target, target = _c === void 0 ? gl.ARRAY_BUFFER : _c, _d = _a.hint, hint = _d === void 0 ? gl.STATIC_DRAW : _d, data = _a.data;
        gl.bindBuffer(target, buffer);
        gl.bufferData(target, data, hint);
        return buffer;
    };
    WebGL.createUnitQuad = function (gl) {
        return WebGL.createBuffer(gl, { data: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]) });
    };
    WebGL.createClipQuad = function (gl) {
        return WebGL.createBuffer(gl, { data: new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]) });
    };
    WebGL.configureAttribute = function (gl, _a) {
        var location = _a.location, count = _a.count, type = _a.type, _b = _a.normalize, normalize = _b === void 0 ? false : _b, _c = _a.stride, stride = _c === void 0 ? 0 : _c, _d = _a.offset, offset = _d === void 0 ? 0 : _d;
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, count, type, normalize, stride, offset);
    };
    WebGL.createSampler = function (gl, _a) {
        var _b = _a.sampler, sampler = _b === void 0 ? gl.createSampler() : _b, wrapS = _a.wrapS, wrapT = _a.wrapT, min = _a.min, mag = _a.mag;
        if (wrapS) {
            gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_S, wrapS);
        }
        if (wrapT) {
            gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_T, wrapT);
        }
        if (min) {
            gl.samplerParameteri(sampler, gl.TEXTURE_MIN_FILTER, min);
        }
        if (mag) {
            gl.samplerParameteri(sampler, gl.TEXTURE_MAG_FILTER, mag);
        }
        return sampler;
    };
    return WebGL;
}());
exports.WebGL = WebGL;
