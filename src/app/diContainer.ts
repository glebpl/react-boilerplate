import { Container } from '../shared/di/Container';

const diResolve = createResolve(container);
const diBind = createBind(container);
const diClear = (): void => {
  container.reset();
};

const prepareExtensionAppContainer = (): { diBind: BindFunction; diResolve: ResolveFunction } => {
  const extensionAppContainer = new Container();
  const extensionAppDiBind = createBind(extensionAppContainer);
  const extensionDiResolve = createResolve(extensionAppContainer, container);

  extensionAppDiBind(AnalyticsToken).to(AmplitudeAnalyticsCollector);

  return { diBind: extensionAppDiBind, diResolve: extensionDiResolve };
};

export { diResolve, diBind, diClear, prepareExtensionAppContainer };
