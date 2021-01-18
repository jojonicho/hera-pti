import { useState, useEffect } from 'react'

import { updateUserRoleApi } from 'services/user'

export function useUserData(user) {
  const [userData, setUserData] = useState({
    affiliation: user.affiliation,
    is_admin: user.is_admin,
    is_superadmin: user.is_superadmin,
  })

  const changeToAdmin = async () => {
    const payload = {
      is_admin: !userData.is_admin,
      is_superadmin: false,
    }
    updateUserRoleApi(user.id, payload)
    setUserData({
      ...userData,
      ...payload,
    })
  }

  const changeToSuperAdmin = async () => {
    const payload = {
      is_admin: !userData.is_superadmin,
      is_superadmin: !userData.is_superadmin,
    }
    updateUserRoleApi(user.id, payload)
    setUserData({
      ...userData,
      ...payload,
    })
  }

  useEffect(() => {
    setUserData(user)
  }, [user])

  return [userData, changeToAdmin, changeToSuperAdmin]
}
