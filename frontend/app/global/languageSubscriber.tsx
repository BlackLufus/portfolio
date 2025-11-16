export enum LanguageCode {
    DE = "de",
    EN = "en"
}

export default class LanguageNotifier {
    private static subscribers = Array<(code: LanguageCode) => void>();
    public static code = LanguageCode.DE;

    public static subscribe = (notifier: (code: LanguageCode) => void) => {
        this.subscribers.push(notifier);
    }

    public static unsubscribe = (notifier: (code: LanguageCode) => void) => {
        const index = this.subscribers.indexOf(notifier);
        this.subscribers.splice(index, 1);
    }

    public static sendNotification = (code: LanguageCode) => {
        this.code = code;
        this.subscribers.forEach(subscriber => {
            subscriber(code);
        });
    }
}