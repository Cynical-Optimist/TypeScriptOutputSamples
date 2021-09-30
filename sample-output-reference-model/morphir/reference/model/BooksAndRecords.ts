// Generated by morphir-elm



export namespace Morphir_Reference_Model_BooksAndRecords {
  
  export type Deal = {
    Product: Morphir_Reference_Model_BooksAndRecords.ProductID;
    Price: Morphir_Reference_Model_BooksAndRecords.Price;
    Quantity: Morphir_Reference_Model_BooksAndRecords.Quantity;
  }
  
  
  export type DealCmd = CloseDeal | OpenDeal
  
  export interface CloseDeal {
    kind: "CloseDeal";
    arg1: Morphir_Reference_Model_BooksAndRecords.ProductID;
  }
  
  export interface OpenDeal {
    kind: "OpenDeal";
    arg1: Morphir_Reference_Model_BooksAndRecords.ProductID;
    arg2: Morphir_Reference_Model_BooksAndRecords.Price;
    arg3: Morphir_Reference_Model_BooksAndRecords.Quantity;
  }
  
  
  export type DealEvent = DealClosed | DealNotFound | DealOpened | DuplicateDeal | InvalidPrice | InvalidQuantity
  
  export interface DealClosed {
    kind: "DealClosed";
    arg1: Morphir_Reference_Model_BooksAndRecords.ProductID;
  }
  
  export interface DealNotFound {
    kind: "DealNotFound";
    arg1: Morphir_Reference_Model_BooksAndRecords.ProductID;
  }
  
  export interface DealOpened {
    kind: "DealOpened";
    arg1: Morphir_Reference_Model_BooksAndRecords.ProductID;
    arg2: Morphir_Reference_Model_BooksAndRecords.Price;
    arg3: Morphir_Reference_Model_BooksAndRecords.Quantity;
  }
  
  export interface DuplicateDeal {
    kind: "DuplicateDeal";
    arg1: Morphir_Reference_Model_BooksAndRecords.ProductID;
  }
  
  export interface InvalidPrice {
    kind: "InvalidPrice";
    arg1: Morphir_Reference_Model_BooksAndRecords.Price;
  }
  
  export interface InvalidQuantity {
    kind: "InvalidQuantity";
    arg1: Morphir_Reference_Model_BooksAndRecords.Quantity;
  }
  
  
  export type ID = string
  
  
  export type Inventory = {
    Supplier: Morphir_Reference_Model_BooksAndRecords.SupplierID;
    Product: Morphir_Reference_Model_BooksAndRecords.ProductID;
    Quantity: Morphir_Reference_Model_BooksAndRecords.Quantity;
  }
  
  
  export type Position = {
    Product: Morphir_Reference_Model_BooksAndRecords.ProductID;
    Quantity: Morphir_Reference_Model_BooksAndRecords.Quantity;
  }
  
  
  export type Price = number
  
  
  export type ProductID = string
  
  
  export type Quantity = number
  
  
  export type SupplierID = string
  
}

