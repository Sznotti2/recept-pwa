import { ResolveFn } from "@angular/router";

export const titleResolver : ResolveFn<string> = (route) => {
    return route.params["slug"]
        .replace(/-/g, ' ')
        .replace(/^\w/, (c: string) => c.toUpperCase());
}
