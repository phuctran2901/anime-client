import Home from '../pages/Home';
import Info from '../pages/Info';
import Genres from '../pages/Genres';
import Rank from '../pages/Rank';

export const routers = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/xem-phim/:anime",
        exact: true,
        component: Info
    },
    {
        path: "/anime/:genres",
        exact: true,
        component: Genres
    },
    {
        path: "/rank/:slug",
        exact: true,
        component: Rank
    },

]