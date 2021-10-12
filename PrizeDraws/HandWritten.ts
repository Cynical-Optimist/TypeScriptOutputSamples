import { Codethink } from "./ts-dist/Codethink";

import Prize = Codethink.PrizeDraws.AutoGen.Prize
import Car = Codethink.PrizeDraws.AutoGen.Car
import Cash = Codethink.PrizeDraws.AutoGen.Cash
import GemStone = Codethink.PrizeDraws.AutoGen.GemStone
import Holiday = Codethink.PrizeDraws.AutoGen.Holiday

type MondayPrize = Prize<Holiday, Cash>
type WednesdayPrize = Prize<GemStone, Cash>
type FridayPrize = Prize<Car, Holiday>

let blackpool: Holiday = {
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

let fullPrizeList = {
    "mondayFirstPrize": mondayFirstPrize,
    "mondayBestDressed": mondayBestDressed,
    "mondayWorstDressed": mondayWorstDressed,
    "wednesdayFirstPrize": wednesdayFirstPrize,
    "wednesdaySecondPrize": wednesdaySecondPrize,
    "wednesdayFunniestHat": wednesdayFunniestHat,
    "fridayFirstPrize": fridayFirstPrize,
    "fridayKindestPerson": fridayKindestPerson,
}