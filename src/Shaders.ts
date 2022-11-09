export class Shaders {

  static errorChecking(gl: WebGL2RenderingContext, shader: WebGLShader) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      throw `Could not compile WebGL program. \n\n${info}`;
    }
  }
  static defaultVertex(gl: WebGL2RenderingContext): WebGLShader {
    const shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, `
       #version 430
       layout (location = 0) in vec4 aPosition;
       layout (location = 1) in vec2 aTexCoord;

       uniform mat4 uViewModel;
       uniform mat4 uProjection;
         
       out vec2 vTexCoord;
       void main() {
         vTexCoord = aTexCoord;
         gl_Position = uProjection * uViewModel * aPosition;
       }
    `);
    gl.compileShader(shader);
    this.errorChecking(gl, shader);
    return shader;
  }

  static defaultFragment(gl: WebGL2RenderingContext): WebGLShader {
    const shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, `
      #version 430
      uniform mediump sampler2D uTexture;
      in vec2 vTexCoord;
      out vec4 oColor;
      void main() {
        oColor = texture(uTexture, vTexCoord);
      }
    `);
    gl.compileShader(shader);
    this.errorChecking(gl, shader);
    return shader;
  }
}
