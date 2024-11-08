import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
query Query {
  getProducts {
        name
        cost
        category
        description
        filePath
    }
}

`