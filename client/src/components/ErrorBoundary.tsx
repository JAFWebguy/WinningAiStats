import React from 'react';
import { Card } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">Something went wrong</h2>
          <p className="text-sm text-red-600 dark:text-red-300 mt-2">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </Card>
      );
    }

    return this.props.children;
  }
}
