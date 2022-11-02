declare const typeMarker: unique symbol;

export interface Token<T> {
  readonly type: unique symbol;
  // [typeMarker]: T;
}

export type Newable<T> = new () => T;
export type Factory<T> = () => T;
export type Value<T> = T;

export interface CacheItem<T> {
  get(): T;
  getToken(): Token<T>;
  to(object: Newable<T>): CacheItem<T>;
  toFactory(factory: Factory<T>): CacheItem<T>;
  toValue(value: Value<T>): CacheItem<T>;
  setSingletonScope(value: boolean): CacheItem<T>;
}

export type BindFunction = <T = never>(token: Token<T>) => CacheItem<T>;

export interface ResolveFunction {
  <T1 = never>(token1: Token<T1>): T1;
  <T1 = never, T2 = never>(token1: Token<T1>, token2: Token<T2>): [T1, T2];
  <T1 = never, T2 = never, T3 = never>(token1: Token<T1>, token2: Token<T2>, token3: Token<T3>): [T1, T2, T3];
  <T1 = never, T2 = never, T3 = never, T4 = never>(
    token1: Token<T1>,
    token2: Token<T2>,
    token3: Token<T3>,
    token4: Token<T4>
  ): [T1, T2, T3, T4];
  <T1 = never, T2 = never, T3 = never, T4 = never, T5 = never>(
    token1: Token<T1>,
    token2: Token<T2>,
    token3: Token<T3>,
    token4: Token<T4>,
    token5: Token<T5>
  ): [T1, T2, T3, T4, T5];
}
