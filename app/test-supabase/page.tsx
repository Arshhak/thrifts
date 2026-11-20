"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Database,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface ConnectionResult {
  status: "idle" | "testing" | "success" | "error";
  host: string;
  keyConfigured: boolean;
  keyPreview: string;
  latencyMs: number | null;
  authStatus: string;
  dbStatus: string;
  message: string;
  timestamp: string;
}

export default function SupabaseTestPage() {
  const [result, setResult] = useState<ConnectionResult>({
    status: "testing",
    host: "",
    keyConfigured: false,
    keyPreview: "",
    latencyMs: null,
    authStatus: "Pending",
    dbStatus: "Pending",
    message: "Initiating connection test...",
    timestamp: "",
  });

  const runTest = useCallback(async () => {
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const rawKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "";

    let host = "Not configured";
    try {
      if (rawUrl) host = new URL(rawUrl).hostname;
    } catch {
      host = "Invalid URL format";
    }

    const keyConfigured = Boolean(rawKey && rawKey.length > 10);
    const keyPreview = keyConfigured
      ? `${rawKey.slice(0, 14)}•••••••• (${rawKey.length} chars)`
      : "Missing / Not set";

    if (!rawUrl || !keyConfigured) {
      setResult({
        status: "error",
        host,
        keyConfigured,
        keyPreview,
        latencyMs: null,
        authStatus: "Unavailable",
        dbStatus: "Unavailable",
        message:
          "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
        timestamp: new Date().toLocaleTimeString(),
      });
      return;
    }

    setResult((prev) => ({
      ...prev,
      status: "testing",
      host,
      keyConfigured,
      keyPreview,
      message: "Verifying connection to Supabase services...",
    }));

    const startTime = performance.now();

    try {
      // 1. Test Auth service reachability
      const { error: authError } = await supabase.auth.getSession();
      const elapsed = Math.round(performance.now() - startTime);

      if (authError) {
        throw new Error(`Supabase Auth error: ${authError.message}`);
      }

      // 2. Test PostgREST Database API connection
      // A 200/204 or 404 (schema cache) response confirms authentication and active gateway
      const { status: dbHttpStatus, error: dbError } = await supabase
        .from("products")
        .select("count", { count: "exact", head: true });

      const isDbGatewayReachable =
        dbHttpStatus === 200 ||
        dbHttpStatus === 204 ||
        (dbError && dbHttpStatus === 404) ||
        !dbError;

      setResult({
        status: "success",
        host,
        keyConfigured: true,
        keyPreview,
        latencyMs: elapsed,
        authStatus: "Active & Responding",
        dbStatus: isDbGatewayReachable
          ? "Connected & Authenticated"
          : `HTTP ${dbHttpStatus}`,
        message: "Successfully connected to Supabase backend services.",
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown connection failure";
      setResult({
        status: "error",
        host,
        keyConfigured,
        keyPreview,
        latencyMs: null,
        authStatus: "Failed",
        dbStatus: "Failed",
        message: errorMessage,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      runTest();
    }, 0);
    return () => clearTimeout(timer);
  }, [runTest]);

  return (
    <div className="min-h-screen bg-[#E5E5E7] text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#686868] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#D0D0D3] pb-6 mb-8">
          <p className="text-[#A32626] text-xs font-bold uppercase tracking-widest mb-1">
            Backend Integration
          </p>
          <h1
            className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Supabase Connection
          </h1>
          <p className="text-sm text-[#686868] mt-2">
            Verification status for KK Thrifts Supabase project client.
          </p>
        </div>

        {/* Primary Status Card */}
        <div className="bg-[#171717] text-white p-6 sm:p-8 mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {result.status === "testing" && (
                <Loader2 className="w-8 h-8 text-[#E5E5E7] animate-spin flex-shrink-0" />
              )}
              {result.status === "success" && (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              )}
              {result.status === "error" && (
                <XCircle className="w-8 h-8 text-[#A32626] flex-shrink-0" />
              )}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                  Status
                </span>
                <span
                  className="text-xl sm:text-2xl font-black uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {result.status === "testing" && "Checking Connection..."}
                  {result.status === "success" && "Supabase Connected"}
                  {result.status === "error" && "Connection Error"}
                </span>
              </div>
            </div>

            <button
              onClick={runTest}
              disabled={result.status === "testing"}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={result.status === "testing" ? "animate-spin" : ""}
              />
              Test Again
            </button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-white/70 font-mono border-t border-white/10 pt-4">
            {result.message}
          </p>
        </div>

        {/* Diagnostic Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Host */}
          <div className="bg-white p-5 border border-[#D0D0D3]">
            <div className="flex items-center gap-2 text-[#686868] text-xs font-bold uppercase tracking-wider mb-2">
              <Server size={16} />
              Project Host
            </div>
            <p className="text-sm font-mono font-semibold break-all text-[#111111]">
              {result.host || "Loading..."}
            </p>
            <p className="text-[11px] text-[#686868] mt-1">
              Read from NEXT_PUBLIC_SUPABASE_URL
            </p>
          </div>

          {/* Key Status */}
          <div className="bg-white p-5 border border-[#D0D0D3]">
            <div className="flex items-center gap-2 text-[#686868] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={16} />
              Public Key Status
            </div>
            <p className="text-sm font-mono font-semibold text-[#111111]">
              {result.keyPreview || "Loading..."}
            </p>
            <p className="text-[11px] text-[#686868] mt-1">
              Safe publishable/anon key (no secret keys exposed)
            </p>
          </div>

          {/* Auth Service */}
          <div className="bg-white p-5 border border-[#D0D0D3]">
            <div className="flex items-center gap-2 text-[#686868] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap size={16} />
              Auth Gateway
            </div>
            <p className="text-sm font-semibold text-[#111111]">
              {result.authStatus}
            </p>
            <p className="text-[11px] text-[#686868] mt-1">
              GoTrue auth session endpoint
            </p>
          </div>

          {/* Database / PostgREST */}
          <div className="bg-white p-5 border border-[#D0D0D3]">
            <div className="flex items-center gap-2 text-[#686868] text-xs font-bold uppercase tracking-wider mb-2">
              <Database size={16} />
              Database Gateway
            </div>
            <p className="text-sm font-semibold text-[#111111]">
              {result.dbStatus}
            </p>
            <p className="text-[11px] text-[#686868] mt-1">
              PostgREST REST endpoint
            </p>
          </div>
        </div>

        {/* Latency and Meta footer */}
        {result.latencyMs !== null && (
          <div className="bg-[#D0D0D3]/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#686868] gap-2">
            <span>
              Roundtrip Response Time:{" "}
              <strong className="text-[#111111]">{result.latencyMs} ms</strong>
            </span>
            <span>Last checked: {result.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}
