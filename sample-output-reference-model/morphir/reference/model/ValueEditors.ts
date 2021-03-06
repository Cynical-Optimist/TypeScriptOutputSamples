// Generated by morphir-elm

import * as codecs from "./../../../morphir/internal/Codecs";

export namespace Morphir_Reference_Model_ValueEditors {
  export type LargeEnum =
    | Option1
    | Option10
    | Option11
    | Option12
    | Option13
    | Option14
    | Option15
    | Option16
    | Option17
    | Option18
    | Option19
    | Option2
    | Option20
    | Option3
    | Option4
    | Option5
    | Option6
    | Option7
    | Option8
    | Option9;

  export function decodeLargeEnum(input: any): LargeEnum {
    let kind = codecs.parseKindFromCustomTypeInput(input);
    switch (kind) {
      case "Option1":
        return decodeOption1(input);
      case "Option10":
        return decodeOption10(input);
      case "Option11":
        return decodeOption11(input);
      case "Option12":
        return decodeOption12(input);
      case "Option13":
        return decodeOption13(input);
      case "Option14":
        return decodeOption14(input);
      case "Option15":
        return decodeOption15(input);
      case "Option16":
        return decodeOption16(input);
      case "Option17":
        return decodeOption17(input);
      case "Option18":
        return decodeOption18(input);
      case "Option19":
        return decodeOption19(input);
      case "Option2":
        return decodeOption2(input);
      case "Option20":
        return decodeOption20(input);
      case "Option3":
        return decodeOption3(input);
      case "Option4":
        return decodeOption4(input);
      case "Option5":
        return decodeOption5(input);
      case "Option6":
        return decodeOption6(input);
      case "Option7":
        return decodeOption7(input);
      case "Option8":
        return decodeOption8(input);
      case "Option9":
        return decodeOption9(input);
    }
    codecs.raiseDecodeErrorFromCustomType("LargeEnum", kind);
  }

  export function encodeLargeEnum(value: LargeEnum): any {
    switch (value.kind) {
      case "Option1":
        return encodeOption1(value);
      case "Option10":
        return encodeOption10(value);
      case "Option11":
        return encodeOption11(value);
      case "Option12":
        return encodeOption12(value);
      case "Option13":
        return encodeOption13(value);
      case "Option14":
        return encodeOption14(value);
      case "Option15":
        return encodeOption15(value);
      case "Option16":
        return encodeOption16(value);
      case "Option17":
        return encodeOption17(value);
      case "Option18":
        return encodeOption18(value);
      case "Option19":
        return encodeOption19(value);
      case "Option2":
        return encodeOption2(value);
      case "Option20":
        return encodeOption20(value);
      case "Option3":
        return encodeOption3(value);
      case "Option4":
        return encodeOption4(value);
      case "Option5":
        return encodeOption5(value);
      case "Option6":
        return encodeOption6(value);
      case "Option7":
        return encodeOption7(value);
      case "Option8":
        return encodeOption8(value);
      case "Option9":
        return encodeOption9(value);
    }
  }

  export class Option1 {
    kind: "Option1" = "Option1";

    constructor() {}
  }

  export function decodeOption1(input: any): Option1 {
    codecs.preprocessCustomTypeVariant("Option1", 0, input);
    return new Option1();
  }

  export function encodeOption1(value: Option1): any {
    return value.kind;
  }

  export class Option10 {
    kind: "Option10" = "Option10";

    constructor() {}
  }

  export function decodeOption10(input: any): Option10 {
    codecs.preprocessCustomTypeVariant("Option10", 0, input);
    return new Option10();
  }

  export function encodeOption10(value: Option10): any {
    return value.kind;
  }

  export class Option11 {
    kind: "Option11" = "Option11";

    constructor() {}
  }

  export function decodeOption11(input: any): Option11 {
    codecs.preprocessCustomTypeVariant("Option11", 0, input);
    return new Option11();
  }

  export function encodeOption11(value: Option11): any {
    return value.kind;
  }

  export class Option12 {
    kind: "Option12" = "Option12";

    constructor() {}
  }

  export function decodeOption12(input: any): Option12 {
    codecs.preprocessCustomTypeVariant("Option12", 0, input);
    return new Option12();
  }

  export function encodeOption12(value: Option12): any {
    return value.kind;
  }

  export class Option13 {
    kind: "Option13" = "Option13";

    constructor() {}
  }

  export function decodeOption13(input: any): Option13 {
    codecs.preprocessCustomTypeVariant("Option13", 0, input);
    return new Option13();
  }

  export function encodeOption13(value: Option13): any {
    return value.kind;
  }

  export class Option14 {
    kind: "Option14" = "Option14";

    constructor() {}
  }

  export function decodeOption14(input: any): Option14 {
    codecs.preprocessCustomTypeVariant("Option14", 0, input);
    return new Option14();
  }

  export function encodeOption14(value: Option14): any {
    return value.kind;
  }

  export class Option15 {
    kind: "Option15" = "Option15";

    constructor() {}
  }

  export function decodeOption15(input: any): Option15 {
    codecs.preprocessCustomTypeVariant("Option15", 0, input);
    return new Option15();
  }

  export function encodeOption15(value: Option15): any {
    return value.kind;
  }

  export class Option16 {
    kind: "Option16" = "Option16";

    constructor() {}
  }

  export function decodeOption16(input: any): Option16 {
    codecs.preprocessCustomTypeVariant("Option16", 0, input);
    return new Option16();
  }

  export function encodeOption16(value: Option16): any {
    return value.kind;
  }

  export class Option17 {
    kind: "Option17" = "Option17";

    constructor() {}
  }

  export function decodeOption17(input: any): Option17 {
    codecs.preprocessCustomTypeVariant("Option17", 0, input);
    return new Option17();
  }

  export function encodeOption17(value: Option17): any {
    return value.kind;
  }

  export class Option18 {
    kind: "Option18" = "Option18";

    constructor() {}
  }

  export function decodeOption18(input: any): Option18 {
    codecs.preprocessCustomTypeVariant("Option18", 0, input);
    return new Option18();
  }

  export function encodeOption18(value: Option18): any {
    return value.kind;
  }

  export class Option19 {
    kind: "Option19" = "Option19";

    constructor() {}
  }

  export function decodeOption19(input: any): Option19 {
    codecs.preprocessCustomTypeVariant("Option19", 0, input);
    return new Option19();
  }

  export function encodeOption19(value: Option19): any {
    return value.kind;
  }

  export class Option2 {
    kind: "Option2" = "Option2";

    constructor() {}
  }

  export function decodeOption2(input: any): Option2 {
    codecs.preprocessCustomTypeVariant("Option2", 0, input);
    return new Option2();
  }

  export function encodeOption2(value: Option2): any {
    return value.kind;
  }

  export class Option20 {
    kind: "Option20" = "Option20";

    constructor() {}
  }

  export function decodeOption20(input: any): Option20 {
    codecs.preprocessCustomTypeVariant("Option20", 0, input);
    return new Option20();
  }

  export function encodeOption20(value: Option20): any {
    return value.kind;
  }

  export class Option3 {
    kind: "Option3" = "Option3";

    constructor() {}
  }

  export function decodeOption3(input: any): Option3 {
    codecs.preprocessCustomTypeVariant("Option3", 0, input);
    return new Option3();
  }

  export function encodeOption3(value: Option3): any {
    return value.kind;
  }

  export class Option4 {
    kind: "Option4" = "Option4";

    constructor() {}
  }

  export function decodeOption4(input: any): Option4 {
    codecs.preprocessCustomTypeVariant("Option4", 0, input);
    return new Option4();
  }

  export function encodeOption4(value: Option4): any {
    return value.kind;
  }

  export class Option5 {
    kind: "Option5" = "Option5";

    constructor() {}
  }

  export function decodeOption5(input: any): Option5 {
    codecs.preprocessCustomTypeVariant("Option5", 0, input);
    return new Option5();
  }

  export function encodeOption5(value: Option5): any {
    return value.kind;
  }

  export class Option6 {
    kind: "Option6" = "Option6";

    constructor() {}
  }

  export function decodeOption6(input: any): Option6 {
    codecs.preprocessCustomTypeVariant("Option6", 0, input);
    return new Option6();
  }

  export function encodeOption6(value: Option6): any {
    return value.kind;
  }

  export class Option7 {
    kind: "Option7" = "Option7";

    constructor() {}
  }

  export function decodeOption7(input: any): Option7 {
    codecs.preprocessCustomTypeVariant("Option7", 0, input);
    return new Option7();
  }

  export function encodeOption7(value: Option7): any {
    return value.kind;
  }

  export class Option8 {
    kind: "Option8" = "Option8";

    constructor() {}
  }

  export function decodeOption8(input: any): Option8 {
    codecs.preprocessCustomTypeVariant("Option8", 0, input);
    return new Option8();
  }

  export function encodeOption8(value: Option8): any {
    return value.kind;
  }

  export class Option9 {
    kind: "Option9" = "Option9";

    constructor() {}
  }

  export function decodeOption9(input: any): Option9 {
    codecs.preprocessCustomTypeVariant("Option9", 0, input);
    return new Option9();
  }

  export function encodeOption9(value: Option9): any {
    return value.kind;
  }

  export type Price = number;

  export function decodePrice(input: any): Price {
    return codecs.decodeFloat(input);
  }

  export function encodePrice(value: Price): any {
    return codecs.encodeFloat(value);
  }

  export type SmallEnum = OptionOne | OptionThree | OptionTwo;

  export function decodeSmallEnum(input: any): SmallEnum {
    let kind = codecs.parseKindFromCustomTypeInput(input);
    switch (kind) {
      case "OptionOne":
        return decodeOptionOne(input);
      case "OptionThree":
        return decodeOptionThree(input);
      case "OptionTwo":
        return decodeOptionTwo(input);
    }
    codecs.raiseDecodeErrorFromCustomType("SmallEnum", kind);
  }

  export function encodeSmallEnum(value: SmallEnum): any {
    switch (value.kind) {
      case "OptionOne":
        return encodeOptionOne(value);
      case "OptionThree":
        return encodeOptionThree(value);
      case "OptionTwo":
        return encodeOptionTwo(value);
    }
  }

  export class OptionOne {
    kind: "OptionOne" = "OptionOne";

    constructor() {}
  }

  export function decodeOptionOne(input: any): OptionOne {
    codecs.preprocessCustomTypeVariant("OptionOne", 0, input);
    return new OptionOne();
  }

  export function encodeOptionOne(value: OptionOne): any {
    return value.kind;
  }

  export class OptionThree {
    kind: "OptionThree" = "OptionThree";

    constructor() {}
  }

  export function decodeOptionThree(input: any): OptionThree {
    codecs.preprocessCustomTypeVariant("OptionThree", 0, input);
    return new OptionThree();
  }

  export function encodeOptionThree(value: OptionThree): any {
    return value.kind;
  }

  export class OptionTwo {
    kind: "OptionTwo" = "OptionTwo";

    constructor() {}
  }

  export function decodeOptionTwo(input: any): OptionTwo {
    codecs.preprocessCustomTypeVariant("OptionTwo", 0, input);
    return new OptionTwo();
  }

  export function encodeOptionTwo(value: OptionTwo): any {
    return value.kind;
  }
}
