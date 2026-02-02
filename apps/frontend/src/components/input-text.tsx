import { cva, cx, type VariantProps } from "class-variance-authority";
import { textVariants } from "./text";

export const inputTextVariants = cva(
  `border-b border-solid border-gray-200 focus:border-pink-base bg-transparent outline-none`,
  {
    variants: {
      size: {
        md: "pb-2 px-2",
      },
      disable: {
        true: "pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      disable: false,
    },
  }
);

interface InputTextProps
  extends VariantProps<typeof inputTextVariants>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {}

export default function InputText({
  size,
  disable,
  className,
  ...props
}: InputTextProps) {
  return (
    <input
      className={cx(
        inputTextVariants({ size, disable }),
        textVariants(),
        className
      )}
      {...props}
    />
  );
}
