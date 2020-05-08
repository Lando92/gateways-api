import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {GatewayModule} from './controllers/gateway/gateway.module';
import {DeviceModule} from './controllers/device/device.module';

@Module({
    imports: [GatewayModule, DeviceModule],
    controllers: [],
    providers: [AppService],
})
export class AppModule {
}
