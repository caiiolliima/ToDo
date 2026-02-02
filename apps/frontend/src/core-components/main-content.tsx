import { cx } from "class-variance-authority";

export default function MainContent({
  children,
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <>
      <main className={cx("mt-4 md:mt-8", className)} {...props}>
        {children}
      </main>
    </>
  );
}
