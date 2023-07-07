import { HttpStatus, Injectable } from "@nestjs/common";
import { PayloadDto } from "src/dto/response/payload.dto";
import { ResponseDto } from "src/dto/response/response.dto";

@Injectable()
export class ResponseService {

    async toDtoResponse<T>(
        status: HttpStatus,
        message: string,
        data: T,
      ): Promise<ResponseDto> {
        const apiData = await data;
        const available = apiData ? 1 : 0;
        const payload = new PayloadDto(available, apiData);
        return new ResponseDto(
          new Date().getTime(),
          status,
          message,
          null,
          payload,
        );
      }

      async toDtosResponse<T>(
        status: HttpStatus,
        message: string,
        data: T[],
      ): Promise<ResponseDto> {
        const apiData = await data;
        const count = apiData instanceof Array ? apiData.length : 0;
        const payload = new PayloadDto(count, apiData);
        return new ResponseDto(
          new Date().getTime(),
          status,
          message,
          null,
          payload,
        );
      }
}