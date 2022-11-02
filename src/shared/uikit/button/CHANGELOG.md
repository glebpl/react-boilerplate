# uikit/button

0.15.17
- add safari style fix to prevent native tooltips from showing on hover

0.15.15
- `none` variant of `spacing` removed
- `subtle-link` variant of `appearance` removed
- `CustomThemeButton` has been marked as deprecated. Use `Link` or `styled(Button)` instead

0.15.13
- Add separate size calculation for dc platform

0.14.10
- `extract` function moved from stories

0.14.7
- Added some color fixes according to the layouts

0.14.2
- Fix `pointer-events` on interactive button

0.14.0
- Adopted for themed colors and Emotion 11
- BC: `buttonStyles` type in `ThemeTokens` of `custom-theme-button` changed

0.13.3
- `SplitButtonGroup` added
- `style` prop added to `Button`

0.12.12
- Align `accent` appearance with ALM Design System
- Exports added for custom styling with emotion

0.12.10
- `accent` (purple) appearance added

0.11.2
- Add `isActive`, `isHover` props to get a possibility to add concerning styles with programmatic way;

0.10.11
- Remove wrapper of `onMouseDown` handler preventing default behaviour in `ButtonBase`.
- Tests modified according to new behaviour

0.6.0
- Updated port to Atlaskit (15.1.0) at 72b32690 Luke Batchelor (Automated) <lbatchelor@atlassian.com> on 08.10.2020 at 16:46
- Default export changed in 15.0.0 (BC)
- Replaced innerText on textContent in tests

0.1.0
- Initial port from Atlaskit (13.4.0) at commit 77e962b4 Luke Batchelor (Automated) <lbatchelor@atlassian.com> on 01/06/2020 at 16:46
- Moved hex2rgba to common utils
- Removed getLineHeight (should be the same as getHeight)
- Remove Atlaskit dependencies where possible
