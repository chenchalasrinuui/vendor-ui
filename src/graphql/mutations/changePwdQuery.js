import { gql } from '@apollo/client'
export const CHANGE_PWD = gql`
mutation ChangePassword($pwd: String, $newPwd: String, $changePasswordId: String) {
  changePassword(pwd: $pwd, newPwd: $newPwd, id: $changePasswordId)
}
`;