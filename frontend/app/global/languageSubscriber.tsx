export enum LanguageCode {
    DE = "de",
    EN = "en"
}

export default class LanguageManager {
    private static subscribers = Array<(code: LanguageCode) => void>();
    public static code = LanguageCode.DE;
    public static load(): LanguageCode {
        const stored = localStorage.getItem('data-lang') ?? "de";
        const includes = Object.values(LanguageCode).includes(stored as LanguageCode);
        if (includes) {
            this.code = stored as LanguageCode;
        }
        return this.code
    }

    public static subscribe = (notifier: (code: LanguageCode) => void) => {
        this.subscribers.push(notifier);
    }

    public static unsubscribe = (notifier: (code: LanguageCode) => void) => {
        const index = this.subscribers.indexOf(notifier);
        this.subscribers.splice(index, 1);
    }

    public static sendNotification = (code: LanguageCode) => {
        this.code = code;
        console.log(code);
        localStorage.setItem('data-lang', code.toString());
        this.subscribers.forEach(subscriber => {
            subscriber(code);
        });
    }
}