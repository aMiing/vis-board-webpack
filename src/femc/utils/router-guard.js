function addRouterGuard(router) {
  // 设置code和路由的map对象
  const routes = router.getRoutes();
  const map = {};
  routes.forEach(i => {
    let key = null;
    i.meta.auth && Array.isArray(i.meta.auth)
      ? // 建模，壳是数组
        (key = i.meta.auth.join())
      : // 治理是字符串
        (key = i.meta.auth);
    map[key || i.name] = i.name;
  });
  router.addRoute({
    name: 'redirect',
    path: '/redirect/:_pageCode?',
    beforeEnter: (to, from, next) => {
      const query = to.query.query ? JSON.parse(decodeURIComponent(to.query.query)) : {};
      const { _pageCode } = to.params;
      next({
        name: map[_pageCode],
        params: query.params || {},
        query: query.query || {},
        replace: true,
      });
    },
  });
}

function routeStringify({ code, params = {}, query = {} }) {
  return `redirect/${code}?query=${encodeURIComponent(JSON.stringify({ params, query }))}`;
}

export { routeStringify, addRouterGuard };
