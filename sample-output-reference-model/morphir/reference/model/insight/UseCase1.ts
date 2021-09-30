// Generated by morphir-elm



export namespace Morphir_Reference_Model_Insight_UseCase1 {
  
  export type Direction = Down | Up
  
  export interface Down {
    kind: "Down";
  }
  
  export interface Up {
    kind: "Up";
  }
  
  
  export type TrackingAdvantage = {
    Direction: Morphir_Reference_Model_Insight_UseCase1.Direction;
    Code: string;
    Velocity: number;
  }
  
}
