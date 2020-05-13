import {Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import {PDevice, Status} from '../../models';

@Injectable()
export class DeviceService {
    devices: PDevice[] = [];

    getAllDevices() {
        return [...this.devices];
    }

    getDevice(uid: number): PDevice {
        const Device = this.findDevice(uid)[0];
        return {...Device};
    }

    addDevice(uid: number, vendor: string, createdDate: Date, status: Status) {
        const newDevice = {
            uid,
            vendor,
            createdDate,
            status,
        };
        const duplicated = this.devices.find(x => x.uid === uid);
        if (duplicated) {
            throw new ConflictException('The device already exist');
        }
        this.devices.push(newDevice);
        return uid;
    }

    updateDevice(uid: number, vendor: string, createdDate: Date, status: Status) {
        const [device, deviceIndex] = this.findDevice(uid);
        const updatedDevice = {...device};
        if (vendor) {
            updatedDevice.vendor = vendor;
        }
        if (createdDate) {
            updatedDevice.createdDate = createdDate;
        }
        if (status) {
            updatedDevice.status = status;
        }
        this.devices[deviceIndex] = updatedDevice;
    }

    deleteDevice(uid: number) {
        const deviceIndex = this.findDevice(uid)[1];
        this.devices.splice(deviceIndex, 1);
    }

    private findDevice(uid: number): [PDevice, number] {
        const deviceIndex = this.devices.findIndex(x => x.uid === uid);
        const device = this.devices[deviceIndex];
        if (!device) {
            throw new NotFoundException('Could not find this device');
        }
        return [device, deviceIndex];
    }
}
