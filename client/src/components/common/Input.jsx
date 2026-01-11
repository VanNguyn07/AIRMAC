/** * Component Input tùy chỉnh
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} props
 */
export const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`rounded-lg p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover transition ${className}`}
    />
  );
};
