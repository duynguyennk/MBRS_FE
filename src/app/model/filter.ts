export class filter {
    filterName: NonNullable<string>;
    filterValue: NonNullable<string>;

    constructor(filterName: string, filterValue: string) {
        this.filterName = filterName;
        this.filterValue=filterValue;
    }
}