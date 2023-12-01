import { prisma } from "../../db/mysql";
import { GetVideoDto } from "../../dtos";
import { STATUS_CODE } from "../../enums";
import { getRandomVideo } from "../../helper";
import { ResponseHttp } from "../../interfaces";
import { IVideo } from "./IVideo";

export class BVideo implements IVideo {
    public async getVideo(): Promise<ResponseHttp<GetVideoDto>> {
        try {
            const videos = await prisma.vIDEO.findMany({
                where: {
                    VID_STATUS: 1
                }
            });

            const videoRandom = getRandomVideo(videos.map(({ VID_ID, VID_URL, VID_STATUS })=> ({ id: VID_ID, url: VID_URL, status: VID_STATUS })));

            return {
                status: STATUS_CODE.OK,
                data: GetVideoDto.create(videoRandom)
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