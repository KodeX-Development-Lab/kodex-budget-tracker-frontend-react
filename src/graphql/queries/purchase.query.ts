import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { graphqlClient } from '../client'

export const GET_SUPPLIERS = gql`
  query Suppliers {
    suppliers {
      id
      name
      contactPerson
      phone
      email
      address
    }
  }
`
export const GET_ALL_PURCHASE = gql`
  query {
    purchaseOrders {
      id
      supplier {
        name
      }
      purchaseDate
      invoiceNumber
      reference
      purchaseStatus
      paymentStatus
      shippingFee
      totalDiscount
      totalTax
      grandTotal
      note
      attachment
      createdBy {
        name
      }
      items {
        id
        product {
          id
          productName
          images
        }
      }
      createdAt
    }
  }
`
export const GET_PURCHASE = gql`
  query GetPurchaseOrder($id: Int!) {
    purchaseOrder(id: $id) {
      id
      supplier {
        name
        id
      }
      purchaseDate
      invoiceNumber
      reference
      purchaseStatus
      paymentStatus
      shippingFee
      totalDiscount
      totalTax
      grandTotal
      note
      attachment
      createdBy {
        name
      }
      items {
        id
        quantity
        unitPrice
        subTotal
        product {
          id
          productName
          images
        }
      }
      createdAt
    }
  }
`

export const GET_PO_CODE = gql`
  query {
    createPoCode {
      code
    }
  }
`

export type Supplier = {
  id: number
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
}

export type Purchase = {
  id: number
  supplier: {
    name: string
    id: number
  }
  purchaseDate: Date
  invoiceNumber: string
  reference: string
  purchaseStatus: number | undefined
  paymentStatus: number | undefined
  shippingFee: number
  totalDiscount: number
  totalTax: number
  grandTotal: number
  note: string | null
  attachment: string | null
  createdBy: {
    name: string
  }
  items: {
    id: number
    product: {
      id: number
      productName: string
      images: string
    }
  }[]
  createdAt: string
}

type GetPurchaseResponse = {
  purchaseOrders: Purchase[]
}

type GetSuppliersResponse = {
  suppliers: Supplier[]
}

export const useGetAllSuppliers = () => {
  return useQuery<GetSuppliersResponse>({
    queryKey: ['suppliers'],
    queryFn: async () => {
      return graphqlClient.request<GetSuppliersResponse>(GET_SUPPLIERS)
    },
  })
}

export const useGetAllPurchases = () => {
  return useQuery<GetPurchaseResponse>({
    queryKey: ['purchases'],
    queryFn: async () => {
      return graphqlClient.request<GetPurchaseResponse>(GET_ALL_PURCHASE)
    },
  })
}

export const useGetPoCode = (id: number) => {
  return useQuery<string>({
    queryKey: [],
    queryFn: async () => {
      const res = await graphqlClient.request<string>(GET_PO_CODE)
      // @ts-ignore
      return res?.createPoCode?.code
    },
    enabled: !id,
  })
}

export const useGetPurchase = (id: number) => {
  return useQuery<Purchase>({
    queryKey: ['purchases', id],
    queryFn: async () => {
      const response = await graphqlClient.request<{
        purchaseDetail: Purchase
      }>(GET_PURCHASE, { id })
      // @ts-ignore
      return response.purchaseOrder
    },
    enabled: !!id,
  })
}
