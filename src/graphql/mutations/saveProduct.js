import { gql } from "@apollo/client";

export const SAVE_PRODUCT = gql`
mutation SaveProduct($file: Upload, $productInput: ProductInput) {
  saveProduct(file: $file, productInput: $productInput)
}
`