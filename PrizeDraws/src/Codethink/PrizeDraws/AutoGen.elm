module Codethink.PrizeDraws.AutoGen exposing (..)


type GemStone
    = Opal
    | Ruby
    | Emerald
    | Diamond
    | Topaz
    | Saphire


type alias Holiday =
    { location : String
    , duration : Int -- Days
    , allExpenses : Bool
    }


type Car
    = Car Int String String -- Year, make, model


type alias Cash =
    Int


type Prize mainPrizeType awardType
    = MainPrize mainPrizeType
    | Award String awardType
