import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTheme;
    fonts: FontTheme;
  }

  export interface ColorTheme {
    Neutral1: string;
    Neutral2: string;
    Neutral3: string;
    Neutral4: string;
    Neutral5: string;
    Primary1: string;
    Primary2: string;
    Primary3: string;
    Primary4: string;
    Secondary1: string;
    Secondary2: string;
    Secondary3: string;
    Secondary4: string;
    Tertiary1: string;
    Tertiary2: string;
    Tertiary3: string;
    Tertiary4: string;
  }

  export interface FontTheme {
    desktop: TDesktop;
    android: TAndroid;
    ios: TIos;
  }
  export interface TDesktop {
    display: TDisplay;
    body: TBody;
  }
  export interface TDisplay {
    regular: TRegular;
    bold: TBold;
  }
  export interface TRegular {
    xL: T;
    L: T;
    M: T;
    S: T;
    xS: T;
  }
  export interface TBold {
    xL: T;
    L: T;
    M: T;
    S: T;
    xS: T;
  }
  export interface T {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    fontWeight: string;
  }
  export interface TBody {
    regular: TBRegular;
    bold: TBBold;
  }
  export interface TBRegular {
    xL: T;
    L: T;
    M: T;
    S: T;
  }
  export interface TBBold {
    xL: T;
    L: T;
    M: T;
    S: T;
  }
  export interface TAndroid {
    display: TDisplay;
    body: TBody;
  }

  export interface TIos {
    largeTitle: TFont;
    title1: TFont;
    title2: TFont;
    title3: TFont;
    headline: TFont;
  }
  export interface TFont {
    lRegular: T;
    mRegular: T;
    sRegular: T;
    xsRegular: T;
  }
}
