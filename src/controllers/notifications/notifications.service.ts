import {Injectable} from '@nestjs/common';
import {UserSubscription} from '../../models';
import {USER_SUBSCRIPTIONS} from '../../helpers/in-memory-db';
import * as webpush from 'web-push';

@Injectable()
export class NotificationsService {

    constructor() {
        const vapidKeys = {
            publicKey: 'BLnVk1MBGFBW4UxL44fuoM2xxQ4o9CuxocVzKn9UVmnXZEyPCTEFjI4sALMB8qN5ee67yZ6MeQWjd5iyS8lINAg',
            privateKey: 'mp5xYHWtRTyCA63nZMvmJ_qmYO6A1klSotcoppSx-MI',
        };

        webpush.setVapidDetails(
            'mailto:example@yourdomain.org',
            vapidKeys.publicKey,
            vapidKeys.privateKey,
        );
    }

    addPushSubscriber(sub: UserSubscription) {
        // const sub = req.body;
        console.log('Received Subscription on the server: ', sub);
        USER_SUBSCRIPTIONS.push(sub);
        return 'Subscription added successfully.';
    }

    sendNewsletter(redirectUrl) {
        console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

        // sample notification payload
        const notificationPayload = {
            notification: {
                title: 'Angular News',
                body: 'Newsletter Available!',
                icon: 'assets/main-page-logo-small-hat.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1,
                    url: redirectUrl,
                },
                actions: [{
                    action: 'explore',
                    title: 'Go to the site',
                }],
            },
        };
        Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
            sub, JSON.stringify(notificationPayload))))
            .then(() => {
                return 'Newsletter sent successfully.';
            })
            .catch(err => {
                console.error('Error sending notification, reason: ', err);
                return err;
            });
    }
}
