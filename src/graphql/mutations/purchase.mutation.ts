import { useMutation } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { graphqlClient } from '../client'

const CREATE_PURCHASE_ORDER = gql`
  mutation CreatePurchaseOrder(
    $createPurchaseOrderInput: CreatePurchaseOrderInput!
  ) {
    createPurchaseOrder(createPurchaseOrderInput: $createPurchaseOrderInput) {
      id
      grandTotal
    }
  }
`

const CREATE_SUPPLIER = gql`
  mutation CreateSupplier($createSupplierInput: CreateSupplierInput!) {
    createSupplier(createSupplierInput: $createSupplierInput) {
      id
      name
      # contactPerson
      phone
      email
      address
    }
  }
`

export const useCreatePurchaseOrder = () => {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await graphqlClient.request<any>(CREATE_PURCHASE_ORDER, {
        createPurchaseOrderInput: input,
      })
      return res
    },
  })
}

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await graphqlClient.request<any>(CREATE_SUPPLIER, {
        createSupplierInput: input,
      })
      return res
    },
  })
}
