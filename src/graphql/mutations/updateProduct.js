import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($file: Upload, $productInput: UpdateProductInput) {
  updateProduct(file: $file, productInput: $productInput)
}
`