"use client";

import DotPatternDemo from "@/app/BackGround";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.replace("/dashboard");
    } else {
      setError(data.error || t.login?.error || "خطا در ورود");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <DotPatternDemo />
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl dark:text-white">
              {t.login?.title || "Welcome Back"}
            </CardTitle>
            <CardDescription className="dark:text-gray-300">
              {t.login?.subtitle || "Sign in to your account to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="dark:text-gray-200">
                  {t.login?.emailLabel || "Email"}
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t.login?.emailPlaceholder || "Enter your email"}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-gray-200">
                  {t.login?.passwordLabel || "Password"}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={t.login?.passwordPlaceholder || "Enter your password"}
                    className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                {t.login?.submitButton || "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}