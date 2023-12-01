export class GetBlogDto {
    private constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description?: string,
        public readonly content?: string,
        public readonly imageUrl1?: string,
        public readonly imageUrl2?: string,
        public readonly day?: number,
        public readonly month?: number,
    ){}

    public static create(object: { [key: string]: any }): GetBlogDto {
        const { id, title, description, content, imageUrl1, imageUrl2, day, month } = object;
        return new GetBlogDto(id, title, description, content, imageUrl1, imageUrl2, day, month);
    }
}