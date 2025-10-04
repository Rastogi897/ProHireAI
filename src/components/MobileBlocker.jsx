import React, { useEffect, useState } from "react";

const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 767;
};

const MobileBlocker = () => {
    const [showBlock, setShowBlock] = useState(isMobile());

    useEffect(() => {
        const handleResize = () => {
            setShowBlock(isMobile());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!showBlock) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#fff",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 32,
        }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                For the best user experience
            </h1>
            <p style={{ fontSize: 18 }}>
                Please use the application on a tablet, laptop, or PC.<br />
                Mobile devices are not supported.
            </p>
        </div>
    );
};

export default MobileBlocker;
