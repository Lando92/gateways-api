export interface PDevice {
  uid: number;
  vendor: string;
  createdDate: Date;
  status: Solution;
}

export enum Solution {
  Offline = 0,
  Online = 1,
}
