// Generated by morphir-elm

import * as codecs from "./../../morphir/internal/Codecs"

export namespace Morphir_IR_AccessControlled {
  /* Public or private access.
  */
  export type Access = Private | Public
  
  export function decodeAccess(varDecoders, input) {
  let decoderMap = new Map();
  decoderMap.set("Private", decodePrivate.bind(varDecoders));
  decoderMap.set("Public", decodePublic.bind(varDecoders));
  codecs.decodeCustomType(decoderMap, input);
  }
  
  
  
  export interface Private {
    kind: "Private";
  }
  
  export function decodePrivate(varDecoders, input) {
  return codecs.decodeCustomTypeVariant("Private", [], [], input);
  }
  
  export interface Public {
    kind: "Public";
  }
  
  export function decodePublic(varDecoders, input) {
  return codecs.decodeCustomTypeVariant("Public", [], [], input);
  }
  
  /* Type that represents different access levels.
  */
  export type AccessControlled<a> = {
    access: Morphir_IR_AccessControlled.Access;
    value: a;
  }
  
  export function decodeAccessControlled(varDecoders, input) {
  return codecs.decodeRecord(new Map([["access", Morphir_IR_AccessControlled.decodeAccess.bind(null, varDecoders)], ["value", varDecoders.A.bind(null)]]), input);
  }
  
  export function encodeAccessControlled(varEncoders, value) {
  return codecs.encodeRecord(new Map([["access", codecs.encodeUnit.bind(null)], ["value", varEncoders.a.bind(null)]]), value);
  }
  
}

