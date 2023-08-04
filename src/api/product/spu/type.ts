// 服务器返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据类型
export interface SpuData {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SpuSaleAttr[]
  spuImageList: null | SpuImage[]
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

export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}
// 所有品牌数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: TradeMark[]
}

// 商品图片数据类型
export interface SpuImage {
  id: number
  createTime?: string
  updateTime?: string
  spuId: number
  imgName: string
  imgUrl?: string
}
// 商品图片数据类型
export interface SpuImageResponseData  extends ResponseData{
  data: SpuImage[]
}

// 已有spu销售属性值数据类型
export interface SpuSaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName?: string
  isChecked?: null
}
// 销售属性对象数据类型
export interface SpuSaleAttr {
  id?: number | string
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  spuSaleAttrValueList: SpuSaleAttrValue[]
}
// 已有spu销售属性接口数据类型
export interface SpuSaleAttrResponseData extends ResponseData {
  data: SpuSaleAttr[]
}

// 所有销售属性数据类型
export interface SaleAttr {
  id: number
  name: string
}
// 所有销售属性接口数据类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}