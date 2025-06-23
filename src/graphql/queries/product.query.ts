import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { graphqlClient } from '../client'

export const GET_ALL_ENUMS = gql`
  query {
    purchaseOrderStatuses {
      id
      name
    }
    status {
      id
      name
    }
    paymentMethods {
      id
      name
    }
    purchasePaymentStatuses {
      name
      id
    }
  }
`

export const GET_PRODUCTS = gql`
  query Products($brandId: Int, $productName: String) {
    products(brandId: $brandId, productName: $productName) {
      id
      productName
      productCode
      costPrice
      salePrice
      reorderLevel
      stockQuantity
      description
      brand {
        id
        brandName
      }
      category {
        id
        categoryName
      }
      unit {
        id
        unitName
      }
      images
    }
  }
`

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      categoryName
      categoryCode
      description
      categoryImage
      status
    }
  }
`

export const GET_BRANDS = gql`
  query Brands {
    brands {
      brandName
      brandCode
      description
      id
      status
      brandLogo
    }
  }
`

export const GET_UNITS = gql`
  query Units {
    units {
      id
      unitName
      unitSymbol
      status
    }
  }
`

export type Category = {
  id: number
  categoryName: string
  categoryCode: string
}

export type Brand = {
  id: number
  brandName: string
  brandCode: string
  description: string
  brandLogo: string
  status: 'Active' | 'Inactive'
}

export type Unit = {
  id: number
  unitName: string
  unitSymbol: string
  status: 'Active' | 'Inactive'
}

export type Product = {
  id: number
  productName: string
  productCode: string
  costPrice: number
  salePrice: number
  reorderLevel: number
  stockQuantity: number
  description: string
  brand: {
    id: number
    brandName: string
  }
  category: {
    id: number
    categoryName: string
  }
  unit: {
    id: number
    unitName: string
  }
  images: string
}

type GetProductsResponse = {
  products: Product[]
}

type GetCategoriesResponse = {
  categories: Category[]
}

type GetBrandsResponse = {
  brands: Brand[]
}

type GetUnitsResponse = {
  units: Unit[]
}

export type Enum = {
  id: number
  name: string
}

export type GetEnumsResponse = {
  purchaseOrderStatuses: Enum[]
  status: Enum[]
  paymentMethods: Enum[]
  purchasePaymentStatuses: Enum[]
}

export const useGetAllProducts = (variables?: {
  brandId?: number
  categoryId?: number
}) => {
  return useQuery<GetProductsResponse>({
    queryKey: ['products', variables],
    queryFn: async () => {
      return graphqlClient.request<GetProductsResponse>(GET_PRODUCTS, variables)
    },
  })
}

export const useGetAllCategories = () => {
  return useQuery<GetCategoriesResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      return graphqlClient.request<GetCategoriesResponse>(GET_CATEGORIES)
    },
  })
}

export const useGetAllBrands = () => {
  return useQuery<GetBrandsResponse>({
    queryKey: ['brands'],
    queryFn: async () => {
      return graphqlClient.request<GetBrandsResponse>(GET_BRANDS)
    },
  })
}

export const useGetAllUnits = () => {
  return useQuery<GetUnitsResponse>({
    queryKey: ['units'],
    queryFn: async () => {
      return graphqlClient.request<GetUnitsResponse>(GET_UNITS)
    },
  })
}

export const useGetAllEnums = () => {
  return useQuery<GetEnumsResponse>({
    queryKey: ['enums'],
    queryFn: async () => {
      return graphqlClient.request<GetEnumsResponse>(GET_ALL_ENUMS)
    },
  })
}
