import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {GatewayService} from './gateway.service';
import {Gateway, PDevice} from '../../models';

@Controller('gateway')
export class GatewayController {
    constructor(private gatewayService: GatewayService) {
    }

    @Get()
    getAllGateways(): any {
        return this.gatewayService.getAllGateways();
    }

    @Get(':id')
    getGateways(@Param('id')id: string): any {
        return this.gatewayService.getGateway(id);
    }

    @Post()
    addGateway(
        @Body('displayName') displayName: string,
        @Body('ipv4_address') ipv4Address: string,
        @Body('p_devices') pDevices: PDevice[]) {
        const genId = this.gatewayService.addGateway(displayName, ipv4Address, pDevices);
        return {genId};
    }

    @Patch(':id')
    updateGateway(
        @Param('id') id: string,
        @Body('displayName') displayName: string,
        @Body('ipv4_address') ipv4Address: string,
        @Body('p_devices') pDevices: PDevice[]) {
        this.gatewayService.updateGateway(id, displayName, ipv4Address, pDevices);
        return null;
    }

    @Delete(':id')
    deleteGateway(
        @Param('id') id: string) {
        this.gatewayService.deleteGateway(id);
        return null;
    }
}
