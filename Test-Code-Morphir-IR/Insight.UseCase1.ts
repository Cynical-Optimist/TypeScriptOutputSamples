import { Morphir } from "../sample-output-morphir-ir/Morphir"

let accessPublic: Morphir.IR.AccessControlled.Public = { kind: "Public" }
let accessPrivate: Morphir.IR.AccessControlled.Private = { kind: "Private" }

// [Morphir_IR_Name.Name, Array<[Morphir_IR_Name.Name, Morphir_IR_Type.Type<a>]>]

let upName: Morphir.IR.Name.Name = ["up"]
let downName: Morphir.IR.Name.Name = ["down"]

// ------------------ Direction

let upConstructor: [Morphir.IR.Name.Name, Array<[Morphir.IR.Name.Name, Morphir.IR.Type.Type<[]>]>] = [
    upName, []
]
let downConstructor: [Morphir.IR.Name.Name, Array<[Morphir.IR.Name.Name, Morphir.IR.Type.Type<[]>]>] = [
    downName, []
]

let directionAccessControlled: Morphir.IR.AccessControlled.AccessControlled<Morphir.IR.Type.Constructors<[]>> = {
    Access: accessPublic,
    Value: [upConstructor, downConstructor]
}

let directionDefinition: Morphir.IR.Type.Definition<[]> = {
    kind: "CustomTypeDefinition",
    arg1: [],
    arg2: directionAccessControlled
}

// ------------------ Tracking Advantage


let directionFQName: Morphir.IR.FQName.FQName = [
    [["morphir"], ["reference"], ["model"]], [["insight"], ["use", "case", "1"]], ["direction"]
]

let directionReference: Morphir.IR.Type.Type<[]> = {
    kind: "Reference",
    arg1: [],
    arg2: directionFQName,
    arg3: []
}

let stringFQName: Morphir.IR.FQName.FQName = [
    [["morphir"], ["s", "d", "k"]], [["string"]], ["string"]
]

let stringReference: Morphir.IR.Type.Type<[]> = {
    kind: "Reference",
    arg1: [],
    arg2: stringFQName,
    arg3: []
}

let floatFQName: Morphir.IR.FQName.FQName = [
    [["morphir"], ["s", "d", "k"]], [["basics"]], ["float"]
]

let floatReference: Morphir.IR.Type.Type<[]> = {
    kind: "Reference",
    arg1: [],
    arg2: floatFQName,
    arg3: []
}

let directionField: Morphir.IR.Type.Field<[]> = {
    Name: ["direction"],
    Tpe: directionReference
}

let codeField: Morphir.IR.Type.Field<[]> = {
    Name: ["code"],
    Tpe: stringReference
}

let velocityField: Morphir.IR.Type.Field<[]> = {
    Name: ["velocity"],
    Tpe: floatReference
}

let trackingAdvantageType: Morphir.IR.Type.Type<[]> = {
    kind: "Record",
    arg1: [],
    arg2: [directionField, codeField, velocityField]
}

let trackingAdvantageDefinition: Morphir.IR.Type.Definition<[]> = {
    kind: "TypeAliasDefinition",
    arg1: [],
    arg2: trackingAdvantageType
}

// ------------------ Module

let directionAccessControlledDocumented: Morphir.IR.AccessControlled.AccessControlled<{ Doc: string, Value: Morphir.IR.Type.Definition<[]> }> = {
    Access: accessPublic,
    Value: { Doc: "", Value: directionDefinition }
}

let trackingAdvantageAccessControlledDocumented: Morphir.IR.AccessControlled.AccessControlled<{ Doc: string, Value: Morphir.IR.Type.Definition<[]> }> = {
    Access: accessPublic,
    Value: { Doc: "", Value: trackingAdvantageDefinition }
}

let useCaseOneDefinition: Morphir.IR.Module.Definition<[], Morphir.IR.Type.Type<[]>> = {
    Types: [
        [["direction"], directionAccessControlledDocumented],
        [["tracking", "advantage"], trackingAdvantageAccessControlledDocumented]
    ],
    Values: [],
}

let useCaseOneAccessControlledDefinition: Morphir.IR.AccessControlled.AccessControlled<Morphir.IR.Module.Definition<[], Morphir.IR.Type.Type<[]>>> = {
    Access: accessPublic,
    Value: useCaseOneDefinition
}

// ------------------ Distribution

let packageDefinition: Morphir.IR.Package.Definition<[], Morphir.IR.Type.Type<[]>> = {
    Modules: [
        [
            [["insight"], ["use", "case", "1"]], useCaseOneAccessControlledDefinition
        ]
    ]
}

let distribution: Morphir.IR.Distribution.Distribution = {
    kind: "Library",
    arg1: [["morphir"], ["reference"], ["model"]],
    arg2: [],
    arg3: packageDefinition
}