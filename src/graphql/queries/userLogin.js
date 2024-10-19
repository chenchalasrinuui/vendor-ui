import { gql } from '@apollo/client'
export const USER_LOGIN = gql`
query Query($data: userInput) {
  handleLogin(data: $data)
}
`;