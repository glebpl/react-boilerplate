import { CacheItem, Factory, Newable, Token, Value } from './types';

export function createToken<T>(name: string): Token<T> {
  return { type: Symbol(name) } as Token<T>;
}

class CacheItemImpl<T> implements CacheItem<T> {
  private creator?: Newable<T>;
  private factory?: Factory<T>;
  private value?: Value<T>;
  private cache?: T;
  private singleton = true;

  constructor(private token: Token<T>) {}

  setSingletonScope(value: boolean): CacheItem<T> {
    this.singleton = value;
    return this;
  }

  to(creator: Newable<T>): CacheItem<T> {
    if (creator === undefined) {
      throw new Error('Cannot bind a value of type undefined');
    }

    this.creator = creator;
    return this;
  }

  toFactory(factory: Factory<T>): CacheItem<T> {
    if (factory === undefined) {
      throw new Error('Cannot bind a value of type undefined');
    }

    this.factory = factory;
    return this;
  }

  toValue(value: T): CacheItem<T> {
    if (value === undefined) {
      throw new Error('Cannot bind a value of type undefined');
    }

    this.value = value;
    return this;
  }

  get(): T {
    if (this.value !== undefined) {
      return this.value;
    }

    if (this.creator !== undefined) {
      const creatorFn = this.creator;
      return this.cacheItem(() => new creatorFn());
    }

    if (this.factory !== undefined) {
      const factoryFn = this.factory;
      return this.cacheItem(() => factoryFn());
    }

    throw new NothingBoundToTokenError(`Nothing is bound to Token(${this.token.type.toString()})`);
  }

  getToken(): Token<T> {
    return this.token;
  }

  private cacheItem(creatorFn: () => T): T {
    if (this.singleton && this.cache !== undefined) {
      return this.cache;
    } else if (!this.singleton) {
      return creatorFn();
    } else {
      this.cache = creatorFn();
      return this.cache;
    }
  }
}

export class Container {
  private registry = new Map<symbol, CacheItem<never>>();

  bind<T = never>(token: Token<T>): CacheItem<T> {
    return this.add<T>(new CacheItemImpl<T>(token));
  }

  rebind<T = never>(token: Token<T>): CacheItem<T> {
    if (this.registry.get(token.type)) {
      this.remove(token);
    }

    return this.bind<T>(token);
  }

  remove(token: Token<any>): Container {
    if (this.registry.get(token.type) === undefined) {
      throw new Error(`Token(${token.type.toString()}) was never bound`);
    }

    this.registry.delete(token.type);

    return this;
  }

  get<T = never>(token: Token<T>): T {
    const regItem = this.registry.get(token.type);

    if (regItem === undefined) {
      throw new NothingBoundToTokenError(`Nothing is bound to Token(${token.type.toString()})`);
    }

    return regItem.get();
  }

  reset() {
    this.registry = new Map();
  }

  private add<T = never>(item: CacheItem<T>): CacheItem<T> {
    if (this.registry.get(item.getToken().type) !== undefined) {
      throw new Error(`Object can only bound once: Token(${item.getToken().type.toString()})`);
    }

    this.registry.set(item.getToken().type, item as CacheItem<never>);

    return item;
  }
}

export class NothingBoundToTokenError extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, NothingBoundToTokenError.prototype);
  }
}

const container = new Container();
