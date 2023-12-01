import { GetBlogDto } from "../../dtos";
import { ResponseHttp } from "../../interfaces";

export interface IBlog {
    getBlogs(year: number, categorieId: number): Promise<ResponseHttp<GetBlogDto[]>>;
    getBlog(blogId: number): Promise<ResponseHttp<GetBlogDto>>;
}