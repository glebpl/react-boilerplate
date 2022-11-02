# uikit/popup

0.15.15
- Optional `actions` prop added to `AccentPopupProps` allowing to add multiple action buttons
- Optional `accentActions` and `accentTitle` (banner text) props added to `AccentedProps`
- Internal styling of `AccentPopup` changed

0.15.4
- Internal usage of `FocusLock` modified to prevent passing of `appearance` prop to div

0.15.2
- Internal structure and custom styling refactored, custom styling removed
- `appearance` prop added
- BC: `popupComponent` prop removed

0.14.7
- Added `afterOpen` prop;

0.14.0
- Disable focus lock by default in persistent accent popup
- `data-focus-lock` prop passed to custom trigger function
- `aria-controls` removed from props passed to trigger function
- Adopt for Emotion 11 and themed colors

0.13.2
- Pass event considered as one that should close Popup to `onClose`
- Allow closing of AccentPopup only from parent or after click on action button  

0.12.12
- `AccentPopup` and `Accented` wrapper added
- `BasePlacement`, `Placement` and `VirtualElement` types reexported
- `trigger` prop made optional with `referenceElement` proxied to Popper as alternative
- `onOpen` prop added

0.12.10
- `shouldReturnFocusToTrigger` prop added, proxied as `shouldReturnFocus` to FocusLock

0.12.0
- `fallbackPlacements` prop added, proxied to Popper
- `onPopupEscaped`, `onReferenceEscaped` props added allowing to modify Popup behaviour in scrollable content.
- Focus manager and focus-trap usage replaced with usage of `FocusLock`. Optional `lockFocus` prop added.
- Logic related to `autoFocus` changed.

0.9.8
- Initial port from Atlaskit (v1.0.6) at commit b27f61ac Luke Batchelor (Automated) <lbatchelor@atlassian.com> on 21/12/2020 at 13:33
- Apply ESLint rules
- TriggerProps interface made compatible with React.AriaAttributes
- Fix tests and examples