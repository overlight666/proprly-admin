export const getRoleId = (roles: any, roleKey: any) => {
    return roles?.find((role: any) => role?.roleKey === roleKey)?.id
}