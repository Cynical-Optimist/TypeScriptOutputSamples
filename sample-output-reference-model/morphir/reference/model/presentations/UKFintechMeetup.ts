// Generated by morphir-elm



export namespace Morphir_Reference_Model_Presentations_UKFintechMeetup {
  
  export type Response = Rejected | Reserved
  
  export interface Rejected {
    kind: "Rejected";
  }
  
  export interface Reserved {
    kind: "Reserved";
    arg1: number;
  }
  
}

