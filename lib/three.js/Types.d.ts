export declare type FixedSize = {
    kind: 'FixedSize';
    width: number;
    height: number;
};
/**
 * Center our render viewport at (0, 0) and fix it's width and height to a specific render space size accounting for the DOM container's ratio of width and height
 */
export declare type ViewportSize = {
    kind: 'ViewportSize';
    /**
     * value to fix out viewport's width and height to
     */
    viewportSize: number;
};
/**
 * Relate our render viewport size to match a number of pixels per window (client/screen) pixel
 */
export declare type FitWindowSize = {
    kind: 'FitWindowSize';
    /**
     * ratio of the number of render view port pixels per window pixels
     */
    pixelsPerWindowPixel: number;
    /**
     * whether to resize the renderer when the window resizes to maintain the `pixelsPerWindowPixel` ratio
     */
    resizeRendererToFit: boolean;
};
export declare type SizeProperties = FixedSize | FitWindowSize | ViewportSize;
