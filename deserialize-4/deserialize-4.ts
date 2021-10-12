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

const decoders = {
    "Morphir.IR.Name.Name": decodeArray.bind(null, decodeString),
    "Morphir.IR.Path.Path": decodeArray.bind(null, decode_Morphir_IR_Name_Name),
}

function decodeMorphir_IR_Path_Path(varDecoders: Array<any>,
                                    input: any): {
    return decodeMorphir_IR_Name_Name(input);
}

const decode_Morphir_IR_Module_ModuleName = decode_Morphir_IR_Path_Path;
const decode_Morphir_IR_Package_PackageName = decode_Morphir_IR_Path_Path;

function decode_Morphir_IR_Module_Specification(varDecoders: Array<any>,
                                                input: any): object {
    return decodeRecord(
        { 'types':
            decodeDict.bind(null, varDecoders,
                decode_Morphir_IR_Name_Name,
                decode_Morphir_IR_Documented_Documented.bind(null, varDecoders,
                    decode_Morphir_IR_Type_Specification.bind(null, varDecoders),
                ),
            ),
          'values':
            decodeDict.bind(null, varDecoders,
                decode_Morphir_IR_Name_Name,
                decode_Morphir_IR_Value_Specification.bind(null, varDecoders),
            )
        },
        input
    );
}

function decode_Morphir_IR_Package_Specification(varDecoders,
                                                 input: any): object {
    return decodeRecord(varDecoders,
        { 'modules':
            decodeDict.bind(null, varDecoders,
                decode_Morphir_IR_Module_ModuleName,
                decode_Morphir_IR_Module_Specification.bind(null, { ta: varDecoders['ta'] })
            )
        }
    );
}

function decode_Morphir_IR_Package_Definition(varDecoders,
                                              input: any): object {
    return decodeRecord(null, varDecoders,
        decode_Morphir_IR_Module_ModuleName.bind(null, varDecoders,
        { "modules":
            decodeDict.bind(null, varDecoders,
                decode_Morphir_IR_Module_ModuleName,
                decode_Morphir_IR_AccessControlled_AccessControlled(null,
                    { a: decode_Morphir_IR_Module_Definition.bind(null,
                        { ta: varDecoders['ta'], va: varDecoders['va'] })
                    })
           )
        })
}

function decode_Morphir_IR_Distribution_Distribution(varDecoders, input: any): object {
    return decodeCustomType(null, {},
        {
            kind: "library",
            arg1: decode_Morphir_IR_Package_PackageName.bind(null, {}),
            // Dict<Morphir.IR.Package.PackageName,Morphir.IR.Package.Specification<TypeAttribute>>
            arg2: decodeDict.bind(null, {},
                decode_Morphir_IR_Package_PackageName.bind(null, {}),
                decode_Morphir_IR_Package_Specification.bind(null, { ta: decodeUnit })
            ),
            arg3: decode_Morphir_IR_Package_Definition.bind(null, { ta: decodeUnit, va: decodeUnit })
        }
    );
}

function morphirIrFromJson(data: object): Morphir.IR.Distribution.Distribution {
    const formatVersion = data['formatVersion'];
    if (formatVersion != 1) {
        throw new Error(`Unsupported format version: ${formatVersion}`);
    }

    return decode_Morphir_IR_Distribution_Distribution(data['distribution']);
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
