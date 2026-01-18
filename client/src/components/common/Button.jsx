import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { CircleLoader } from "react-spinners";
// baseStyle :kiểu dùng chung cho một nút
const baseStyle = [
  "flex items-center justify-center",
  "px-5 py-2", // pading trái phải 16px, pading trên dưới 10px
  "rounded-lg",
  "font-bold",
  "cursor-pointer",
  "transition-all duration-300", // Hiệu ứng chuyển màu mượt mà trong 0.2s khi hover
  "focus:outline-none focus:ring-2 focus:bg-primary-hover", // Khi tab vào thì hiện vòng sáng (hỗ trợ người dùng bàn phím)
  "disabled:opacity-70 disabled:cursor-not-allowed", //khi loading nút mờ đi

  //RESPONSIVE
  "w-full", // Mặc định (Mobile): Nút rộng 100% màn hình
  "md:w-auto", // Từ Tablet trở lên (md): Nút tự co lại vừa với nội dung chữ bên trong
].join(" "); // Nối các dòng trên thành 1 chuỗi dài

//variants: các phiên bản màu sắc
const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover", 

  danger: "bg-danger text-white hover:bg-red-700",

  success: "bg-success text-white hover:bg-green-700",

  outline:
    "border border-primary text-primary hover:bg-primary-light bg-transparent",

  ghost:
    "text-text-muted hover:bg-secondary-light hover:text-red-500 bg-transparent", 
};
export const Button = ({
  children,
  variant = "primary",
  className,
  isLoading = false,
  ...props
}) => {
  // baseStyle + màu theo variant + className riêng
  const mergedClass = twMerge(clsx(baseStyle, variants[variant], className));
  return (
    <button className={mergedClass} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <CircleLoader size={18} color="white" loading={true} />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
