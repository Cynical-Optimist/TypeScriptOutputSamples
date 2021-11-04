// Generated by morphir-elm

import * as codecs from "./../../../morphir/internal/Codecs";

export namespace Morphir_Reference_Model_Types {
  export type Custom = CustomNoArg | CustomOneArg | CustomTwoArg;

  export function decodeCustom(input: any): Custom {
    let kind = codecs.parseKindFromCustomTypeInput(input);
    switch (kind) {
      case "CustomNoArg":
        return decodeCustomNoArg(input);
      case "CustomOneArg":
        return decodeCustomOneArg(input);
      case "CustomTwoArg":
        return decodeCustomTwoArg(input);
    }
    codecs.raiseDecodeErrorFromCustomType("Custom", kind);
  }

  export function encodeCustom(value: Custom): any {
    switch (value.kind) {
      case "CustomNoArg":
        return encodeCustomNoArg(value);
      case "CustomOneArg":
        return encodeCustomOneArg(value);
      case "CustomTwoArg":
        return encodeCustomTwoArg(value);
    }
  }

  export class CustomNoArg {
    kind: "CustomNoArg" = "CustomNoArg";

    constructor() {}
  }

  export function decodeCustomNoArg(input: any): CustomNoArg {
    codecs.preprocessCustomTypeVariant("CustomNoArg", 0, input);
    return new CustomNoArg();
  }

  export function encodeCustomNoArg(value: CustomNoArg): any {
    return value.kind;
  }

  export class CustomOneArg {
    kind: "CustomOneArg" = "CustomOneArg";

    constructor(public arg1: boolean) {}
  }

  export function decodeCustomOneArg(input: any): CustomOneArg {
    codecs.preprocessCustomTypeVariant("CustomOneArg", 1, input);
    return new CustomOneArg(codecs.decodeBoolean(input[1]));
  }

  export function encodeCustomOneArg(value: CustomOneArg): any {
    return [value.kind, codecs.encodeBoolean(value.arg1)];
  }

  export class CustomTwoArg {
    kind: "CustomTwoArg" = "CustomTwoArg";

    constructor(
      public arg1: string,
      public arg2: Morphir_Reference_Model_Types.Quantity
    ) {}
  }

  export function decodeCustomTwoArg(input: any): CustomTwoArg {
    codecs.preprocessCustomTypeVariant("CustomTwoArg", 2, input);
    return new CustomTwoArg(
      codecs.decodeString(input[1]),
      Morphir_Reference_Model_Types.decodeQuantity(input[2])
    );
  }

  export function encodeCustomTwoArg(value: CustomTwoArg): any {
    return [
      value.kind,
      codecs.encodeString(value.arg1),
      Morphir_Reference_Model_Types.encodeQuantity(value.arg2),
    ];
  }

  export class Email {
    kind: "Email" = "Email";

    constructor(public arg1: string) {}
  }

  export function decodeEmail(input: any): Email {
    codecs.preprocessCustomTypeVariant("Email", 1, input);
    return new Email(codecs.decodeString(input[1]));
  }

  export function encodeEmail(value: Email): any {
    return [value.kind, codecs.encodeString(value.arg1)];
  }

  export class FirstName {
    kind: "FirstName" = "FirstName";

    constructor(public arg1: string) {}
  }

  export function decodeFirstName(input: any): FirstName {
    codecs.preprocessCustomTypeVariant("FirstName", 1, input);
    return new FirstName(codecs.decodeString(input[1]));
  }

  export function encodeFirstName(value: FirstName): any {
    return [value.kind, codecs.encodeString(value.arg1)];
  }

  export type FooBarBazRecord = {
    foo: string;
    bar: boolean;
    baz: number;
  };

  export function decodeFooBarBazRecord(input: any): FooBarBazRecord {
    return codecs.decodeRecord(
      codecs.buildCodecMap([
        ["foo", codecs.decodeString],
        ["bar", codecs.decodeBoolean],
        ["baz", codecs.decodeInt],
      ]),
      input
    );
  }

  export function encodeFooBarBazRecord(value: FooBarBazRecord): any {
    return codecs.encodeRecord(
      codecs.buildCodecMap([
        ["foo", codecs.encodeString],
        ["bar", codecs.encodeBoolean],
        ["baz", codecs.encodeInt],
      ]),
      value
    );
  }

  export class FullName {
    kind: "FullName" = "FullName";

    constructor(
      public arg1: Morphir_Reference_Model_Types.FirstName,
      public arg2: Morphir_Reference_Model_Types.LastName
    ) {}
  }

  export function decodeFullName(input: any): FullName {
    codecs.preprocessCustomTypeVariant("FullName", 2, input);
    return new FullName(
      Morphir_Reference_Model_Types.decodeFirstName(input[1]),
      Morphir_Reference_Model_Types.decodeLastName(input[2])
    );
  }

  export function encodeFullName(value: FullName): any {
    return [
      value.kind,
      Morphir_Reference_Model_Types.encodeFirstName(value.arg1),
      Morphir_Reference_Model_Types.encodeLastName(value.arg2),
    ];
  }

  export class LastName {
    kind: "LastName" = "LastName";

    constructor(public arg1: string) {}
  }

  export function decodeLastName(input: any): LastName {
    codecs.preprocessCustomTypeVariant("LastName", 1, input);
    return new LastName(codecs.decodeString(input[1]));
  }

  export function encodeLastName(value: LastName): any {
    return [value.kind, codecs.encodeString(value.arg1)];
  }

  /* Alias referring to another type using a reference.
   */
  export type Quantity = number;

  export function decodeQuantity(input: any): Quantity {
    return codecs.decodeInt(input);
  }

  export function encodeQuantity(value: Quantity): any {
    return codecs.encodeInt(value);
  }
}
