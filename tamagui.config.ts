import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens as tokensTMG } from '@tamagui/themes';
import {
  Button as ButtonTamagui,
  createTamagui,
  createTokens,
  H1,
  SizableText,
  styled,
  YStack,
} from 'tamagui';

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

const headingFont = createInterFont({
  family: 'Outfit_600SemiBold',
});

const bodyFont = createInterFont({
  family: 'Outfit_300Light',
});

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
});

export const Main = styled(YStack, {
  flex: 1,
  justifyContent: 'space-between',
  maxWidth: 960,
});

export const Title = styled(H1, {
  color: '#000',
  size: '$12',
});

export const Subtitle = styled(SizableText, {
  color: '#38434D',
  size: '$9',
});

export const PrimaryButton = styled(ButtonTamagui, {
  backgroundColor: '#076CB5',
  borderRadius: '$6',
  hoverStyle: {
    backgroundColor: '#5EA1CA',
  },
  pressStyle: {
    backgroundColor: '#5EA1CA',
  },
  maxWidth: 500,

  // Shaddows
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  // Button text
  color: '#FFFFFF',
  fontFamily: '$heading',
  fontSize: '$6',
});

const colorPalette = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#076CB5',
  secondary: '#C6233F',
  gray1: '#F8F8F8', // Lighter gray for light theme backgrounds
  gray2: '#EFEFEF',
  gray3: '#D1D1D1',
  gray4: '#B4B4B4',
  gray5: '#979797',
  gray6: '#333333', // Darker gray for text on light theme
  gray7: '#222222', // Even darker gray
};

const tokens = createTokens({
  ...tokensTMG,
  color: {
    ...colorPalette,
  },
});

const appThemes = {
  light: {
    ...themes.light,
    background: tokens.color.white,
    text: tokens.color.gray6,
    primary: tokens.color.primary,
    secondary: tokens.color.secondary,
    tertiary: tokens.color.gray1,
  },
  dark: {
    ...themes.dark,
    background: tokens.color.black,
    text: tokens.color.gray2,
    primary: tokens.color.primary,
    secondary: tokens.color.secondary,
    tertiary: tokens.color.gray6,
  },
};

const config = createTamagui({
  light: {
    color: {
      background: 'white',
      text: '#3E464B',
      primary: '#076CB5',
      secondary: '#C6233F',
    },
  },
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes: appThemes,
  tokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
