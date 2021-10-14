import { Morphir } from "../sample-output-morphir-ir/Morphir"

function testList() {
    console.log("Name (list):")

    let example: Morphir.IR.Name.Name = ["very", "good", "name"]

    console.log("  Original: " + JSON.stringify(example));
    let encoded = Morphir.IR.Name.encodeName({}, example);
    console.log("  Encoded: " + JSON.stringify(encoded));
    let decoded = Morphir.IR.Name.decodeName({}, encoded);
    console.log("  Decoded: " + JSON.stringify(decoded));
}

function testTuple() {
    console.log("FQName (tuple):");

    let example: Morphir.IR.FQName.FQName = [
        [ [ "Excellent" ], [ "Package" ] ],
        [ [ "Fantastic" ], [ "Module" ] ],
        [ "Amazing", "Local", "Name" ]
    ]

    console.log("  Original: " + JSON.stringify(example));
    let encoded = Morphir.IR.FQName.encodeFQName({}, example);
    console.log("  Encoded: " + JSON.stringify(encoded));
    let decoded = Morphir.IR.FQName.decodeFQName({}, encoded);
    console.log("  Decoded: " + JSON.stringify(decoded));
}

function testRecord() {
    console.log("AccessControlled (record):");

    let accessPublic: Morphir.IR.AccessControlled.Public = { kind: "Public" }
    let accessPrivate: Morphir.IR.AccessControlled.Private = { kind: "Private" }

    let upName: Morphir.IR.Name.Name = ["up"]
    let downName: Morphir.IR.Name.Name = ["down"]

    let upConstructor: [Morphir.IR.Name.Name, Array<[Morphir.IR.Name.Name, Morphir.IR.Type.Type<[]>]>] = [
        upName, []
    ]
    let downConstructor: [Morphir.IR.Name.Name, Array<[Morphir.IR.Name.Name, Morphir.IR.Type.Type<[]>]>] = [
        downName, []
    ]

    let directionAccessControlled: Morphir.IR.AccessControlled.AccessControlled<Morphir.IR.Type.Constructors<[]>> = {
        access: accessPublic,
        value: [upConstructor, downConstructor]
    }

    console.log("  Original: " + JSON.stringify(directionAccessControlled));

    let encoded = Morphir.IR.AccessControlled.encodeAccessControlled({
        a: Morphir.IR.Type.encodeConstructors.bind(null, {})
    }, directionAccessControlled);
    console.log("  Encoded: " + JSON.stringify(encoded));

    let decoded = Morphir.IR.AccessControlled.decodeAccessControlled({
        a: Morphir.IR.Type.decodeConstructors.bind(null, {})
    }, encoded);
    console.log("  Decoded: " + JSON.stringify(decoded));
}

testList();
testTuple();
testRecord();
// FIXME add a testDict using Morphir.IR.Type or something
