// Deserialize and validate at runtime.

import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

class DecodeError extends Error {}

Object.defineProperty(DecodeError.prototype, 'name', {
    value: 'DecodeError',
});

type serializedCustomType = [string, ...any[]];

function expectString(input: any): string {
    if (typeof(input) != "string") {
        throw new DecodeError(`Expected string, got ${typeof(input)}`);
    }
    return input;
}

function expectArray(input: any): Array<any> {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected Array, got ${typeof(input)}`);
    }
    return input;
}

function expectObject(input: any, fieldNames: Array<string>): object {
    if (!(input instanceof Object)) {
        throw new DecodeError(`Expected Object, got ${typeof(input)}`);
    }
    for (var field in fieldNames) {
        if (!(field in Object.keys(input))) {
            throw new DecodeError(`Expected field ${field} was not found`);
        }
    }
    if (Object.keys(input).length > fieldNames.length) {
        throw new DecodeError(`Input object has extra fields, expected ${fieldNames.length}, got ${input.keys().length}`);
    }

    return input;
}

function expectName(input: any): Morphir.IR.Name.Name {
    const inputArray = expectArray(input);
    return inputArray.map(expectString);
}

function expectPath(input: any): Morphir.IR.Path.Path {
    const inputArray = expectArray(input);
    return inputArray.map(expectName);
}

const expectModuleName = expectPath;

function expectCustomType(input: any): serializedCustomType {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected custom type as Array, got ${typeof(input)}`);
    }

    if (typeof(input[0]) != "string") {
        throw new DecodeError(`Expected custom type name, got ${typeof(input[0])}`);
    }

    return input as serializedCustomType;
}

function expectAccess(input: any): Morphir.IR.AccessControlled.Access {
    const inputString = expectString(input);
    if (inputString == 'public') {
        return { kind: "Public" };
    } else if (inputString == 'private') {
        return { kind: "Private" };
    } else {
        throw new DecodeError("Invalid Access type: " + input);
    }
}
function expectAccessControlled<T>(input: any,
                                   decodeValue: (any) => T): Morphir.IR.AccessControlled.AccessControlled<T> {
    // This type has a custom Elm codec/decodec.
    const inputArray = expectArray(input);
    if (inputArray.length != 2) {
        throw new DecodeError(`Expected array with length 2, got ${inputArray.length}`);
    }
    return {
        Access: expectAccess(inputArray[0]),
        Value: decodeValue(inputArray[1]),
    }
}
function expectPackageDefinition<ta,va>(input: any): Morphir.IR.Package.Definition<ta,va> {
    // This type has a custom Elm codec/decodec.
    const inputObject = expectObject(input, ["modules"]);
    const inputModulesArray = expectArray(input["modules"]);

    function decodeArrayElement(item):[Morphir.IR.Module.ModuleName, Morphir.IR.AccessControlled.AccessControlled<Morphir.IR.Module.Definition<ta,va>>] {
        const itemObject = expectObject(item, ["name", "def"]);
        return [
            expectModuleName(itemObject["name"]),
            expectAccessControlled(
                itemObject["def"],
                (item): Morphir.IR.Module.Definition<ta,va> => {
                    return { Types: [], Values: [] }; //item // can't yet decode Module.Definition
                }
            ),
        ]
    };

    return {
        Modules: inputModulesArray.map(decodeArrayElement),
    }
}

function expectDistribution(input: any): Morphir.IR.Distribution.Distribution {
    const serialized = expectCustomType(input);
    if (serialized[0] == "library") {
        const argCount = serialized.length - 1;
        if (argCount != 3) {
            throw new DecodeError(`Expected 3 args for custom type "library", got ${argCount - 1}`);
        }
        return {
            kind: "Library",
            arg1: expectPath(input[1]),
            arg2: input[2],
            arg3: expectPackageDefinition<[],Morphir.IR.Type.Type<[]>>(input[3]),
        }
    } else {
        throw new DecodeError(`Expected type "library", got ${serialized[0]}`);
    }
}

function morphirIrFromJson(data: object): Morphir.IR.Distribution.Distribution {
    const formatVersion = data['formatVersion'];
    if (formatVersion != 1) {
        throw new Error(`Unsupported format version: ${formatVersion}`);
    }

    return expectDistribution(data['distribution']);
}

function formatNameUnderscores(parts: Morphir.IR.Name.Name) {
    return parts.join("_");
}

function formatPath(parts: Morphir.IR.Path.Path) {
    return parts.map(formatNameUnderscores).join(".");
}

function formatPackageDefinition(packageDefinition: Morphir.IR.Package.Definition<[], Morphir.IR.Type.Type<[]>>): string {
    return JSON.stringify(packageDefinition.Modules);
}

function formatDistribution(distribution: Morphir.IR.Distribution.Distribution): string {
    return [
        `Distribution name: ${formatPath(distribution.arg1)}`,
        `Packages: ${distribution.arg2}`,
        "Modules:", formatPackageDefinition(distribution.arg3),
    ].join("\n");
}

fs.readFile(INPUT, 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading ${INPUT}: ${err}`);
    } else {
        const distribution = morphirIrFromJson(JSON.parse(data));
        // Dump the output 
        console.log(formatDistribution(distribution));
    }
});
