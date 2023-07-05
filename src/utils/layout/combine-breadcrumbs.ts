import {BreadcrumbProps} from "antd";
import {Route} from "antd/es/breadcrumb/Breadcrumb";

const combineBreadcrumbs = (base: BreadcrumbProps, additional?: BreadcrumbProps) => {
    let routes: Route[] = [];
    if (base.routes) routes = base.routes;
    if (additional?.routes) routes = [ ...routes, ...additional.routes ]
    return {
        ...base,
        ...additional,
        routes
    }
}

export default combineBreadcrumbs;
