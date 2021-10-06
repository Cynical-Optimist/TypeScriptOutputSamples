// Generated by morphir-elm



export namespace Morphir_Reference_Model_Types {
  
  export type Custom = CustomNoArg | CustomOneArg | CustomTwoArg
  
  export interface CustomNoArg {
    kind: "CustomNoArg";
  }
  
  export interface CustomOneArg {
    kind: "CustomOneArg";
    arg1: boolean;
  }
  
  export interface CustomTwoArg {
    kind: "CustomTwoArg";
    arg1: string;
    arg2: Morphir_Reference_Model_Types.Quantity;
  }
  
  export interface Email {
    kind: "Email";
    arg1: string;
  }
  
  export interface FirstName {
    kind: "FirstName";
    arg1: string;
  }
  
  
  export type FooBarBazRecord = {
    foo: string;
    bar: boolean;
    baz: number;
  }
  
  export interface FullName {
    kind: "FullName";
    arg1: Morphir_Reference_Model_Types.FirstName;
    arg2: Morphir_Reference_Model_Types.LastName;
  }
  
  export interface LastName {
    kind: "LastName";
    arg1: string;
  }
  
  /* Alias referring to another type using a reference.
  */
  export type Quantity = number
  
}

