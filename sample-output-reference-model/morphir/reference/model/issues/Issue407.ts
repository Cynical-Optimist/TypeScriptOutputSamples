// Generated by morphir-elm

import * as codecs from "./../../../../morphir/internal/Codecs";

export namespace Morphir_Reference_Model_Issues_Issue407 {
  export type BigRecord = {
    field1: number;
    field2: number;
    field3: number;
    field4: number;
    field5: number;
    field6: number;
    field7: number;
    field8: number;
    field9: number;
    field10: number;
    field11: number;
    field12: number;
    field13: number;
    field14: number;
    field15: number;
    field16: number;
    field17: number;
    field18: number;
    field19: number;
    field20: number;
    field21: number;
    field22: number;
    field23: number;
  };

  export function decodeBigRecord(input: any): BigRecord {
    return codecs.decodeRecord(
      codecs.buildCodecMap([
        ["field1", codecs.decodeInt],
        ["field2", codecs.decodeInt],
        ["field3", codecs.decodeInt],
        ["field4", codecs.decodeInt],
        ["field5", codecs.decodeInt],
        ["field6", codecs.decodeInt],
        ["field7", codecs.decodeInt],
        ["field8", codecs.decodeInt],
        ["field9", codecs.decodeInt],
        ["field10", codecs.decodeInt],
        ["field11", codecs.decodeInt],
        ["field12", codecs.decodeInt],
        ["field13", codecs.decodeInt],
        ["field14", codecs.decodeInt],
        ["field15", codecs.decodeInt],
        ["field16", codecs.decodeInt],
        ["field17", codecs.decodeInt],
        ["field18", codecs.decodeInt],
        ["field19", codecs.decodeInt],
        ["field20", codecs.decodeInt],
        ["field21", codecs.decodeInt],
        ["field22", codecs.decodeInt],
        ["field23", codecs.decodeInt],
      ]),
      input
    );
  }

  export function encodeBigRecord(value: BigRecord): any {
    return codecs.encodeRecord(
      codecs.buildCodecMap([
        ["field1", codecs.encodeInt],
        ["field2", codecs.encodeInt],
        ["field3", codecs.encodeInt],
        ["field4", codecs.encodeInt],
        ["field5", codecs.encodeInt],
        ["field6", codecs.encodeInt],
        ["field7", codecs.encodeInt],
        ["field8", codecs.encodeInt],
        ["field9", codecs.encodeInt],
        ["field10", codecs.encodeInt],
        ["field11", codecs.encodeInt],
        ["field12", codecs.encodeInt],
        ["field13", codecs.encodeInt],
        ["field14", codecs.encodeInt],
        ["field15", codecs.encodeInt],
        ["field16", codecs.encodeInt],
        ["field17", codecs.encodeInt],
        ["field18", codecs.encodeInt],
        ["field19", codecs.encodeInt],
        ["field20", codecs.encodeInt],
        ["field21", codecs.encodeInt],
        ["field22", codecs.encodeInt],
        ["field23", codecs.encodeInt],
      ]),
      value
    );
  }
}
