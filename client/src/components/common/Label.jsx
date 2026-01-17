/** * Component Label tùy chỉnh
 * @param {React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>} props 
 */
export const Label = ({children ,className = "", ...props}) => {
    return(
        <label className={`font-sans font-bold text-sky-700 ${className}`} {...props}>{children}</label>
    )
}