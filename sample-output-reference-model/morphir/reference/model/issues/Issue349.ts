// Generated by morphir-elm

import * as codecs from "./../../../../morphir/internal/Codecs";

export namespace Morphir_Reference_Model_Issues_Issue349 {
  export type Result<A> = {
    foo: Array<A>;
  };

  export function decodeResult<A>(
    decodeA: (input: any) => A,
    input: any
  ): Result<A> {
    return codecs.decodeRecord(
      codecs.buildCodecMap([["foo", codecs.decodeList.bind(null, decodeA)]]),
      input
    );
  }

  export function encodeResult<A>(
    encodeA: (value: A) => any,
    value: Result<A>
  ): any {
    return codecs.encodeRecord(
      codecs.buildCodecMap([["foo", codecs.encodeList.bind(null, encodeA)]]),
      value
    );
  }
}
