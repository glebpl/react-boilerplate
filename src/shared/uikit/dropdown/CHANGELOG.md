# uikit/dropdown

0.15.35
- Limit height of dropdown items with icon/radio/checkbox

0.15.26
- `CheckboxDropdownItem` added

0.15.15
- `triggerButtonProps` type changed from `CustomThemeButtonProps` to `ButtonProps`

0.15.2
- Adopted for new `FocusLock`
- `lockFocus` prop removed

0.14.10
- `lockFocus` prop added

0.14.9
- Fixed controlled mode
- Fixed double handleClick call in DropdownItem

0.14.7
- Added `afterOpen`, `popupRef` props

0.14.4
- fixed bug when DropdownItem that has "href" set ignores "Enter"

0.14.3
- add props: isOpen, onClose, contentRef

0.14.0
- Base button used instead of custom theme button as default trigger component
- `data-focus-lock` prop passed to custom trigger function  
- Adopted for Emotion 11 and themed colors

0.13.3
- `RadioDropdownItem` added
- `DropdownItemProps` made extension of `EmotionThemeProps` 
- `SelectableDropdownItemProps` interface added 
- `isSelected` prop moved from `DropdownItemProps` to `SelectableDropdownItemProps`

0.13.0
- Aligned with design guidelines

0.12.12
- Add a generic parameter for trigger ref in `DropdownTriggerProps`
- `onOpen` prop added

0.12.10
- Focus return logic modified: `shouldReturnFocusToTrigger={false}` set for internal Popup 

0.12.2
- Disabled DropdownItem should handle KeyDown events (required for focusable components like textfield)

0.12.0
- Initial version  
  - Positioning
  - Icons
  - Groups
  - Arrow navigation
