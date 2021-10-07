"use strict";
// Deserialize and validate at runtime.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs = require('fs');
var INPUT = './morphir-ir.json';
var DecodeError = /** @class */ (function (_super) {
    __extends(DecodeError, _super);
    function DecodeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DecodeError;
}(Error));
Object.defineProperty(DecodeError.prototype, 'name', {
    value: 'DecodeError'
});
function expectUnit(input) {
    return [];
}
function expectBoolean(input) {
    if (typeof (input) != "boolean") {
        throw new DecodeError("Expected bool, got " + typeof (input));
    }
    return input;
}
function expectChar(input) {
    if (typeof (input) != "string") {
        throw new DecodeError("Expected char, got " + typeof (input));
    }
    if (input.length != 1) {
        throw new DecodeError("Expected char, got string");
    }
    return input;
}
function expectString(input) {
    if (typeof (input) != "string") {
        throw new DecodeError("Expected string, got " + typeof (input));
    }
    return input;
}
function expectInt(input) {
    if (typeof (input) != "number") {
        throw new DecodeError("Expected int, got " + typeof (input));
    }
    return input;
}
function expectFloat(input) {
    if (typeof (input) != "number") {
        throw new DecodeError("Expected float, got " + typeof (input));
    }
    return input;
}
function expectArray(input) {
    if (!(input instanceof Array)) {
        console.log(input);
        throw new DecodeError("Expected Array, got " + typeof (input));
    }
    return input;
}
// FIXME: maps are represented as arrays right now
function expectMap(decodeKey, decodeValue, input) {
    var inputArray = expectArray(input);
    return inputArray.map(function (item) {
        var itemArray = expectArray(item);
        return [decodeKey(itemArray[0]), decodeValue(itemArray[1])];
    });
}
function expectObject(input, fieldNames) {
    if (!(input instanceof Object)) {
        throw new DecodeError("Expected Object, got " + typeof (input));
    }
    for (var field in fieldNames) {
        if (!(field in Object.keys(input))) {
            throw new DecodeError("Expected field " + field + " was not found");
        }
    }
    if (Object.keys(input).length > fieldNames.length) {
        throw new DecodeError("Input object has extra fields, expected " + fieldNames.length + ", got " + input.keys().length);
    }
    return input;
}
function expectCustomType(input) {
    if (!(input instanceof Array)) {
        throw new DecodeError("Expected custom type as Array, got " + typeof (input));
    }
    if (typeof (input[0]) != "string") {
        throw new DecodeError("Expected custom type name, got " + typeof (input[0]));
    }
    return input;
}
function expectAccess(input) {
    var inputString = expectString(input);
    if (inputString == 'public') {
        return { kind: "Public" };
    }
    else if (inputString == 'private') {
        return { kind: "Private" };
    }
    else {
        throw new DecodeError("Invalid Access type: " + input);
    }
}
function expectAccessControlled(decodeValue, input) {
    // This type has a custom Elm codec/decodec.
    var inputArray = expectArray(input);
    if (inputArray.length != 2) {
        throw new DecodeError("Expected array with length 2, got " + inputArray.length);
    }
    return {
        Access: expectAccess(inputArray[0]),
        Value: decodeValue(inputArray[1])
    };
}
function expectDistribution(input) {
    var serialized = expectCustomType(input);
    var decodeTypeAttribute = expectUnit;
    var decodeValueAttribute = expectUnit;
    if (serialized[0] == "library") {
        var argCount = serialized.length - 1;
        if (argCount != 3) {
            throw new DecodeError("Expected 3 args for custom type \"library\", got " + (argCount - 1));
        }
        return {
            kind: "Library",
            arg1: expectPackageName(input[1]),
            arg2: expectMap(expectPackageName, expectPackageSpecification.bind(null, decodeTypeAttribute), input[2]),
            arg3: expectPackageDefinition(decodeTypeAttribute, expectType.bind(null, decodeValueAttribute), input[3])
        };
    }
    else {
        throw new DecodeError("Expected type \"library\", got " + serialized[0]);
    }
}
function expectDocumented(decodeValue, input) {
    // This type has a custom Elm codec/decodec.
    var inputArray = expectArray(input);
    if (inputArray.length != 2) {
        throw new DecodeError("Expected array with length 2, got " + inputArray.length);
    }
    return {
        Doc: expectString(inputArray[0]),
        Value: decodeValue(inputArray[1])
    };
}
function expectFQName(input) {
    // Custom codec
    var inputArray = expectArray(input);
    return [
        expectPath(inputArray[0]),
        expectPath(inputArray[1]),
        expectName(inputArray[2]),
    ];
}
function expectLiteral(input) {
    // Custom codec
    var inputArray = expectArray(input);
    var kind = inputArray[0];
    if (kind == "bool_literal") {
        return { kind: "BoolLiteral", arg1: expectBoolean(input[1]) };
    }
    else if (kind == "char_literal") {
        return { kind: "CharLiteral", arg1: expectChar(input[1]) };
    }
    else if (kind == "string_literal") {
        return { kind: "StringLiteral", arg1: expectString(input[1]) };
    }
    else if (kind == "int_literal") {
        return { kind: "WholeNumberLiteral", arg1: expectInt(input[1]) };
    }
    else if (kind == "float_literal") {
        return { kind: "FloatLiteral", arg1: expectFloat(input[1]) };
    }
}
var expectModuleName = expectPath;
function expectModuleSpecification(input) {
    var inputObject = expectObject(input, ["types", "values"]);
    var inputTypesArray = expectArray(input['types']);
    var inputValuesArray = expectArray(input['values']);
    var typesMap = expectMap(expectName, expectDocumented.bind(null, expectTypeSpecification), inputTypesArray);
    var valuesMap = expectMap(expectName, expectValueSpecification.bind(null, expectTypeSpecification, expectValueSpecification), inputValuesArray);
    return {
        Types: typesMap,
        Values: valuesMap
    };
}
function expectModuleDefinition(input) {
    var inputObject = expectObject(input, ["types", "values"]);
    var inputTypesArray = expectArray(input['types']);
    var inputValuesArray = expectArray(input['values']);
    return {
        Types: expectMap(expectName, expectAccessControlled.bind(null, expectDocumented.bind(null, expectTypeDefinition)), inputTypesArray),
        Values: expectMap(expectName, expectAccessControlled.bind(null, expectValueDefinition), inputValuesArray)
    };
}
function expectName(input) {
    var inputArray = expectArray(input);
    return inputArray.map(expectString);
}
function expectPath(input) {
    var inputArray = expectArray(input);
    return inputArray.map(expectName);
}
var expectPackageName = expectPath;
function expectPackageSpecification(input) {
    // This type has a custom Elm codec/decodec.
    var inputObject = expectObject(input, ["modules"]);
    var inputModulesCustom = expectArray(input['modules']);
    // Convert to regular dict format.
    var inputModulesDict = inputModulesCustom.map(function (item) {
        return [item['name'], item['def']];
    });
    return {
        Modules: expectMap(expectModuleName, expectModuleSpecification, inputModulesDict)
    };
}
function expectPackageDefinition(decodeTypeAttibute, decodeValueAttribute, input) {
    // This type has a custom Elm codec/decodec.
    var inputObject = expectObject(input, ["modules"]);
    var inputModulesCustom = expectArray(input["modules"]);
    // Convert to regular dict format.
    var inputModulesDict = inputModulesCustom.map(function (item) {
        return [item['name'], item['def']];
    });
    return {
        Modules: expectMap(expectModuleName, expectAccessControlled.bind(null, expectModuleDefinition), inputModulesDict)
    };
}
function expectQName(input) {
    // Custom codec
    var inputArray = expectArray(input);
    return {
        kind: "QName",
        arg1: expectPath(inputArray[0]),
        arg2: expectName(inputArray[1])
    };
}
function expectType(decodeTypeAttribute, input) {
    // Custom codec
    var inputArray = expectArray(input);
    var kind = inputArray[0];
    if (kind == "variable") {
        return expectTypeVariable(decodeTypeAttribute, inputArray[1], inputArray[2]);
    }
    else if (kind == "reference") {
        return expectTypeReference(decodeTypeAttribute, inputArray[1], inputArray[2], inputArray[3]);
    }
    else if (kind == "tuple") {
        return expectTypeTuple(decodeTypeAttribute, inputArray[1], inputArray[2]);
    }
    else if (kind == "record") {
        return expectTypeRecord(decodeTypeAttribute, inputArray[1], inputArray[2]);
    }
    else if (kind == "extensible_record") {
        return expectTypeExtensibleRecord(decodeTypeAttribute, inputArray[1], inputArray[2], inputArray[3]);
    }
    else if (kind == "function") {
        return expectTypeFunction(decodeTypeAttribute, inputArray[1], inputArray[2], inputArray[3]);
    }
    else if (kind == "unit") {
        return expectTypeUnit(decodeTypeAttribute, inputArray[1]);
    }
}
function expectTypeVariable(decodeTypeAttribute, input1, input2) {
    return { kind: "Variable", arg1: decodeTypeAttribute(input1), arg2: [] };
}
function expectTypeReference(decodeTypeAttribute, input1, input2, input3) {
    return { kind: "Reference", arg1: decodeTypeAttribute(input1), arg2: expectFQName(input2), arg3: [] };
}
function expectTypeTuple(decodeTypeAttribute, input1, input2) {
    return { kind: "Tuple", arg1: decodeTypeAttribute(input1), arg2: [] };
}
function expectTypeRecord(decodeTypeAttribute, input1, input2) {
    return { kind: "Record", arg1: decodeTypeAttribute(input1), arg2: [] };
}
function expectTypeExtensibleRecord(decodeTypeAttribute, input1, input2, input3) {
    return { kind: "ExtensibleRecord", arg1: decodeTypeAttribute(input1), arg2: [], arg3: [] };
}
function expectTypeFunction(decodeTypeAttribute, input1, input2, input3) {
    return { kind: "Function", arg1: decodeTypeAttribute(input1), arg2: expectType(decodeTypeAttribute, input3), arg3: expectType(decodeTypeAttribute, input3) };
}
function expectTypeUnit(decodeTypeAttribute, input1) {
    return { kind: "Unit", arg1: decodeTypeAttribute(input1) };
}
function expectTypeSpecification(decodeTypeAttribute, input) {
    return { kind: "TypeAliasSpecification", arg1: [], arg2: expectType(decodeTypeAttribute, input) };
}
function expectTypeDefinition(decodeTypeAttribute, input) {
    // FIXME: not implemented!
    return { kind: "TypeAliasDefinition", arg1: [], arg2: expectType(decodeTypeAttribute, input) };
}
function expectValue(decodeTypeAttribute, decodeValueAttribute, input) {
    // FIXME: not implemented!
    return { kind: "Unit", arg1: decodeValueAttribute(input) };
}
function expectValueSpecification(decodeTypeAttribute, input) {
    // FIXME: not implemented!
    return {
        Inputs: [],
        Output: expectType(decodeTypeAttribute, input)
    };
}
function expectValueDefinition(decodeTypeAttribute, decodeValueAttribute, input) {
    // FIXME: not implemented!
    var inputObject = expectObject(input, ["inputTypes", "outputType", "body"]);
    return {
        InputTypes: [],
        OutputType: expectType(decodeTypeAttribute, inputObject['outputType']),
        Body: expectValue(decodeTypeAttribute, decodeValueAttribute, inputObject['body'])
    };
}
function morphirIrFromJson(data) {
    var formatVersion = data['formatVersion'];
    if (formatVersion != 1) {
        throw new Error("Unsupported format version: " + formatVersion);
    }
    return expectDistribution(data['distribution']);
}
function formatNameUnderscores(parts) {
    return parts.join("_");
}
function formatPath(parts) {
    return parts.map(formatNameUnderscores).join(".");
}
function formatPackageDefinition(packageDefinition) {
    return JSON.stringify(packageDefinition.Modules);
}
function formatDistribution(distribution) {
    return [
        "Distribution name: " + formatPath(distribution.arg1),
        "Packages: " + distribution.arg2,
        "Modules:", formatPackageDefinition(distribution.arg3),
    ].join("\n");
}
fs.readFile(INPUT, 'utf8', function (err, data) {
    if (err) {
        console.log("Error reading " + INPUT + ": " + err);
    }
    else {
        var distribution = morphirIrFromJson(JSON.parse(data));
        // Dump the output 
        console.log(formatDistribution(distribution));
        // JSON the output
        console.log(JSON.stringify(distribution));
    }
});
