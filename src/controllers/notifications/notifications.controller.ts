import {Body, Controller, Post} from '@nestjs/common';
import {UserSubscription, PDevice, Key} from '../../models';
import {NotificationsService} from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationService: NotificationsService) {
    }

    @Post('subscribe')
    addSubscriber(
        @Body('endpoint') endpoint: string,
        @Body('expirationTime') expirationTime: Date,
        @Body('keys') keys: Key,
    ) {
        const sub: UserSubscription = {
            endpoint,
            expirationTime,
            keys,
        };
        this.notificationService.addPushSubscriber(sub);
    }

    @Post('send')
    sendNewsletter(
        @Body('redirectUrl') redirectUrl: string) {
        this.notificationService.sendNewsletter(redirectUrl);
    }
}
