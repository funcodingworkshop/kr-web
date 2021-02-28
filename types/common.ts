function inferLiteral<U, T extends U>(arg: T): T {
    return arg;
}

/**
 * Предназначена для того, чтобы ts мог правильно определять литеральный тип
 * Без ее использования, ts может неявно привести литеральный тип к примитивному
 */
export function inferStringLiteral<T extends string>(arg: T): T {
    return inferLiteral<string, T>(arg);
}

/**
 * Выводит union тип всех значений T.
 */
export type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;

/**
 * Выводит тип для результата для промиса (или для функции возвращающей промис)
 * Например для вызова axios
 */
export type InferThenArg<T> = T extends Promise<infer U>
    ? U
    : T extends (...args: any[]) => Promise<infer U>
    ? U
    : T;
