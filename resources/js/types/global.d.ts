import { AxiosInstance } from 'axios';
// import { route as ziggyRoute } from 'ziggy-js';
import {route as ziggyRoute} from "../types/ziggy/src/js/index"

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}
