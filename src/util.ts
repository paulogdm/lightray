export function promisify<T>(thisArg: any, fn: Function): (...args: any[]) => Promise<T> {
    return (...args: any[]) => {
        return new Promise<T>((resolve, reject) => {
            args.push((error: Error, result: any) => (error) ? reject(error) : resolve(result));
            fn.apply(thisArg, args);
        });
    };
}
