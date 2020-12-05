import { useState } from 'react'

export function useUserData(user) {
  const [userData, setUserData] = useState({
    affiliation: user.affiliation,
    is_admin: user.is_admin,
    is_superadmin: user.is_superadmin,
  })

  const changeToAdmin = () =>
    setUserData({
      ...userData,
      is_admin: !userData.is_admin,
      is_superadmin: false,
    })

  const changeToSuperAdmin = () => {
    setUserData({
      ...userData,
      is_admin: !userData.is_superadmin,
      is_superadmin: !userData.is_superadmin,
    })
  }

  return [userData, changeToAdmin, changeToSuperAdmin]
}
