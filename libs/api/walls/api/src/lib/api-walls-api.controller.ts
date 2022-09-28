import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiWallsDataAccessService } from '@office-booker/api/walls/data-access';

class CreateWallDto {
    roomId: number;
    Pos1X: number;
    Pos1Y: number;
    Pos2X: number;
    Pos2Y: number;
}

@UseGuards(AuthGuard('jwt'))
@Controller('walls')
export class ApiWallsApiController {
    constructor(private wallService: ApiWallsDataAccessService) {}

    @Get("/room/:roomId")
    async getWallsInRoom(@Param('roomId') roomId: string) {
        return this.wallService.getWallsInRoom(Number(roomId));
    }

    @Get("/wall/:wallId")
    async getWallsById(@Param('wallId') wallId: string) {
        return this.wallService.getWallbyId(Number(wallId));
    }

    @Post("/")
    async createWall(@Body() postData: CreateWallDto) {
        const {roomId, Pos1X, Pos1Y, Pos2X, Pos2Y} = postData;
        return this.wallService.createWall(roomId, Pos1X, Pos1Y, Pos2X, Pos2Y);
    }

    @Delete("/wall/:wallId")
    async deleteWallbyId(@Param('wallId') wallId: string) {
        return this.wallService.deleteWall(Number(wallId));
    }
}
