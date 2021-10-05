import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

type serializedMorphir_IR_Name_Name = Array<string>;
type serializedMorphir_IR_Path_Path = Array<serializedMorphir_IR_Name_Name>;
type serializedMorphir_IR_Package_Name = serializedMorphir_IR_Path_Path;
type serializedMorphir_IR_Distribution_Distribution = [
    // FIXME: the JSON serialization uses "library" while the
    // generated TypeScript types use "Library".
    "library",
    serializedMorphir_IR_Package_Name,
    any, //Array<[Morphir.IR.Package.PackageName, Morphir.IR.Package.Specification<[]>]>,
    any, //Morphir.IR.Package.Definition<[], Morphir.IR.Type.Type<[]>>
];

function decodePath(input: serializedMorphir_IR_Path_Path): Morphir.IR.Path.Path {
    return input;
}

function decodeDistribution(input: serializedMorphir_IR_Distribution_Distribution): Morphir.IR.Distribution.Distribution {
    return {
        kind: "Library",
        arg1: decodePath(input[1]),
        arg2: input[2],
        arg3: decodePackageDefinition(input[3]),
    }
}

function morphirIrFromJson(data: object): Morphir.IR.Distribution.Distribution {
    const formatVersion = data['formatVersion'];
    if (formatVersion != 1) {
        throw new Error(`Unsupported format version: ${formatVersion}`);
    }

    return decodeDistribution(data['distribution']);
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
