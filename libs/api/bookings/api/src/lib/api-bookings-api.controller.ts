import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

class CreateBookingDto {
    @IsDate()
    @Type(() => Date)
    startsAt: Date;

    @IsDate()
    @Type(() => Date)
    endsAt: Date;
}

@Controller('bookings')
export class ApiBookingsApiController {
    constructor(private bookingService: ApiBookingsRepositoryDataAccessService) { }

    @Get('/desk/:deskId')
    async getBookingsForDesk(@Param('deskId') deskId: string) {
        return await this.bookingService.getBookingsForDesk(Number(deskId));
    }

    @Get('/:bookingId')
    async getBookingById(@Param('bookingId') bookingId: string) {
        return await this.bookingService.getBookingById(Number(bookingId));
    }

    @Get('/desk/current/:deskId')
    async getCurrentBookingsForDesk(@Param('deskId') deskId: string) {
        return await this.bookingService.getCurrentBookingsForDesk(Number(deskId));
    }

    @Delete('/:bookingId')
    async deleteBooking(@Param('bookingId') bookingId: string) {
        return await this.bookingService.deleteBooking(Number(bookingId));
    }

    @Post('/desk/:deskId')
    async createBooking(@Param('deskId') deskId: string, @Body() postData: CreateBookingDto) {
        const { startsAt, endsAt } = postData;
        return await this.bookingService.createBooking({
            startsAt: startsAt,
            endsAt: endsAt,
            Desk: {
                connect: { id: Number(deskId) },
            }
        });
    }

}