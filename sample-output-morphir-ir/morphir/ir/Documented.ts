// Generated by morphir-elm

import * as codecs from "./../../morphir/internal/Codecs"

export namespace Morphir_IR_Documented {
  /* Type that represents a documented value.
  */
  export type Documented<a> = {
    doc: string;
    value: a;
  }
  
  export function decodeDocumented(varDecoders, input) {
  return codecs.decodeRecord(new Map([["doc", codecs.decodeString.bind(null)], ["value", varDecoders.A.bind(null)]]), input);
  }
  
  export function encodeDocumented(varEncoders, value) {
  return codecs.encodeRecord(new Map([["doc", codecs.encodeString.bind(null)], ["value", varEncoders.a.bind(null)]]), value);
  }
  
}

