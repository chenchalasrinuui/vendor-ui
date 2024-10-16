import { gql } from '@apollo/client'
export const SAVE_PRODUCT = gql`
mutation Mutation($productInput: ProductInput) {
  saveProduct(productInput: $productInput)
}
`;