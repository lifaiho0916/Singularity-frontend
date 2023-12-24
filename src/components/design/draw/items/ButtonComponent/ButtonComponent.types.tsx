export interface ButtonComponentProps {
    text?: string,
    // onClick?: () => void,
    style?: any,
    preview: boolean,
    link?: string,
    type: "text" | "outlined" | "contained" | undefined,
    size: "small" | "medium" | "large" | undefined,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}