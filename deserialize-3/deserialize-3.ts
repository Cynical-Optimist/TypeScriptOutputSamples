// Deserialize and validate at runtime.

import {Morphir} from '../sample-output-morphir-ir/Morphir'

const fs = require('fs');

const INPUT = './morphir-ir.json';

class DecodeError extends Error {}

Object.defineProperty(DecodeError.prototype, 'name', {
    value: 'DecodeError',
});

type serializedCustomType = [string, ...any[]];

function expectUnit(input: any): [] {
    return [];
}

function expectBoolean(input: any): boolean {
    if (typeof(input) != "boolean") {
        throw new DecodeError(`Expected bool, got ${typeof(input)}`);
    }
    return input;
}

function expectChar(input: any): string {
    if (typeof(input) != "string") {
        throw new DecodeError(`Expected char, got ${typeof(input)}`);
    }
    if (input.length != 1) {
        throw new DecodeError(`Expected char, got string`);
    }
    return input;
}

function expectString(input: any): string {
    if (typeof(input) != "string") {
        throw new DecodeError(`Expected string, got ${typeof(input)}`);
    }
    return input;
}

function expectInt(input: any): number {
    if (typeof(input) != "number") {
        throw new DecodeError(`Expected int, got ${typeof(input)}`);
    }
    return input;
}

function expectFloat(input: any): number {
    if (typeof(input) != "number") {
        throw new DecodeError(`Expected float, got ${typeof(input)}`);
    }
    return input;
}

function expectArray(input: any): Array<any> {
    if (!(input instanceof Array)) {
        console.log(input);
        throw new DecodeError(`Expected Array, got ${typeof(input)}`);
    }
    return input;
}

// FIXME: maps are represented as arrays right now
function expectMap<Key,Value>(decodeKey: (any) => Key, decodeValue: (any) => Value, input: any): Array<[Key,Value]> {
    const inputArray = expectArray(input);
    return inputArray.map((item) => {
        const itemArray = expectArray(item);
        return [decodeKey(itemArray[0]), decodeValue(itemArray[1])];
    });
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

function expectAccessControlled<T>(decodeValue: (any) => T,
                                   input: any): Morphir.IR.AccessControlled.AccessControlled<T> {
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

function expectDistribution(input: any): Morphir.IR.Distribution.Distribution {
    const serialized = expectCustomType(input);

    type TypeAttribute = [];
    type ValueAttribute = [];
    const decodeTypeAttribute = expectUnit;
    const decodeValueAttribute = expectUnit;

    if (serialized[0] == "library") {
        const argCount = serialized.length - 1;
        if (argCount != 3) {
            throw new DecodeError(`Expected 3 args for custom type "library", got ${argCount - 1}`);
        }
        return {
            kind: "Library",
            arg1: expectPackageName(input[1]),
            arg2: expectMap<Morphir.IR.Package.PackageName,Morphir.IR.Package.Specification<TypeAttribute>>(
                expectPackageName,
                expectPackageSpecification.bind(null, decodeTypeAttribute),
                input[2],
            ),
            arg3: expectPackageDefinition<TypeAttribute,Morphir.IR.Type.Type<ValueAttribute>>(
                decodeTypeAttribute,
                expectType.bind(null, decodeValueAttribute),
                input[3]),
        }
    } else {
        throw new DecodeError(`Expected type "library", got ${serialized[0]}`);
    }
}

function expectDocumented<T>(decodeValue: (any) => T,
                             input: any): Morphir.IR.Documented.Documented<T> {
    // This type has a custom Elm codec/decodec.
    const inputArray = expectArray(input);
    if (inputArray.length != 2) {
        throw new DecodeError(`Expected array with length 2, got ${inputArray.length}`);
    }
    return {
        Doc: expectString(inputArray[0]),
        Value: decodeValue(inputArray[1]),
    }
}
function expectFQName(input: any): Morphir.IR.FQName.FQName {
    // Custom codec
    const inputArray = expectArray(input);
    return [
        expectPath(inputArray[0]),
        expectPath(inputArray[1]),
        expectName(inputArray[2]),
    ];
}

function expectLiteral(input: any): Morphir.IR.Literal.Literal {
    // Custom codec
    const inputArray = expectArray(input);
    const kind = inputArray[0];
    if (kind == "bool_literal") {
        return { kind: "BoolLiteral", arg1: expectBoolean(input[1]) };
    } else if (kind == "char_literal") {
        return { kind: "CharLiteral", arg1: expectChar(input[1]) };
    } else if (kind == "string_literal") {
        return { kind: "StringLiteral", arg1: expectString(input[1]) };
    } else if (kind == "int_literal") {
        return { kind: "WholeNumberLiteral", arg1: expectInt(input[1]) };
    } else if (kind == "float_literal") {
        return { kind: "FloatLiteral", arg1: expectFloat(input[1]) };
    }
}

const expectModuleName = expectPath;

function expectModuleSpecification<ta>(input: any): Morphir.IR.Module.Specification<ta> {
    const inputObject = expectObject(input, ["types", "values"]);
    const inputTypesArray = expectArray(input['types']);
    const inputValuesArray = expectArray(input['values']);

    type ValueSpec = Morphir.IR.Value.Specification<ta>;
    type TypesMapKey = Morphir.IR.Name.Name;
    type TypesMapValue = Morphir.IR.Documented.Documented<Morphir.IR.Type.Specification<ta>>;
    type ValuesMapKey = Morphir.IR.Name.Name;
    type ValuesMapValue = ValueSpec;

    const typesMap = expectMap<TypesMapKey, TypesMapValue>(
        expectName,
        expectDocumented.bind(null, expectTypeSpecification),
        inputTypesArray
    );
    const valuesMap = expectMap<ValuesMapKey, ValuesMapValue>(
        expectName,
        expectValueSpecification.bind(null, expectTypeSpecification, expectValueSpecification),
        inputValuesArray
    );
    return {
        Types: typesMap,
        Values: valuesMap,
    }
}

function expectModuleDefinition<ta,va>(input: any): Morphir.IR.Module.Definition<ta,va> {
    const inputObject = expectObject(input, ["types", "values"]);
    const inputTypesArray = expectArray(input['types']);
    const inputValuesArray = expectArray(input['values']);

    type TypeDef = Morphir.IR.Type.Definition<ta>;
    type DocumentedTypeDef = Morphir.IR.Documented.Documented<TypeDef>;

    type TypesMapKey = Morphir.IR.Name.Name;
    type TypesMapValue = Morphir.IR.AccessControlled.AccessControlled<DocumentedTypeDef>;

    type ValueDef = Morphir.IR.Value.Definition<ta,va>;
    type ValuesMapKey = Morphir.IR.Name.Name;
    type ValuesMapValue = Morphir.IR.AccessControlled.AccessControlled<ValueDef>;

    return {
        Types: expectMap<TypesMapKey, TypesMapValue>(
            expectName,
            expectAccessControlled.bind(null,
                expectDocumented.bind(null,
                    expectTypeDefinition
                )
            ),
            inputTypesArray
        ),
        Values: expectMap<ValuesMapKey, ValuesMapValue>(
            expectName,
            expectAccessControlled.bind(null,
                expectValueDefinition
            ),
            inputValuesArray
        ),
    };
}

function expectName(input: any): Morphir.IR.Name.Name {
    const inputArray = expectArray(input);
    return inputArray.map(expectString);
}

function expectPath(input: any): Morphir.IR.Path.Path {
    const inputArray = expectArray(input);
    return inputArray.map(expectName);
}

const expectPackageName = expectPath;

function expectPackageSpecification<ta>(input: any): Morphir.IR.Package.Specification<ta> {
    // This type has a custom Elm codec/decodec.
    const inputObject = expectObject(input, ["modules"]);
    const inputModulesCustom = expectArray(input['modules']);

    type ModuleSpec = Morphir.IR.Module.Specification<ta>;
    type MapKey = Morphir.IR.Module.ModuleName;
    type MapValue = ModuleSpec;

    // Convert to regular dict format.
    const inputModulesDict: Array<[MapKey, MapValue]> = inputModulesCustom.map((item) => {
        return [item['name'], item['def']]
    });

    return {
        Modules: expectMap<MapKey, MapValue>(
            expectModuleName,
            expectModuleSpecification,
            inputModulesDict
        ),
    }
}

function expectPackageDefinition<ta,va>(decodeTypeAttibute: (any) => ta,
                                        decodeValueAttribute: (any) => va,
                                        input: any): Morphir.IR.Package.Definition<ta,va> {
    // This type has a custom Elm codec/decodec.
    const inputObject = expectObject(input, ["modules"]);
    const inputModulesCustom = expectArray(input["modules"]);

    type ModuleDef = Morphir.IR.Module.Definition<ta,va>;
    type MapKey = Morphir.IR.Module.ModuleName;
    type MapValue = Morphir.IR.AccessControlled.AccessControlled<ModuleDef>;

    // Convert to regular dict format.
    const inputModulesDict: Array<[MapKey, MapValue]> = inputModulesCustom.map((item) => {
        return [item['name'], item['def']]
    });

    return {
        Modules: expectMap<MapKey, MapValue>(
            expectModuleName,
            expectAccessControlled.bind(null,
                expectModuleDefinition
            ),
            inputModulesDict,
        ),
    };
}

function expectQName(input: any): Morphir.IR.QName.QName {
    // Custom codec
    const inputArray = expectArray(input);
    return {
        kind: "QName",
        arg1: expectPath(inputArray[0]),
        arg2: expectName(inputArray[1]),
    };
}

function expectType<a>(decodeTypeAttribute: (any) => a,
                       input: any): Morphir.IR.Type.Type<a> {
    // Custom codec
    const inputArray = expectArray(input);
    const kind = inputArray[0];
    if (kind == "variable") {
        return expectTypeVariable(decodeTypeAttribute, inputArray[1], inputArray[2]);
    } else if (kind == "reference") {
        return expectTypeReference(decodeTypeAttribute, inputArray[1], inputArray[2], inputArray[3]);
    } else if (kind == "tuple") {
        return expectTypeTuple(decodeTypeAttribute, inputArray[1], inputArray[2]);
    } else if (kind == "record") {
        return expectTypeRecord(decodeTypeAttribute, inputArray[1], inputArray[2]);
    } else if (kind == "extensible_record") {
        return expectTypeExtensibleRecord(decodeTypeAttribute, inputArray[1], inputArray[2], inputArray[3]);
    } else if (kind == "function") {
        return expectTypeFunction(decodeTypeAttribute, inputArray[1], inputArray[2], inputArray[3]);
    } else if (kind == "unit") {
        return expectTypeUnit(decodeTypeAttribute, inputArray[1]);
    }
}

function expectTypeVariable<a>(decodeTypeAttribute: (any) => a,
                               input1: any, input2: any): Morphir.IR.Type.Variable<a> {
    return { kind: "Variable", arg1: decodeTypeAttribute(input1), arg2: [] }
}

function expectTypeReference<a>(decodeTypeAttribute: (any) => a,
                                input1: any, input2: any, input3: any): Morphir.IR.Type.Reference<a> {
    return { kind: "Reference", arg1: decodeTypeAttribute(input1), arg2: expectFQName(input2), arg3: [] }
}

function expectTypeTuple<a>(decodeTypeAttribute: (any) => a,
                            input1: any, input2: any): Morphir.IR.Type.Tuple<a> {
    return { kind: "Tuple", arg1: decodeTypeAttribute(input1), arg2: [] }
}

function expectTypeRecord<a>(decodeTypeAttribute: (any) => a,
                             input1: any, input2: any): Morphir.IR.Type.Record<a> {
    return { kind: "Record", arg1: decodeTypeAttribute(input1), arg2: [] }
}

function expectTypeExtensibleRecord<a>(decodeTypeAttribute: (any) => a,
                                       input1: any, input2: any, input3: any): Morphir.IR.Type.ExtensibleRecord<a> {
    return { kind: "ExtensibleRecord", arg1: decodeTypeAttribute(input1), arg2: [], arg3: [] }
}

function expectTypeFunction<a>(decodeTypeAttribute: (any) => a,
                               input1: any, input2: any, input3: any): Morphir.IR.Type.Function<a> {
    return { kind: "Function", arg1: decodeTypeAttribute(input1), arg2: expectType(decodeTypeAttribute, input3), arg3: expectType(decodeTypeAttribute, input3) }
}

function expectTypeUnit<a>(decodeTypeAttribute: (any) => a,
                           input1: any): Morphir.IR.Type.Unit<a> {
    return { kind: "Unit", arg1: decodeTypeAttribute(input1) }
}

function expectTypeSpecification<ta>(decodeTypeAttribute: (any) => ta,
                                     input: any): Morphir.IR.Type.Specification<ta> {
    return { kind: "TypeAliasSpecification", arg1: [], arg2: expectType(decodeTypeAttribute, input) }
}

function expectTypeDefinition<ta>(decodeTypeAttribute: (any) => ta,
                                  input: any): Morphir.IR.Type.Definition<ta> {
    // FIXME: not implemented!
    return { kind: "TypeAliasDefinition", arg1: [], arg2: expectType(decodeTypeAttribute, input) }
}

function expectValue<ta,va>(decodeTypeAttribute: (any) => ta,
                            decodeValueAttribute: (any) => va,
                            input: any): Morphir.IR.Value.Value<ta, va> {
    // FIXME: not implemented!
    return { kind: "Unit", arg1: decodeValueAttribute(input) }
}

function expectValueSpecification<ta>(decodeTypeAttribute: (any) => ta,
                                      input: any): Morphir.IR.Value.Specification<ta> {
    // FIXME: not implemented!
    return {
        Inputs: [],
        Output: expectType(decodeTypeAttribute, input),
    }
}

function expectValueDefinition<ta,va>(decodeTypeAttribute: (any) => ta,
                                      decodeValueAttribute: (any) => va,
                                      input: any): Morphir.IR.Value.Definition<ta,va> {
    // FIXME: not implemented!
    const inputObject = expectObject(input, ["inputTypes", "outputType", "body"]);
    return {
        InputTypes: [],
        OutputType: expectType(decodeTypeAttribute, inputObject['outputType']),
        Body: expectValue(decodeTypeAttribute, decodeValueAttribute, inputObject['body']),
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
        // JSON the output
        console.log(JSON.stringify(distribution));
    }
});
