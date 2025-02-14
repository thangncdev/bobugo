import Colors from './colors';
import Fonts from './fonts';

import scales from 'utils/scales';

const TextStyles = {
    Body1: {
        ...Fonts.w400,
        fontSize: scales(16),
        lineHeight: scales(24),
        color: Colors.color_FFFFFF,
    },
    Body2: {
        ...Fonts.w400,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_090F24,
    },
    Body3: {
        ...Fonts.w400,
        fontSize: scales(12),
        lineHeight: scales(16),
        color: Colors.color_DCDBDB,
    },
    SubTitle2: {
        ...Fonts.w500,
        fontSize: scales(16),
        lineHeight: scales(24),
    },
    SubTitle3: {
        ...Fonts.w500,
        fontSize: scales(14),
        lineHeight: scales(20),
    },
    SubTitle12: {
        ...Fonts.w500,
        fontSize: scales(12),
        lineHeight: scales(20),
    },
    H1: {
        ...Fonts.w700,
        fontSize: scales(20),
        lineHeight: scales(28),
        color: Colors.color_090F24,
    },
    H5: {
        ...Fonts.w700,
        fontSize: scales(14),
        lineHeight: scales(24),
        color: Colors.color_090F24,
    },
    ToolTip: {
        ...Fonts.w500,
        fontSize: scales(10),
        lineHeight: scales(14),
    },
};

export default TextStyles;
