"use client"
import { Toaster as ReactHotToaster } from "react-hot-toast"

export default function ToasterProvider({ children }) {
    return (
        <>
            {children}
            <ReactHotToaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "700",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase"
                    }
                }}
            />
        </>
    )
}