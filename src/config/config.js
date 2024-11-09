import { addressList } from "./address_list.js";

export class Config {
  static sendAmount = 0.00001; //amount to send in sol
  static destAddress = addressList; //address destination list
  static maxRetry = 3; // max error retry for claiming
}
