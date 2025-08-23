declare module 'react-slick' {
  import { Component } from 'react';

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
  adaptiveHeight?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    arrows?: boolean;
    centerMode?: boolean;
    centerPadding?: string;
    variableWidth?: boolean;
    responsive?: Array<{
      breakpoint: number;
      settings: Partial<Settings>;
    }>;
    prevArrow?: React.ReactElement;
    nextArrow?: React.ReactElement;
    beforeChange?: (current: number, next: number) => void;
    afterChange?: (current: number) => void;
  }

  export default class Slider extends Component<Settings> {}
}
