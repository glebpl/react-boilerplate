## Variables
Prefer use "most descriptive noun goes last" rule for all typescript code units  and files.

Good:
```
StructureEditForm
PrimaryButton
UserList
```

Bad:
```
FormFolderCreate
ButtonSuccess
FlagWarning
```

## Files
Files exporting React component or class must be named in **`PascalCase`**. Name of the file must correspond to the name of "main" class/component
 exported from it. 

CreateStructureDialog.tsx
SpecController.ts

Other files must be named in **`camelCase`**.

Examples:
```
index.ts
types.ts
utils.ts
overrides.d.ts
defaultVariables.ts
```

## Interfaces and types
Don't start name of an interface with "**I**". Use **Impl** postfix for class names implementing interface, except mocks (see below). 

Use **Abstract** prefix if abstract class implements interface.

### Good: 
```
interface Preset {}
const preset: Preset = {};

interface StructurePlatform {}
class StructurePlatformImpl implements StructurePlatform {}

interface StructurePlatformEventEmitter {}
abstract class AbstractStructurePlatformEventEmitter implements StructurePlatformEventEmitter {}
```

### Bad: 
```
IItemEditor
IUserRecord
abstract class ServiceImpl implements IService {}
```

## React component props
Use name starting with **on** for props which used as call back inside component. Use name starting with **handle** for functions used as values for
 such props.

### Good:
```
<Button onClick={handleClick}>Save</Button>
<Alert onBeforeShow={handleAlertBeforeShow}>...</Alert>
<Alert onShow={handleAlertShow}>...</Alert>
```

### Bad:
```
<Form handleSubmit={this.doSubmit}>...</Form>
<Alert beforeShow={onShow}>...</Alert>
```

## Mobx stores as part of MVC, MVVM patterns
Use **Store** postfix to name class containing any mobx observable properties. Don't use Controller or Model postfixes. 

Use **store** as React component property name used to pass Mobx store instance. 

Legacy classes must be renamed when they start use Mobx.

### Good:
```
class UserStore {}
class ForestPanelStore {}
class OwnerSectionStore {}

const ownerSectionStore = new OwnerSectionStore();
<OwnerSection store={ownerSectionStore} />
```

### Bad:
```
class TableController {}
class DialogModel {}
```

## Presentation (View) components
Naming convention is still not finalized but such components but we definitely shouldn't use React as postfix.

### Bad:
```
class ForestPanelReact {}
Other
Boolean prefixes 
Use prefixes like is, has, should and so on for variables and properties which value is boolean and for functions returning boolean.
```

## Other

### Boolean prefixes 
Use prefixes like **is**, **has**, **should** and so on for variables and properties which value is boolean and for functions returning boolean.
Variable or function name shouldn't look like an action.

#### Good:
```
const isShown = ...
const shouldExist = ...
const hasError = ...
```

#### Bad:
```
const open = (): boolean { return true; } // should be isOpen
const startStep = (): boolean { return true; }// should be shouldStartStep
```

## Mocks
Use **Mock** postfix in service and other mocks.
Don't use additional **Impl** postfix.
Place mocks as separate files in same folder with real implementations. 

Good:
```
AnalyticsCollectorMock
UserPropertyServiceMock
UserPropertyServiceJestMock
UserPropertyServiceStoryMock
```
Bad:
```
MockAnalyticsCollector
UserPropertyServiceMockImpl
```
