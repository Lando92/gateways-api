import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {Status} from '../../models';
import {DeviceService} from './device.service';

@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService) {
    }

    @Get()
    getAllDevices(): any {
        return this.deviceService.getAllDevices();
    }

    @Get(':uid')
    getDevices(@Param('uid')uid: number): any {
        return this.deviceService.getDevice(uid);
    }

    @Post()
    addDevice(
        @Body('uid') uid: number,
        @Body('vendor') vendor: string,
        @Body('createdDate') createdDate: Date,
        @Body('status') status: Status) {
        const genId = this.deviceService.addDevice(uid, vendor, createdDate, status);
        return {genId};
    }

    @Patch(':uid')
    updateDevice(
        @Param('uid') uid: number,
        @Body('vendor') vendor: string,
        @Body('createdDate') createdDate: Date,
        @Body('status') status: Status) {
        this.deviceService.updateDevice(uid, vendor, createdDate, status);
        return null;
    }

    @Delete(':uid')
    deleteDevice(
        @Param('uid') uid: number) {
        this.deviceService.deleteDevice(uid);
        return null;
    }
}
