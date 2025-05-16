// src/components/context/ThemeContext.tsx

"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type ThemeMode = "dark" | "light"

type ThemeContextType = {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Intentar obtener el tema guardado, o usar 'dark' por defecto
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme-mode")
      return (savedTheme as ThemeMode) || "dark"
    }
    return "dark"
  })

  // Actualizar el tema y guardar la preferencia
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "dark" ? "light" : "dark"
      if (typeof window !== "undefined") {
        localStorage.setItem("theme-mode", newMode)
      }
      return newMode
    })
  }

  // Aplicar la clase al body para CSS global
  useEffect(() => {
    const body = document.body
    if (mode === "light") {
      body.classList.add("light-mode")
    } else {
      body.classList.remove("light-mode")
    }
  }, [mode])

  return <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider")
  }
  return context
}
