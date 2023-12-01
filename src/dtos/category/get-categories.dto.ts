export class GetCategoryDto {
    private constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly years: number[]
    ){}

    public static create(object: { [key: string]: any }): GetCategoryDto {
        const { id, name, years } = object;
        return new GetCategoryDto(id, name, years );
    }
}