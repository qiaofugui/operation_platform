// 分类相关数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
}

export interface AttrValueList {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}

export interface AttrResponseData extends ResponseData {
  data: AttrValueList
}