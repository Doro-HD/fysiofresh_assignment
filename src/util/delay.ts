export async function delay(fn: () => void, seconds: number) {
    const promise = new Promise<number>((resolve, _reject) => {
        const timeoutId = setTimeout(() => {
            fn();
            resolve(timeoutId);
        }, seconds * 1000);
    });

    const timeoutId = await promise;
    clearTimeout(timeoutId);
}