export interface IImportCategoryRequest {
  file: Express.Multer.File | undefined
}

export interface IImportCategoryData {
  name: string
  description: string
}