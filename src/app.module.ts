import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {GatewayModule} from './controllers/gateway/gateway.module';
import {DeviceModule} from './controllers/device/device.module';
import {NotificationsModule} from './controllers/notifications/notifications.module';

@Module({
    imports: [GatewayModule, DeviceModule, NotificationsModule],
    controllers: [],
    providers: [AppService],
})
export class AppModule {
}
