import "styled-components";

// Extend the DefaultTheme interface provided by styled-components
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      textLight: string;
      primary: string;
      background: string;
      text: string;
    };
  }
}
