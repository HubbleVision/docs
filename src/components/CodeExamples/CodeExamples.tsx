import React, { useEffect, useState } from "react";
import ShikiHighlighter, {
  createHighlighterCore,
  createJavaScriptRegexEngine,
} from "react-shiki/core";
import styles from "./styles.module.css";

// Define the type for a code example
export interface CodeExample {
  language: "curl" | "javascript" | "python";
  label: string;
  code: string;
}

interface CodeExamplesProps {
  examples: CodeExample[];
  className?: string;
}

export default function CodeExamples({
  examples,
  className = "",
}: CodeExamplesProps): React.ReactNode {
  const [activeTab, setActiveTab] = useState<string>(
    examples[0]?.language || "curl"
  );
  const [highlighter, setHighlighter] = useState<any>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Initialize highlighter with minimal bundle
  useEffect(() => {
    const initHighlighter = async () => {
      try {
        const highlighterInstance = await createHighlighterCore({
          themes: [
            import("@shikijs/themes/github-dark"),
            import("@shikijs/themes/github-light"),
          ],
          langs: [
            import("@shikijs/langs/bash"), // for curl
            import("@shikijs/langs/javascript"),
            import("@shikijs/langs/python"),
          ],
          engine: createJavaScriptRegexEngine(),
        });
        setHighlighter(highlighterInstance);
      } catch (error) {
        console.error("Failed to initialize syntax highlighter:", error);
      }
    };

    initHighlighter();
  }, []);

  // Handle copy to clipboard with toast
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setShowToast(true);
      // Auto hide toast after 2 seconds
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const activeExample =
    examples.find((example) => example.language === activeTab) || examples[0];

  if (!activeExample) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Code Examples</h3>
        <div className={styles.tabs}>
          {examples.map((example) => (
            <button
              key={example.language}
              className={`${styles.tab} ${
                activeTab === example.language ? styles.active : ""
              }`}
              onClick={() => setActiveTab(example.language)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.codeContainer}>
        {highlighter ? (
          <ShikiHighlighter
            highlighter={highlighter}
            language={
              activeExample.language === "curl"
                ? "bash"
                : activeExample.language
            }
            theme="github-dark"
            className={styles.codeBlock}
          >
            {activeExample.code.trim()}
          </ShikiHighlighter>
        ) : (
          <pre className={styles.fallbackCode}>
            <code>{activeExample.code.trim()}</code>
          </pre>
        )}

        <button
          className={styles.copyButton}
          onClick={() => handleCopy(activeExample.code)}
          title="Copy code to clipboard"
        >
          📋
        </button>

        {/* Toast notification */}
        {showToast && (
          <div className={styles.toast}>
            <span className={styles.toastIcon}>✅</span>
            <span className={styles.toastText}>Code copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
}
