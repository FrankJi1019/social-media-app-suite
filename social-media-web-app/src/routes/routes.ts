import { PathNavigator } from "./PathNavigator"

export class Routes {
  public static AUTH_PATH = new PathNavigator("/auth")
  public static HOME_PAGE = new PathNavigator("/")
  public static POST_MOMENT_PAGE = new PathNavigator("/post")
  public static MOMENT_DETAIL_PAGE = new PathNavigator("/moments/:id")
  public static FRIEND_PAGE = new PathNavigator("/friends/:friendshipId")
}
