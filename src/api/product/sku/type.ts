// 服务器返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SkuAttrValue {
  attrId: number | string
  valueId: number | string
}
export interface SkuSaleAttrValue {
  saleAttrId: number | string
  saleValueId: number | string
}
// 定义SKU对象的数据类型
export interface SkuData {
  id?: number | string
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuAttrValueList: SkuAttrValue[]
  skuSaleAttrValueList: SkuSaleAttrValue[]
  skuDefaultImg: string,
  isSale?: number | string
}
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}