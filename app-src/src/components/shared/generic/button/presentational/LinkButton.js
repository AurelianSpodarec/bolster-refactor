import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({
    href = '',
    text = '',
    icon = '',
    svgIconComponent: SvgIconComponent, // SVG icon, needs to be imported as component
    iconRight = false,
    iconSpin = false,
    iconOnly = false,
    iconWeight = 'solid',
    disabled = false,
    source = 'primary', // primary, secondary
    ambient = 'primary', // primary, positive, negative
    size = 'small', // medium, small
    extraClasses = '',
    // external links (external pages, downloads)
    isExternalLink = false,
    openInNewTab = false,
    isDownloadable = false,
    downloadName = '',
}) => {
    const iconWeightLookup = {
        solid: 'fa',
        regular: 'far',
        light: 'fal',
    };
    const dynamicButtonClass = `custom-button flex-row align-center justify-${
        iconRight ? 'end' : 'start'
    } ${iconOnly ? 'icon-only' : ''}`;

    const dynamicIconClass = `icon ${iconWeightLookup[iconWeight] || 'fa'} fa-${icon} ${
        iconSpin ? 'fa-spin' : ''
    }`;

    const InnerContent = () => (
        <>
            {icon && !iconRight && <i className={dynamicIconClass}></i>}
            {!icon && SvgIconComponent && !iconRight && <SvgIconComponent className="svg-icon" />}
            {text && !iconOnly && <span className="text">{text}</span>}
            {icon && iconRight && <i className={dynamicIconClass}></i>}
            {!icon && SvgIconComponent && iconRight && <SvgIconComponent className="svg-icon" />}
        </>
    );

    if (isExternalLink) {
        const targetAttr = openInNewTab ? '_blank' : '_self';
        const relAttr = openInNewTab ? 'noopener noreferrer' : '';
        const downloadAttr =
            isDownloadable && downloadName ? downloadName : isDownloadable ? true : false;

        return (
            <a
                target={targetAttr}
                rel={relAttr}
                href={href}
                className={`${dynamicButtonClass} ${extraClasses}`}
                download={downloadAttr}
                data-source={source}
                data-ambient={ambient}
                data-size={size}
                data-disabled={disabled}
                onClick={e => {
                    if (disabled) e.preventDefault();
                }}
            >
                <InnerContent />
            </a>
        );
    }

    return (
        <Link
            to={href}
            className={`${dynamicButtonClass} ${extraClasses}`}
            data-source={source}
            data-ambient={ambient}
            data-size={size}
            data-disabled={disabled}
            onClick={e => {
                if (disabled) e.preventDefault();
            }}
        >
            <InnerContent />
        </Link>
    );
};

export default LinkButton;
