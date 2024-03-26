import React, { Suspense } from "react";

const Home = React.lazy(() => import("./home"));

const Page =
  (Component) =>
  (props) => {
    return (
      <Suspense fallback={<div></div>}>
          <Component {...props} />
      </Suspense>
    );
  };

const pages = {
  home: {
    component: Page(Home),
    accessRoles: [],
    path: ["/admin/home","/"],
    exact: true,
  },
};

export {
  pages,
};
