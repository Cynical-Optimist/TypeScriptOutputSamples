// Deserialize and validate at runtime, using a type tree generated by Morphir-Elm.

import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

// Data format which Morphir-Elm will use .
namespace Schema {
    type Spec = Simple | Array | CustomType_0 | CustomType_1 | CustomType_2 | CustomType_3 | Dict | Record | Tuple | Unit;

    type Simple = String | Number;

    interface String {
        kind: "string",
        decoder: decodeString,
    }

    interface Number {
        kind: "number",
        decoder: decodeNumber,
    }

    interface Array<Element> {
        kind: "array",
        decoder: decodeArray,
        elementSpec: Spec,
    }

    interface CustomType extends {
        kind: "custom_type",
        decoder: decodeCustomType,
        argSpecs: Array<Spec>,
    }

    interface Dict<Key,Value> {
        kind: "dict",
        decoder: decodeDict,
        keySpec: Spec,
        valueSpec: Spec,
    }

    interface Record {
        kind: "record",
        decoder: decodeRecord,
        fieldSpecs: Map<string, Spec>,
    }

    interface Tuple {
        kind: "tuple",
        decode: decodeTuple,
        elementSpecs: [Spec],
    }

    interface Unit {
        kind: "unit",
        decode: decodeUnit,
    }
}

class DecodeError extends Error {}

Object.defineProperty(DecodeError.prototype, 'name', {
    value: 'DecodeError',
});


function decodeUnit(input: any): [] {
    return [];
}

function decodeBoolean(input: any): boolean {
    if (typeof(input) != "boolean") {
        throw new DecodeError(`Expected bool, got ${typeof(input)}`);
    }
    return input;
}

function decodeChar(input: any): string {
    if (typeof(input) != "string") {
        throw new DecodeError(`Expected char, got ${typeof(input)}`);
    }
    if (input.length != 1) {
        throw new DecodeError(`Expected char, got string`);
    }
    return input;
}

function decodeString(input: any): string {
    if (typeof(input) != "string") {
        throw new DecodeError(`Expected string, got ${typeof(input)}`);
    }
    return input;
}

function decodeInt(input: any): number {
    if (typeof(input) != "number") {
        throw new DecodeError(`Expected int, got ${typeof(input)}`);
    }
    return input;
}

function decodeFloat(input: any): number {
    if (typeof(input) != "number") {
        throw new DecodeError(`Expected float, got ${typeof(input)}`);
    }
    return input;
}

function decodeArray<T>(decodeElement: (any) => T,
                        input: any): Array<T> {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected Array, got ${typeof(input)}`);
    }

    const inputArray: Array = input;
    return inputArray.map(decodeElement);
}

type DecoderList = Array<(any) => any>;

function decodeCustomType(kind: string,
                          argDecoders: DecoderList,
                          input: any): object {
    if (input[0].kind != kind) {
        throw new DecodeError(`Expected kind ${kind}, got ${input[0].kind}`);
    }

    const argCount = input.length - 1;
    if (argCount != argDecoders.length) {
        throw new DecodeError(`Expected ${argDecoders.length} args for custom type "${kind}", got ${argCount}`);
    }

    result = {
        kind: kind
    }
    for (i = 0. i < argDecoders.length; i++) {
        paramName = `arg${i + 1}`;
        result[paramName] = argDecoders[i](input[i + 1]);
    }
}

// FIXME: dict are represented as arrays right now
function decodeDict<K,V>(decodeKey: (any) => K, decodeValue: (any) => V, input: any): Array<[K,V]> {
    if f (!(isinstance(input) != "array")) {
        throw new DecodeError(`Expected array, got ${typeof(input)}`);
    }
    const inputArray: Array<any> = input;
    return inputArray.map((item: any) => {
        const itemArray = expectArray(item);
        return [decodeKey(itemArray[0]), decodeValue(itemArray[1])];
    });
}

type DecoderMap = Map<string, (any) => any>;

function decodeRecord(fieldDecoders: DecoderMap, input: any): object {
    if (!(input instanceof Object)) {
        throw new DecodeError(`Expected Object, got ${typeof(input)}`);
    }

    const fieldNames = fieldDecoders.keys();
    for (var field in fieldNames) {
        if (!(field in Object.keys(input))) {
            throw new DecodeError(`Expected field ${field} was not found`);
        }
    }
    if (Object.keys(input).length > fieldNames.length) {
        throw new DecodeError(`Input object has extra fields, expected ${fieldNames.length}, got ${input.keys().length}`);
    }

    const inputObject: object = input;
    var result = Object.new();
    fieldDecoders.forEach((name: string, decoder: (any) => any) => {
        result[name] = decoder(inputObject[name]);
    });

    return result;
}

function decodeTuple(elementDecoders: DecoderList, input: any): Array<any> {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected Array, got ${typeof(input)}`);
    }

    const inputArray: Array = input;
    let result = [];
    for (i = 0; i < inputArray.length; i++) {
        result.push(elementDecoders[i](inputArray[i]));
    }
    return result;
}

const spec_Morphir_IR_Name_Name = {
    kind: "array",
    decoder: decodeArray,
    elementSpec: Schema.String,
}

const spec_Morphir_IR_Path_Path = {
    kind: "array",
    decoder: decodeArray,
    elementSpec: spec_Morphir_IR_Name_Name,
}

const spec_Morphir_IR_Package_PackageName = {
    kind: "array",
    decoder: decodeArray,
    elementSpec: spec_Morphir_IR_Path_Path,
};

function makeSpec_Morphir_IR_Package_Specification(spec_var_ta) {
    return {
        kind: 'record',
        fieldSpecs: {
            'modules': {
                kind: 'dict',
                keySpec: spec_Morphir_IR_Module_ModuleName,
                valueSpec: makeSpec_Morphir_IR_Module_Specification(spec_var_ta)
            }
        }
    }
}

const spec_Morphir_IR_Distribution_Distribution = {
    kind: "record",
    decoder: decodeRecord,
    argSpecs: [
        spec_Morphir_IR_Package_PackageName,
        // Dict<Morphir.IR.Package.PackageName,Morphir.IR.Package.Specification<TypeAttribute>>
        {
            kind: "dict",
            keySpec: spec_Morphir_IR_Package_PackageName,
            valueSpec: makeSpec_Morphir_IR_Package_Specification({ kind: "unit", decoder: decodeUnit })
        }
        makeSpec_Morphir_IR_Package_Definition(
            { kind: "unit", decoder: decodeUnit },
            makeSpec_Morphir_IR_Type_Type(
                { kind: "unit", decoder: decodeUnit }
            )
        )
    ]

function morphirIrFromJson(data: object): Morphir.IR.Distribution.Distribution {
    const formatVersion = data['formatVersion'];
    if (formatVersion != 1) {
        throw new Error(`Unsupported format version: ${formatVersion}`);
    }

    return expectDistribution(data['distribution']);
}

fs.readFile(INPUT, 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading ${INPUT}: ${err}`);
    } else {
        const distribution = morphirIrFromJson(JSON.parse(data));

        // JSON the output
        const space = 4;
        const text = JSON.stringify(distribution, null, space);
        console.log(text);

        const reloaded = JSON.parse(text);
        // FIXME: assert distribution == reloaded ?!
    }
});