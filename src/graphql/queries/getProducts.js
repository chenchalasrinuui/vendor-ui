import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
query Query {
  getProducts {
        _id
        name
        cost
        category
        description
        file
        vendor
    }
}

`