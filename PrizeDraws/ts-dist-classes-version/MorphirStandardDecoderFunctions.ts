export class DecodeError extends Error { }

Object.defineProperty(DecodeError.prototype, 'name', {
    value: 'DecodeError',
});

export function classFromJSON(klass, input) {
    if (klass.fromJSON == undefined) return input;
    return klass.fromJSON(input);
}

export function decodeLiteralString<stringLiteral>(literal: stringLiteral, input: any): stringLiteral {
    // use ".bind" to create a partial function with (input) as the argument
    // eg decodeLiteralString.bind("Car")
    if (input != literal || typeof (input) != "string") {
        throw new DecodeError(`Expected "${literal}", got "${input}"`)
    }
    return literal
}

export function decodeBoolean(input: any): boolean {
    if (typeof (input) != "boolean") {
        throw new DecodeError(`Expected bool, got ${typeof (input)}`);
    }
    return input;
}

export function decodeString(input: any): string {
    if (typeof (input) != "string") {
        throw new DecodeError(`Expected string, got ${typeof (input)}`);
    }
    return input;
}

export function decodeInt(input: any): number {
    if (typeof (input) != "number") {
        throw new DecodeError(`Expected int, got ${typeof (input)}`);
    }
    return input;
}

export function decodeArray<T>(decodeElement: (any) => T,
    input: any): Array<T> {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected Array, got ${typeof (input)}`);
    }

    const inputArray: Array<T> = input;
    return inputArray.map(decodeElement);
}

export type GenericDecoder = (input: any) => any;
export type DecoderList = Array<(input: any) => any>;
export type DecoderMap = Map<string, (input: any) => any>;

export function decodeTuple(decoderList: DecoderList, input: any): Array<any> {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected Array, got ${typeof (input)}`);
    }

    const inputArray: Array<any> = input;
    let result = [];
    for (let i = 0; i < inputArray.length; i++) {
        result.push(decoderList[i](inputArray[i]));
    }
    return result;
}

export function decodeRecord(fieldDecoders: DecoderMap, input: any): any {
    if (!(input instanceof Object)) {
        throw new DecodeError(`Expected Object, got ${typeof (input)}`);
    }

    const fieldNames: Array<string> = Array.from(fieldDecoders.keys());
    for (var field in fieldNames) {
        if (!(field in Object.keys(input))) {
            throw new DecodeError(`Expected field ${field} was not found`);
        }
    }
    if (Object.keys(input).length > fieldNames.length) {
        throw new DecodeError(`Input object has extra fields, expected ${fieldNames.length}, got ${input.keys().length}`);
    }

    const inputObject: object = input;
    var result = new Object()
    fieldDecoders.forEach((decoder: GenericDecoder, name: string) => {
        result[name] = decoder(inputObject[name]);
    });

    return result;
}