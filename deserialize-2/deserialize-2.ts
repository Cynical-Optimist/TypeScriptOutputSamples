// Deserialize and validate at runtime.

import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

class DecodeError extends Error {}

Object.defineProperty(DecodeError.prototype, 'name', {
    value: 'DecodeError',
});

type serializedCustomType = [string, ...any[]];

function expectArray(input: any): Array<any> {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected Array, got ${typeof(input)}`);
    }
    return input;
}

function expectName(input: any): Morphir.IR.Name.Name {
    const inputArray = expectArray(input);
    inputArray.map((item: any) => {
        if (typeof(item) != "string") {
            throw new DecodeError(`Expected string, got ${typeof(input)}`);
        }
    });
    return inputArray;
}


function expectPath(input: any): Morphir.IR.Path.Path {
    const inputArray = expectArray(input);
    return inputArray.map(expectName);
}

function expectCustomType(input: any): serializedCustomType {
    if (!(input instanceof Array)) {
        throw new DecodeError(`Expected custom type as Array, got ${typeof(input)}`);
    }

    if (typeof(input[0]) != "string") {
        throw new DecodeError(`Expected custom type name, got ${typeof(input[0])}`);
    }

    return input as serializedCustomType;
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
            arg3: input[3],//expectPackageDefinition<[],Morphir.IR.Type.Type<[]>>(input[3]),
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
    return "FIXME"; //JSON.stringify(packageDefinition.Modules);
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
