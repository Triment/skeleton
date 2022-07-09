//swr获取用户信息接口
//此部分埋下了c端的effect代码，会导致浏览器本地导航变化
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { UserType } from "../redux/userSlice";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<UserType>("/api/auth/me");

  useEffect(() => {
    /**
     * 不需要重定向，只需返回
     * 数据没准备好，也返回
     */
    
    
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      /**
       * 有重定向&重定向&用户不存在 
       * 或者重定向&&用户 存在
       */
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user ) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && !!user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
