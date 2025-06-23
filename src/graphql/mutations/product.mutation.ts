// Adjust the path if needed
import { useMutation } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { graphqlClient } from '../client'

// Your mutation
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      productName
      productCode
      costPrice
      salePrice
      reorderLevel
      stockQuantity
      description
      brandId
      categoryId
      unitId
      images
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      categoryName
      categoryCode
      description
      categoryImage
      status
    }
  }
`

export const CREATE_BRAND = gql`
  mutation CreateBrand($createBrandInput: CreateBrandInput!) {
    createBrand(createBrandInput: $createBrandInput) {
      brandName
      brandCode
      description
      brandLogo
      status
    }
  }
`

export const CREATE_UNIT = gql`
  mutation CreateUnit($createUnitInput: CreateUnitInput!) {
    createUnit(createUnitInput: $createUnitInput) {
      unitName
      unitSymbol
      status
    }
  }
`

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await graphqlClient.request<any>(CREATE_PRODUCT, {
        createProductInput: input,
      })
      return res
    },
  })
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await graphqlClient.request<any>(CREATE_CATEGORY, {
        createCategoryInput: input,
      })
      return res
    },
  })
}

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await graphqlClient.request<any>(CREATE_BRAND, {
        createBrandInput: input,
      })
      return res
    },
  })
}

export const useCreateUnit = () => {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await graphqlClient.request<any>(CREATE_UNIT, {
        createUnitInput: input,
      })
      return res
    },
  })
}
