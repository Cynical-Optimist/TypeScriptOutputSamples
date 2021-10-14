// Generated by morphir-elm

import * as codecs from "./../../morphir/internal/Codecs"

export namespace Morphir_IR_AccessControlled {
  /* Public or private access.
  */
  export type Access = Private | Public
  
  
  
  
  
  export interface Private {
    kind: "Private";
  }
  
  export interface Public {
    kind: "Public";
  }
  
  /* Type that represents different access levels.
  */
  export type AccessControlled<a> = {
    access: Morphir_IR_AccessControlled.Access;
    value: a;
  }
  
  export function decodeAccessControlled(varDecoders, input) {
  return codecs.decodeRecord(new Map([["access", codecs.decodeUnit.bind(null)], ["value", varDecoders.a.bind(null)]]), input);
  }
  
  export function encodeAccessControlled(varEncoders, value) {
  return codecs.encodeRecord(new Map([["access", codecs.encodeUnit.bind(null)], ["value", varEncoders.a.bind(null)]]), value);
  }
  
}

