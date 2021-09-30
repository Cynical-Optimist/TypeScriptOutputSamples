// Generated by morphir-elm



export namespace Morphir_IR_Literal {
  /* Type that represents a literal value.
  */
  export type Literal = BoolLiteral | CharLiteral | FloatLiteral | StringLiteral | WholeNumberLiteral
  
  export interface BoolLiteral {
    kind: "BoolLiteral";
    arg1: boolean;
  }
  
  export interface CharLiteral {
    kind: "CharLiteral";
    arg1: string;
  }
  
  export interface FloatLiteral {
    kind: "FloatLiteral";
    arg1: number;
  }
  
  export interface StringLiteral {
    kind: "StringLiteral";
    arg1: string;
  }
  
  export interface WholeNumberLiteral {
    kind: "WholeNumberLiteral";
    arg1: number;
  }
  
}

