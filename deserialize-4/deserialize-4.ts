// Deserialize and validate at runtime.

import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

namespace Schema {
    type Type = Simple | Array | CustomType_0 | CustomType_1 | CustomType_2 | CustomType_3 | Dict | Record | Tuple;

    type Decoder<T> = (any) => T;
    type GenericDecoder = Decoder<any>;

    interface Simple<Type> {
        decode: (any) => Type;
    }

    interface Array<Element> extends SimpleType<Array> {
        decode: decodeArray,
        decodeElement: (any) => Element;
    }

    interface CustomType_0 extends SimpleType<object> {
        decode: decodeCustomType_0,
        argDecoders: Array<GenericDecoder>
    }

    interface CustomType_1<T1> extends CustomType_0 {
        decode: decodeCustomType_1,
        decodeVar1: Decoder<T1>;
    }

    interface CustomType_2<T1,T2> extends CustomType_1<T1> {
        decode: decodeCustomType_2,
        decodeVar2: Decoder<T2>;
    }

    interface CustomType_3<T1,T2,T3> extends CustomType_2<T1,T2> {
        decode: decodeCustomType_3,
        decodeVar3: Decoder<T3>;
    }

    interface Dict<Key,Value> extends Simple<Array<[Key,Value]>> {
        decode: decodeDict,
        decodeKey: Decoder<Key>;
        decodeValue: Decoder<Value>;
    }

    interface Record extends Simple<object> {
        decode: decodeRecord,
        fieldDecoders: Map<string, GenericDecoder>;
    }

    interface Tuple extends Simple<Array<any>> {
        decode: decodeTuple,
        elementDecoders: [GenericDecoder];
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

function decodeCustomType_0(argDecoders: DecoderList,
                            input: any): object {
    // FIXME: kind!
}

function decodeCustomType_1<T1>(decode1: (any) => T1,
                                argDecoders: DecoderList,
                                input: any): object {
}

function decodeCustomType_2<T1,T2>(decode1: (any) => T1,
                                   decode2: (any) => T2,
                                   argDecoders: DecoderList,
                                   input: any): object {
}

function decodeCustomType_3<T1,T2,T3>(decode1: (any) => T1,
                                      decode2: (any) => T2,
                                      decode3: (any) => T3,
                                      argDecoders: DecoderList,
                                      input: any): object {

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

// Morphir.IR.Distribution.Distribution
const Morphir_IR_DecoderTree = decodeCustomType_0.bind(
    null,
    [
        // Morphir.IR.Name.Name
        decode: decodeArray.bind(null, decodeString),
        // Morphir....
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
