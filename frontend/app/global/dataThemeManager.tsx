export enum DarkmodeCode {
    LIGHT = "light",
    DARK = "dark"
}

export default class DarkmodeThemeManager {
    private static subscribers = Array<(code: DarkmodeCode) => void>();
    public static code = DarkmodeCode.LIGHT;
    public static load(): DarkmodeCode {
        const stored = localStorage.getItem('data-darkmode-theme') ?? "light";
        console.log(stored)
        const includes = Object.values(DarkmodeCode).includes(stored as DarkmodeCode);
        if (includes) {
            this.code = stored as DarkmodeCode;
        }
        else {
            localStorage.setItem('data-darkmode-theme', this.code.toString());
        }
        return this.code
    }

    public static subscribe = (notifier: (code: DarkmodeCode) => void) => {
        this.subscribers.push(notifier);
    }

    public static unsubscribe = (notifier: (code: DarkmodeCode) => void) => {
        const index = this.subscribers.indexOf(notifier);
        this.subscribers.splice(index, 1);
    }

    public static sendNotification = (code: DarkmodeCode) => {
        this.code = code;
        console.log(code);
        localStorage.setItem('data-darkmode-theme', code.toString());
        this.subscribers.forEach(subscriber => {
            subscriber(code);
        });
    }
}

enum ColorScheme {
    RED = "#ac5353",
    YELLOW = "#ac8e53",
    LIME = "#809b4b",
    GREEN = "#53ac53",
    MINT = "#53ac8e",
    BLUE = "#538eac",
    PURPLE = "#5353ac",
    PINK = "#8e53ac",
    ROSA = "#ac538e"
}

export class ColorThemeManager {
    private static subscribers = Array<(index: number) => void>();
    public static index: number = 1;
    public static load(): number {
        const stored = localStorage.getItem('data-color-theme') ?? "1";
        try {
            this.index = Number(stored)
            return this.index
        }
        catch {
            return this.index;
        }
    }

    public static subscribe = (notifier: (index: number) => void) => {
        this.subscribers.push(notifier);
    }

    public static unsubscribe = (notifier: (index: number) => void) => {
        const index = this.subscribers.indexOf(notifier);
        this.subscribers.splice(index, 1);
    }

    public static sendNotification = (index: number) => {
        const colors = Object.values(ColorScheme);
        this.index = index % colors.length;
        console.log(index);
        localStorage.setItem('data-color-theme', index.toString());
        document.documentElement.style.setProperty('--preferred-color-theme', Object.values(ColorScheme)[this.index].toString());
        this.subscribers.forEach(subscriber => {
            subscriber(index);
        });
    }
}