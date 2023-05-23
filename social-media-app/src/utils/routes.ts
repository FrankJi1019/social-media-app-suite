export const isRouteMatch = (template: string, route: string) => {
  const paramRegex = /:([a-zA-Z0-9]+)/g
  const regexString = template.replaceAll(paramRegex, "[a-zA-Z0-9]+")
  const regex = new RegExp(regexString)
  return regex.test(route)
}
