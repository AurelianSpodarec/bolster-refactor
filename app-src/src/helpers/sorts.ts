export function sortByDate(aCreatedOn: string, bCreatedOn: string) {
    return new Date(bCreatedOn).getTime() - new Date(aCreatedOn).getTime();
}