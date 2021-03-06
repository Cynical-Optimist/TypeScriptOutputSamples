// Generated by morphir-elm

import * as codecs from "./../../../../morphir/internal/Codecs";

export namespace Morphir_Reference_Model_Issues_Issue331 {
  export class MyType {
    kind: "MyType" = "MyType";

    constructor(public arg1: string, public arg2: string) {}
  }

  export function decodeMyType(input: any): MyType {
    codecs.preprocessCustomTypeVariant("MyType", 2, input);
    return new MyType(
      codecs.decodeString(input[1]),
      codecs.decodeString(input[2])
    );
  }

  export function encodeMyType(value: MyType): any {
    return [
      value.kind,
      codecs.encodeString(value.arg1),
      codecs.encodeString(value.arg2),
    ];
  }
}
