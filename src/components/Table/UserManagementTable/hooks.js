import { useState, useEffect } from 'react'

import { updateUserRoleApi } from 'services/user'

export function useUserData(user) {
  const [userData, setUserData] = useState({
    affiliation: user.affiliation ? user.affiliation.id : '',
    is_admin: user.is_admin,
    is_superadmin: user.is_superadmin,
  })

  const updateData = async payload => {
    updateUserRoleApi(user.id, payload)
    setUserData({
      ...userData,
      ...payload,
    })
  }

  const changeAffiliation = async affiliation_id => {
    updateData({
      affiliation: affiliation_id,
    })
  }

  const changeToAdmin = async () => {
    updateData({
      is_admin: !userData.is_admin,
      is_superadmin: false,
    })
  }

  const changeToSuperAdmin = async () => {
    updateData({
      is_admin: !userData.is_superadmin,
      is_superadmin: !userData.is_superadmin,
    })
  }

  useEffect(() => {
    setUserData({
      affiliation: user.affiliation ? user.affiliation.id : '',
      is_admin: user.is_admin,
      is_superadmin: user.is_superadmin,
    })
  }, [user])

  return {
    userData,
    changeToAdmin,
    changeToSuperAdmin,
    changeAffiliation,
  }
}
