// Generated by morphir-elm

import * as codecs from "./../../../../morphir/internal/Codecs"

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

