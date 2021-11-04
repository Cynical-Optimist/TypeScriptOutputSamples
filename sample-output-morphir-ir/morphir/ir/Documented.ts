// Generated by morphir-elm

import * as codecs from "./../../morphir/internal/Codecs";

export namespace Morphir_IR_Documented {
  /* Type that represents a documented value.
   */
  export type Documented<A> = {
    doc: string;
    value: A;
  };

  export function decodeDocumented<A>(
    decodeA: (input: any) => A,
    input: any
  ): Documented<A> {
    return codecs.decodeRecord(
      codecs.buildCodecMap([
        ["doc", codecs.decodeString],
        ["value", decodeA],
      ]),
      input
    );
  }

  export function encodeDocumented<A>(
    encodeA: (value: A) => any,
    value: Documented<A>
  ): any {
    return codecs.encodeRecord(
      codecs.buildCodecMap([
        ["doc", codecs.encodeString],
        ["value", encodeA],
      ]),
      value
    );
  }
}
