{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      rec {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.vscode-langservers-extracted
            nodePackages.typescript-language-server
            nodePackages.typescript
            nodejs
            node2nix
          ];
          shellHook = ''
            # node ./bin/server.js 1>/dev/null &
            fish
          '';
        };
      }
    );
}
