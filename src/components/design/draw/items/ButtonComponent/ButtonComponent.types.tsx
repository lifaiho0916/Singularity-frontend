export interface ButtonComponentProps {
    text?: string,
    style?: {},
    type: "text" | "outlined" | "contained" | undefined,
    size: "small" | "medium" | "large" | undefined,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}