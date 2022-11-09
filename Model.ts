export class Model {
  texture: WebGLTexture;
  mesh: any;
  program: WebGLProgram;

  constructor(gl: WebGL2RenderingContext, path_to_mesh: string, path_to_texture: string, program: WebGLProgram) {
    this.texture = Model.loadTexture(gl, path_to_texture);
    Model.loadJson(path_to_mesh).then(mesh => this.mesh = mesh);
    this.program = program;
  }

  static async loadJson(uri: string) {
    return fetch(uri).then(response => response.json());
  }

  static loadTexture(gl: WebGL2RenderingContext, path: string): WebGLTexture {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be downloaded over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
      width, height, border, srcFormat, srcType,
      pixel);

    const image = new Image();
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        srcFormat, srcType, image);

      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (Model.isPowerOf2(image.width) && Model.isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = path;

    return texture;
  }

  static isPowerOf2(value: number) {
    return (value & (value - 1)) === 0;
  }
}
