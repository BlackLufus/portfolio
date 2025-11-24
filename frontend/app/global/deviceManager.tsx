export enum DeviceCode {
    WEBSITE = "website",
    DESKTOP = "desktop"
}

export default class DeviceManager {
    private static subscribers = Array<(code: DeviceCode) => void>();
    public static code = DeviceCode.WEBSITE;

    public static subscribe = (notifier: (code: DeviceCode) => void) => {
        this.subscribers.push(notifier);
    }

    public static unsubscribe = (notifier: (code: DeviceCode) => void) => {
        const index = this.subscribers.indexOf(notifier);
        this.subscribers.splice(index, 1);
    }

    public static sendNotification = (code: DeviceCode) => {
        this.code = code;
        console.log(code);
        this.subscribers.forEach(subscriber => {
            subscriber(code);
        });
    }
}