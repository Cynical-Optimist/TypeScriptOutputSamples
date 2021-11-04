// Generated by morphir-elm

import * as codecs from "./../../morphir/internal/Codecs";
import { Morphir_IR_Name } from "./../../morphir/ir/Name";

export namespace Morphir_IR_Path {
  /* Type that represents a path as a list of names.
   */
  export type Path = Array<Morphir_IR_Name.Name>;

  export function decodePath(input: any): Path {
    return codecs.decodeList(Morphir_IR_Name.decodeName, input);
  }

  export function encodePath(value: Path): any {
    return codecs.encodeList(Morphir_IR_Name.encodeName, value);
  }
}
