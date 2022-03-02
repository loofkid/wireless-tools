declare type TypeOrPromise<T extends Function | undefined, U, V> = T extends undefined ? Promise<U> : V