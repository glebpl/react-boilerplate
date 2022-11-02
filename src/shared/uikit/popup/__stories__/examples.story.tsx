import * as React from 'react';
import BasicStory from './10-popup';
import AsyncPopupStory from './11-asynchronous-popup';
import MultiplePopupsStory from './12-multiple-popups';
import SettingFocusStory from './13-setting-focus';
import DoublePopupStory from './14-double-popup';
import PopupWithSelectStory from './15-popup-with-select';
import ContentUpdatesStory from './16-content-updates';
import DefaultPopupStory from './18-default-popup';
import DisableFocusLockStory from './20-popup-disable-focus-lock';
import TriggerlessPopupStory from './21-triggerless';
import PopupInModalStory from './22-in-modal-dialog';
import AccentPopupStory from './23-accent-popup';
import AccentedWithBannerStory from './24-accented-with-banner';

export default {
  title: 'Popup'
};

export const Basic = () => <BasicStory />;
export const AsynchronousPopup = () => <AsyncPopupStory />;

AsynchronousPopup.story = {
  name: 'Asynchronous popup'
};

export const MultiplePopups = () => <MultiplePopupsStory />;

MultiplePopups.story = {
  name: 'Multiple popups'
};

export const SettingFocus = () => <SettingFocusStory />;

SettingFocus.story = {
  name: 'Setting focus'
};

export const DoublePopup = () => <DoublePopupStory />;

DoublePopup.story = {
  name: 'Double popup'
};

export const PopupWithSelect = () => <PopupWithSelectStory />;

PopupWithSelect.story = {
  name: 'Popup with select'
};

export const ContentUpdates = () => <ContentUpdatesStory />;

ContentUpdates.story = {
  name: 'Content updates'
};

export const DefaultPopup = () => <DefaultPopupStory />;
export const DisableFocusLock = () => <DisableFocusLockStory />;

DisableFocusLock.story = {
  name: 'Disable focus lock'
};

export const Triggerless = () => <TriggerlessPopupStory />;
export const InModalDialog = () => <PopupInModalStory />;

InModalDialog.story = {
  name: 'In modal dialog'
};

export const Accent = () => <AccentPopupStory />;
export const AccentedWithBanner = () => <AccentedWithBannerStory />;
