import NotFoundPage from "./pages/NotFoundPage";
import SearchResultPage from "./pages/notes/SearchResultPage";
import ReleaseTagsPage from "./pages/releasetags/ReleaseTagsPage";

interface IRouter {
    path: string;
    element: JSX.Element;
}

const router: IRouter[] = [
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/",
        element: <ReleaseTagsPage />,
    },
    {
        path: "/posts",
        element: <SearchResultPage />,
    },
];

export default router;
