import { TableServiceAsync } from "./schema";
import { createTableServiceAsync, getOrCreateTable } from "./storage";

export async function bootstrap(): Promise<void> {
    const ats: TableServiceAsync = createTableServiceAsync();
    await getOrCreateTable(ats, "event");
    await getOrCreateTable(ats, "skill");
    await getOrCreateTable(ats, "user");
}

export function promisify<T>(thisArg: any, fn: Function): (...args: any[]) => Promise<T> {
    return (...args: any[]) => {
        return new Promise<T>((resolve, reject) => {
            args.push((error: Error, result: any) => (error) ? reject(error) : resolve(result));
            fn.apply(thisArg, args);
        });
    };
}
