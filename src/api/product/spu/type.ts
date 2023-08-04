// 服务器返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null
  spuImageList: null
}

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SpuData[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}