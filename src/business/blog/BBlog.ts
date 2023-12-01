import { prisma } from "../../db/mysql";
import { GetBlogDto } from "../../dtos";
import { STATUS_CODE } from "../../enums";
import { ResponseHttp } from "../../interfaces";
import { IBlog } from "./IBlog";

export class BBlog implements IBlog {

    public async getBlogs(year: number, categorieId: number): Promise<ResponseHttp<GetBlogDto[]>> {

        try {

            const blogs: any[] = await prisma.$queryRaw`
                SELECT B.BLO_ID as id, B.BLO_TITLE as title, B.BLO_DESCRIPTION as description, B.BLO_IMG_URL1 as imageUrl1,
                CB.CATBL_DAY as day, CB.CATBL_MONTH as month
                FROM BLOG AS B INNER JOIN
                CATEGORIE_BLOG AS CB ON B.BLO_ID = CB.CATBL_BLOG
                WHERE CB.CATBL_CATEGORIE = ${categorieId}
                AND CB.CATBL_YEAR = ${year}
                AND B.BLO_STATUS = 1
                ORDER BY CB.CATBL_MONTH, CB.CATBL_DAY
            `;

            if (blogs.length === 0) {
                return {
                    status: STATUS_CODE.NOT_FOUND,
                    error: 'No existen blogs creados'
                }
            }

            return {
                status: STATUS_CODE.OK,
                data: blogs.map(blog => GetBlogDto.create(blog))
            }

        } catch (error) {
            console.log(error);
            throw {
                status: STATUS_CODE.SERVER_INTERNAL,
                error: 'Habla con el administrador'
            }
        }
    }

    public async getBlog(blogId: number): Promise<ResponseHttp<GetBlogDto>> {
        try {
            const blog = await prisma.bLOG.findFirst({
                where: {
                    BLO_ID: blogId,
                    BLO_STATUS: 1
                }
            });
    
            if (!blog) {
                return {
                    status: STATUS_CODE.NOT_FOUND,
                    error: `No existen blog con el id ${blogId}`
                }
            }
    
            const { BLO_ID:id, BLO_TITLE:title, BLO_CONTENT:content, BLO_IMG_URL2:imageUrl2 } = blog;
    
            return {
                status: STATUS_CODE.OK,
                data: GetBlogDto.create({ id, title, content, imageUrl2 })
            }
        } catch (error) {
            console.log(error);
            throw {
                status: STATUS_CODE.SERVER_INTERNAL,
                error: 'Habla con el administrador'
            }
        }
    }

}