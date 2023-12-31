import {cn} from "@/util/utils";
import {cva, VariantProps} from "class-variance-authority";
import React, {FC} from "react";

const headingVariants = cva(
    'dark:text-white font-extrabold leading-tight tracking-tighter',
    {
        variants: {
            size: {
                default: 'text-4xl md:text-5xl lg:text-6xl',
                lg: 'text-5xl md:text-6xl lg:text-7xl',
                md: 'text-3xl md:text-4xl lg:text-5xl',
                sm: 'text-xl md:text-2xl lg:text-3xl',
                xs: 'text-xs md:text-sm lg:text-xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
)

interface LargeHeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {
}

const LargeHeading: FC<LargeHeadingProps> = ({children, className, size, ...props}) => {
    return (
        <h1 {...props} className={cn(headingVariants({size, className}))}>
            {children}
        </h1>
    )
}

export default LargeHeading