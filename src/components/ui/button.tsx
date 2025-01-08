import { cn } from "@/lib/utils";
import { Spinner } from "./icons/spinner";

type ArrowType = "up" | "down" | "left" | "right" | "none";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  arrow?: ArrowType;
  props?: any;
  down?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  className,
  arrow = "none",
  down,
  loading = false,
  ...props
}: buttonProps) => {
  return (
    <button
      disabled={loading}
      className={cn(
        `flex justify-center gap-2.5 items-center disabled:pointer-events-none disabled:opacity-50 font-manrope rounded-md px-5 py-1`,
        className,
        arrow === "right" && "arrow-btn-right",
        arrow === "left" && "arrow-btn-left",
        arrow === "up" && "arrow-btn-up",
        arrow === "down" && "arrow-btn-down"
      )}
      {...props}
    >
      {loading ? (
        <Spinner className="h-6 w-6 animate-spin" />
      ) : (
        <>
          {children}
          {arrow !== "none" && (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className={cn("arrow", arrow === "down" && "rotate-90")}
              >
                <path
                  d="M4.58594 10.9997H17.4193M17.4193 10.9997L11.0026 4.58301M17.4193 10.9997L11.0026 17.4163"
                  stroke="#F9F9F9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </>
      )}
    </button>
  );
};
