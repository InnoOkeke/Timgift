"use client";

import { useState } from "react";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    min?: number;
    max?: number;
}

export default function QuantitySelector({
    quantity,
    setQuantity,
    min = 1,
    max = 99
}: QuantitySelectorProps) {
    const [inputMode, setInputMode] = useState(false);
    const [inputValue, setInputValue] = useState(quantity.toString());

    const decrease = () => {
        if (quantity > min) {
            setQuantity(quantity - 1);
        }
    };

    const increase = () => {
        if (quantity < max) {
            setQuantity(quantity + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        const num = parseInt(inputValue, 10);
        if (!isNaN(num) && num >= min && num <= max) {
            setQuantity(num);
        } else {
            setInputValue(quantity.toString());
        }
        setInputMode(false);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)"
            }}
        >
            {/* Decrease Button */}
            <button
                onClick={decrease}
                disabled={quantity <= min}
                style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: quantity <= min ? "var(--text-muted)" : "var(--text-secondary)",
                    opacity: quantity <= min ? 0.4 : 1,
                    cursor: quantity <= min ? "not-allowed" : "pointer",
                    border: "none",
                    background: "none",
                    fontSize: "20px",
                    fontWeight: "bold"
                }}
            >
                −
            </button>

            {/* Quantity Display / Input */}
            <div
                style={{
                    width: "60px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: "1px solid var(--border)",
                    borderRight: "1px solid var(--border)"
                }}
            >
                {inputMode ? (
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        autoFocus
                        min={min}
                        max={max}
                        style={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            border: "none",
                            background: "transparent",
                            color: "var(--text)",
                            fontSize: "16px",
                            fontWeight: 600,
                            outline: "none"
                        }}
                    />
                ) : (
                    <span
                        onClick={() => {
                            setInputMode(true);
                            setInputValue(quantity.toString());
                        }}
                        style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "var(--text)",
                            cursor: "text"
                        }}
                    >
                        {quantity}
                    </span>
                )}
            </div>

            {/* Increase Button */}
            <button
                onClick={increase}
                disabled={quantity >= max}
                style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: quantity >= max ? "var(--text-muted)" : "var(--text-secondary)",
                    opacity: quantity >= max ? 0.4 : 1,
                    cursor: quantity >= max ? "not-allowed" : "pointer",
                    border: "none",
                    background: "none",
                    fontSize: "20px",
                    fontWeight: "bold"
                }}
            >
                +
            </button>
        </div>
    );
}
