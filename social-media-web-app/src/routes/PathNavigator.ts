import { generatePath } from "react-router-dom"

export class PathNavigator {
  constructor(public readonly path: string) {}

  public generate(pathParams: { [key: string]: any }): string {
    return generatePath(this.path, pathParams)
  }
}
