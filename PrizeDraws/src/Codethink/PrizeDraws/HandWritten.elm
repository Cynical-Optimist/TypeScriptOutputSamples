module Codethink.PrizeDraws.HandWritten exposing (..)

import Codethink.PrizeDraws.AutoGen exposing (..)


type alias MondayPrize =
    Prize Holiday Cash


type alias WednesdayPrize =
    Prize GemStone Cash


type alias FridayPrize =
    Prize Car Holiday


blackpool : Holiday
blackpool =
    { location = "Blackpool"
    , duration = 2
    , allExpenses = False
    }


granCanaria : Holiday
granCanaria =
    { location = "Gran Canaria"
    , duration = 5
    , allExpenses = True
    }


mondayFirstPrize : MondayPrize
mondayFirstPrize =
    MainPrize blackpool


mondayBestDressed : MondayPrize
mondayBestDressed =
    Award "Best Dressed" 100


mondayWorstDressed : MondayPrize
mondayWorstDressed =
    Award "Worst Dressed" 10


wednesdayFirstPrize : WednesdayPrize
wednesdayFirstPrize =
    MainPrize Diamond


wednesdaySecondPrize : WednesdayPrize
wednesdaySecondPrize =
    MainPrize Ruby


wednedayFunniestHat : WednesdayPrize
wednedayFunniestHat =
    Award "Funniest Hat" 25


fridayFirstPrize : FridayPrize
fridayFirstPrize =
    MainPrize (Car 1964 "Aston Martin" "DB5")


fridayKindestPerson : FridayPrize
fridayKindestPerson =
    Award "Kindest Person" granCanaria
