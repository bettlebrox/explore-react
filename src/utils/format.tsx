export function getFormattedDate(date: string):string{
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
}

export function getBreadcrumbs(path: string | null): string[] {
    const breadcrumbs: string[] = [];
    if(path === null || path === "") return breadcrumbs;
    const pathParts = path.split("/");
    for (let i = 2; i < pathParts.length; i++) {
        breadcrumbs.push(pathParts[i]);
    }
    return breadcrumbs;
}