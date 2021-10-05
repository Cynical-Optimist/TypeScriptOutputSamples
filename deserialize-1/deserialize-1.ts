import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

type serializedMorphir_IR_Name_Name = Array<string>;
type serializedMorphir_IR_Path_Path = Array<serializedMorphir_IR_Name_Name>;
type serializedMorphir_IR_Package_Name = serializedMorphir_IR_Path_Path;
type serializedMorphir_IR_Module_ModuleName = serializedMorphir_IR_Path_Path;
type serializedMorphir_IR_AccessControlled_AccessControlled<a> = [
    // This type has a custom Elm codec/decodec, it's not serialized like other Record types.
    string, a
]
type serializedMorphir_IR_Module_Definition<ta,va> = any; // FIXME: Placeholder
type serializedMorphir_IR_Package_Definition<ta,va> = {
    // This type has a custom Elm codec/decodec, it's not serialized like other Record types.
    'modules': [
        {
            'name': serializedMorphir_IR_Module_ModuleName,
            'def': serializedMorphir_IR_AccessControlled_AccessControlled<serializedMorphir_IR_Module_Definition<ta,va>>,
        }
    ]
}
type serializedMorphir_IR_Distribution_Distribution = [
    // FIXME: the JSON serialization uses "library" while the
    // generated TypeScript types use "Library".
    "library",
    serializedMorphir_IR_Package_Name,
    any, // FIXME: Placeholder
    serializedMorphir_IR_Package_Definition<[],[]>,
];

function decodePath(input: serializedMorphir_IR_Path_Path): Morphir.IR.Path.Path {
    return input;
}

function decodeAccess(input: string): Morphir.IR.AccessControlled.Access {
    if (input == 'public') {
        return { kind: "Public" };
    } else if (input == 'private') {
        return { kind: "Private" };
    } else {
        throw new Error("Invalid access type: " + input);
    }
}

function decodeAccessControlled<VST,VT>(input: serializedMorphir_IR_AccessControlled_AccessControlled<VST>,
                                        decodeValue: (VST) => VT): Morphir.IR.AccessControlled.AccessControlled<VT> {
    // This type has a custom Elm codec/decodec.
    return {
        Access: decodeAccess(input[0]),
        Value: decodeValue(input[1]),
    }
}

function decodeModuleName(input: serializedMorphir_IR_Module_ModuleName): Morphir.IR.Module.ModuleName {
    return decodePath(input);
}

function decodePackageDefinition<ta,va>(input: serializedMorphir_IR_Package_Definition<ta,va>): Morphir.IR.Package.Definition<ta,va> {
    // This type has a custom Elm codec/decodec.
    function decodeArrayElement(item) {
        return [
            decodeModuleName(input['name']),
            decodeAccessControlled<serializedMorphir_IR_Module_Definition<ta,va>,Morphir.IR.Module.Definition<ta,va>>(
                input['def'],
                (item: serializedMorphir_IR_Module_Definition<ta,va>): Morphir.IR.Module.Definition<ta,va> => {
                    return item.name, item.def
                }
            ),
        ]
    };
    return {
        Modules: input['modules'].map(decodeArrayElement)
    };
};

function decodeDistribution(input: serializedMorphir_IR_Distribution_Distribution): Morphir.IR.Distribution.Distribution {
    return {
        kind: "Library",
        arg1: decodePath(input[1]),
        arg2: input[2],
        arg3: decodePackageDefinition<[],Morphir.IR.Type.Type<[]>>(input[3]),
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
