import {Gateway} from '../models';

export const initialData: Gateway[] = [
    {
        id: '1588947442214',
        displayName: 'Test Gateway',
        ipv4_address: '192.169.43.5',
        p_devices: [
            {
                uid: 122354576765634,
                vendor: 'LG',
                createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
                status: 0,
            },
            {
                uid: 122354236465634,
                vendor: 'Huawei',
                createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
                status: 1,
            },
            {
                uid: 122354576765612,
                vendor: 'SAMSUNG',
                createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
                status: 1,
            },
            {
                uid: 54354576765634,
                vendor: 'Motorola',
                createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
                status: 0,
            },
            {
                uid: 7122677876765634,
                vendor: 'Nokia',
                createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
                status: 0,
            },
        ],
    },
];
