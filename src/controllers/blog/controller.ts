import { Request, Response } from "express"
import { IBlog } from "../../business"

export class BlogController {

    constructor(
        private readonly blog: IBlog
    ){}

    getBlogs = (req: Request, res: Response) => {
        const { year, categorieId } = req.params;

        this.blog.getBlogs(Number(year), Number(categorieId))
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error))
    }

    getBlogById = (req: Request, res: Response) => {

        const { id } = req.params;

        this.blog.getBlog(Number(id))
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error))
    }
}

