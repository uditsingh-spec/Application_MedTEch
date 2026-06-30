import { Text, TextInput } from 'react-native';
import React from 'react';

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;
(Text as any).defaultProps.maxFontSizeMultiplier = 1;

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps.maxFontSizeMultiplier = 1;

if ((Text as any).render) {
  const originalTextRender = (Text as any).render;
  (Text as any).render = function (...args: any[]) {
    const origin = originalTextRender.call(this, ...args);
    return React.cloneElement(origin, { allowFontScaling: false, maxFontSizeMultiplier: 1 });
  };
}
if ((TextInput as any).render) {
  const originalTextInputRender = (TextInput as any).render;
  (TextInput as any).render = function (...args: any[]) {
    const origin = originalTextInputRender.call(this, ...args);
    return React.cloneElement(origin, { allowFontScaling: false, maxFontSizeMultiplier: 1 });
  };
}
