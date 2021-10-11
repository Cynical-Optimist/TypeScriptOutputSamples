// Deserialize and validate at runtime.

import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

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

const decode Morphir_IR_Name_Name = decodeArray.bind(null, decodeString);
const decode_Morphir_IR_Path_Path = decodeArray.bind(null, decode_Morphir_IR_Name_Name);
const decode_Morphir_IR_Module_ModuleName = decode_Morphir_IR_Path_Path;
const decode_Morphir_IR_Package_PackageName = decode_Morphir_IR_Path_Path;

function decode_Morphir_IR_Module_Specification<TA>(decode_Var_ta: (any) => TA,
                                                    input: any): object {
    return decodeRecord(
        { 'types':
            decodeDict.bind(null,
                decode_Morphir_IR_Name_Name,
                decode_Morphir_IR_Documented_Documented.bind(null,
                    decode_Morphir_IR_Type_Specification.bind(null, decode_Var_ta),
                ),
            ),
          'values':
            decodeDict.bind(null,
                decode_Morphir_IR_Name_Name,
                decode_Morphir_IR_Value_Specification.bind(null, decode_Var_ta),
            )
        },
        input
    );
}

function decode_Morphir_IR_Package_Specification<TA>(decode_Var_ta: (any) => TA,
                                                     input: any): object {
    return decodeRecord(
        { 'modules':
            decodeDict.bind(null,
                decode_Morphir_IR_Module_ModuleName,
                decode_Morphir_IR_Module_Specification.bind(decode_Var_ta)
            )
        }
    );
}

const decode_Morphir_IR_Distribution_Distribution = decodeCustomType_0.bind( null,
    "library",
    [
        decode_Morphir_IR_Package_PackageName,
        // Dict<Morphir.IR.Package.PackageName,Morphir.IR.Package.Specification<TypeAttribute>>
        decodeDict.bind(null,
            decode_Morphir_IR_Package_PackageName,
            decode_Morphir_IR_Package_Specification.bind(null, decodeUnit)
        ),
        decode_Morphir_IR_Package_Definition.bind(null,
            [
                decodeUnit,
                decodeMorphir_IR_Type_Type.bind(null,
                    decodeUnit
                )
            ]
        )
    ]
}

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
