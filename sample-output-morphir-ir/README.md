The typescript code in this folder was autogenerated by the TypeScript backend.

It was generated in the morphir-elm project from commit 8f544c8 (currently the
head of branch `codethink/typescript-codec-2`).

This code can be generated using the following commands:

```
# compile the morphir-elm cli application
npm run build --if-present

# make the morphir-ir.json file, respresenting the Morphir-IR types
node  ./cli/morphir-elm.js make --types-only 

# generate the typescript versions of those types, 
node  ./cli/morphir-elm.js gen --target=TypeScript --output ./sample-output-morphir-ir

```
