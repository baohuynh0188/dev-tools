import ReleaseTagsPage from "./pages/releasetags/ReleaseTagsPage";
import HomePage from "./pages/sharemoney/HomePage";
import SplitBillPage from "./pages/sharemoney/SplitBillPage";

interface IRouter {
    path: string;
    element: JSX.Element;
  }
  
  const router: IRouter[] = [
    // {
    //   path: '*',
    //   element: <NotFoundPage />,
    // },
    {
      path: '/',
      element: <ReleaseTagsPage />,
    },
    {
      path: '/share-money',
      element: <HomePage />,
    },
    {
      path: '/share-money/bill/:id',
      element: <SplitBillPage />,
    },
  ];
  
  export default router;