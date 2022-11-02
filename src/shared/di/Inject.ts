import { Container, NothingBoundToTokenError } from './Container';
import { BindFunction, ResolveFunction, Token } from './types';

function define<TVal, TTarget extends { [key in TProp]: TVal }, TProp extends string>(
  target: TTarget,
  property: TProp,
  container: Container,
  token: Token<TVal>
) {
  Object.defineProperty(target, property, {
    get: function () {
      const value = container.get<TVal>(token);
      Object.defineProperty(this, property, {
        value,
        enumerable: true
      });
      return value;
    },
    configurable: true,
    enumerable: true
  });
}

export function createResolve(...containers: Container[]): ResolveFunction {
  return (...tokens: Token<any>[]) => {
    const tryGetFromContainer = (token: Token<any>, container: Container) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return container.get(token);
      } catch (e) {
        if (e instanceof NothingBoundToTokenError) {
          return null;
        }
        throw e;
      }
    };

    const getFromContainers = (token: Token<any>) => {
      for (const container of containers) {
        const value = tryGetFromContainer(token, container);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        if (value !== null) return value;
      }
      throw new NothingBoundToTokenError(`Nothing is bound to Token(${token.type.toString()})`);
    };

    if (tokens.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return getFromContainers(tokens[0]);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return tokens.map(t => getFromContainers(t));
    }
  };
}

export function createBind(container: Container): BindFunction {
  return (token: Token<any>) => container.bind(token);
}

export function createRebind(container: Container): BindFunction {
  return (token: Token<any>) => container.rebind(token);
}
