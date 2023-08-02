export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有品牌接口类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
// 包含所有品牌数据的类型
export type Records = TradeMark[]

export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    pages: number
    current: number
    searchCount: boolean
  }
}
