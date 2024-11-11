import { gql } from "@apollo/client";

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($data: deleteInput) {
  deleteProduct(data: $data)
}
`