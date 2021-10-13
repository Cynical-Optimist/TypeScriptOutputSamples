import { Codethink } from "./Codethink";

import Prize = Codethink.PrizeDraws.AutoGen.Prize
import Car = Codethink.PrizeDraws.AutoGen.Car
import Cash = Codethink.PrizeDraws.AutoGen.Cash
import GemStone = Codethink.PrizeDraws.AutoGen.GemStone
import Holiday = Codethink.PrizeDraws.AutoGen.Holiday
import decodePrize = Codethink.PrizeDraws.AutoGen.decodePrize
import decodeCar = Codethink.PrizeDraws.AutoGen.decodeCar
import decodeCash = Codethink.PrizeDraws.AutoGen.decodeCash
import decodeGemstone = Codethink.PrizeDraws.AutoGen.decodeGemstone
import decodeHoliday = Codethink.PrizeDraws.AutoGen.decodeHoliday

type MondayPrize = Prize<Holiday, Cash>
type WednesdayPrize = Prize<GemStone, Cash>
type FridayPrize = Prize<Car, Holiday>

let decodeMondayPrize = (
    decodePrize.bind(null, [decodeHoliday, decodeCash])
)

let decodeWednesdayPrize: WednesdayPrize = (
    decodePrize.bind(null, [decodeGemstone, decodeCash])
)

let decodeFridayPrize: FridayPrize = (
    decodePrize.bind(null, [decodeCar, decodeHoliday])
)


export let blackpool: Holiday = {
    location: "Blackpool",
    duration: 2,
    allExpenses: false,
}

let granCanaria: Holiday = {
    location: "Gran Canaria",
    duration: 5,
    allExpenses: true
}

let mondayFirstPrize: MondayPrize = {
    kind: "MainPrize",
    arg1: blackpool,
}

let mondayBestDressed: MondayPrize = {
    kind: "Award",
    arg1: "Best Dressed",
    arg2: 100
}

let mondayWorstDressed: MondayPrize = {
    kind: "Award",
    arg1: "Worst Dressed",
    arg2: 10
}

let wednesdayFirstPrize: WednesdayPrize = {
    kind: "MainPrize",
    arg1: { kind: "Diamond" }
}

let wednesdaySecondPrize: WednesdayPrize = {
    kind: "MainPrize",
    arg1: { kind: "Ruby" }
}

let wednesdayFunniestHat: WednesdayPrize = {
    kind: "Award",
    arg1: "Funniest Hat",
    arg2: 25
}

let fridayFirstPrize: FridayPrize = {
    kind: "MainPrize",
    arg1: { kind: "Car", arg1: 1964, arg2: "AstonMartin", arg3: "DB5" }
}

let fridayKindestPerson: FridayPrize = {
    kind: "Award",
    arg1: "Kindest Person",
    arg2: granCanaria
}

// -------------------------------------------------

function asExpected(name: string, decodeFunc, expectedResult, inputString) {
    console.log("----")
    console.log(name)
    console.log("----")
    let decodedPrize = decodeFunc(JSON.parse(inputString))
    console.log("Decoded:")
    console.log(decodedPrize)
    console.log("Original:")
    console.log(expectedResult)
    console.log(`Matches: ${decodedPrize == expectedResult}`)
    console.log("")
    console.log("")
}

asExpected(
    "MondayFirstPrize", decodeMondayPrize, mondayFirstPrize,
    ` [ "MainPrize", { "location": "Blackpool", "duration": 2, "allExpenses": false } ] `
)

asExpected(
    "MondayBestDressed", decodeMondayPrize, mondayBestDressed,
    `[ "Award", "Best Dressed", 100 ]`
)

asExpected(
    "MondayWorstDressed", decodeMondayPrize, mondayWorstDressed,
    `[ "Award", "Worst Dressed", 10 ]`
)

asExpected(
    "WednesdayFirstPrize", decodeWednesdayPrize, wednesdayFirstPrize,
    `[ "MainPrize", "Diamond" ]`
)

asExpected(
    "WednesdaySecondPrize", decodeWednesdayPrize, wednesdaySecondPrize,
    `[ "MainPrize", "Ruby" ]`
)

asExpected(
    "WednesdayFunniestHat", decodeWednesdayPrize, wednesdayFunniestHat,
    `[ "Award", "Funniest Hat", 25 ]`
)

asExpected(
    "FridayFunniestHat", decodeFridayPrize, fridayFirstPrize,
    `[ "MainPrize", [ "Car", 1964, "AstonMartin", "DB5" ] ]`
)

asExpected(
    "FridayKindestPerson", decodeFridayPrize, fridayKindestPerson,
    `[ "Award", "Kindest Person", { "location": "Gran Canaria", "duration": 5, "allExpenses": true } ]`
)
