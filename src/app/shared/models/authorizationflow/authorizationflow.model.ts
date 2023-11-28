import { environment } from "src/environments/environment"
import { GenericObject } from "../general.model"

export interface IDeviceList {
  devicesList?: IDeviceInfo[]
}

export interface IDeviceInfo {
  deviceModel: string,
  deviceName: string,
  deviceNumber: string,
  enrollmentDate: string,
  lastOperationDate: string,
  userState: string
}

export interface IOTPModalData {
  operationData: IOperationAuthInfoRequest,
  scaID: string,
  cb?: any
}

const moduleDomain = ['BFFE_USER_SECURITY', 'BFFE_USER_DATA','BFFE_PRODUCTS', 'BFFE_PAYMENTS', 'BFFE_CARDS'] as const;
export interface IOperationAuthInfoRequest {
  executionTime: number,
  hashData: string,
  uniqueId: string,
  productId?: number,
  /** Aggiunto parametro per discriminare il modulo necessario all'authorization */
  moduleUrl?: typeof moduleDomain[number]
}
export interface IVerifyCredentialsRequest {
  username: string,
  otp?: string,
  bank: string
}
export interface IPostLoginSCARequest extends IVerifyCredentialsRequest {
  scaId?: string
}

export interface IDataModalsAuth {
  action: string,
  scaId?: string,
  credentials?: IVerifyCredentialsRequest
}

export interface IOperationAuthInfoResponse {
  encryptedData?: string,
  scaId?: string
}

export interface IPollingAuthResponse {
  operation_id: string,
  sca_status: string
}
export interface IOTPStatus {
  status: string,
  otp?: string,
  extras?: GenericObject<any>
}
export interface ICheckEnrolledDeviceResponse {
  alias: string,
  devicesList: IDeviceInfo[],
  firstLogin: boolean,
  legalEntity: string,
  name: string,
  ndg: string,
  surname: string,
  username: string
}