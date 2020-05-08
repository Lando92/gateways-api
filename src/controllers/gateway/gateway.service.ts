import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {Gateway, PDevice} from '../../models';

@Injectable()
export class GatewayService {
    gateways: Gateway[] = [];

    getAllGateways() {
        return [...this.gateways];
    }

    getGateway(id: string): Gateway {
        const gateway = this.findGateway(id)[0];
        return {...gateway};
    }

    addGateway(displayName: string, ipv4Address: string, pdevices: PDevice[]) {
        const id = new Date().getTime().toString();
        if (pdevices.length > 10) {
            throw new HttpException('No more that 10 peripheral devices are allowed for a gateway', 500);
        }
        const newGateway = {
            id,
            displayName,
            ipv4_address: ipv4Address,
            p_devices: pdevices,
        };
        this.gateways.push(newGateway);
        return id;
    }

    updateGateway(id: string, displayName: string, ipv4Address: string, pdevices: PDevice[]) {
        const [gateway, gatewayIndex] = this.findGateway(id);
        const updatedGateway = {...gateway};
        if (displayName) {
            updatedGateway.displayName = displayName;
        }
        if (ipv4Address) {
            updatedGateway.ipv4_address = ipv4Address;
        }
        if (pdevices) {
            if (pdevices.length > 10) {
                throw new HttpException('No more that 10 peripheral devices are allowed for a gateway', 500);
            }
            updatedGateway.p_devices = pdevices;
        }
        this.gateways[gatewayIndex] = updatedGateway;
    }

    deleteGateway(id: string) {
        const gatewayIndex = this.findGateway(id)[1];
        this.gateways.splice(gatewayIndex, 1);
    }

    private findGateway(id: string): [Gateway, number] {
        const gatewayIndex = this.gateways.findIndex(x => x.id === id);
        const gateway = this.gateways[gatewayIndex];
        if (!gateway) {
            throw new NotFoundException('Could not find this gateway');
        }
        return [gateway, gatewayIndex];
    }
}
