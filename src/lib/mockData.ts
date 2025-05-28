
export const mockTestResults = [
  {
    id: "run-001",
    suiteName: "Regression Tests",
    status: "failed" as const,
    timestamp: "2024-01-15T10:30:00Z",
    duration: "42m 15s",
    author: "Alice Johnson",
    summary: {
      total: 245,
      passed: 230,
      failed: 12,
      skipped: 3
    },
    tests: [
      {
        id: "test-001",
        name: "User Authentication Flow",
        status: "passed" as const,
        duration: "2.5s",
        category: "Authentication"
      },
      {
        id: "test-002",
        name: "Database Connection Test",
        status: "failed" as const,
        duration: "5.2s",
        category: "Infrastructure",
        error: "Connection timeout after 5000ms",
        stackTrace: `Error: Connection timeout
  at Database.connect (database.js:45)
  at TestRunner.run (runner.js:123)
  at async executeTest (executor.js:67)`
      },
      {
        id: "test-003",
        name: "API Response Validation",
        status: "passed" as const,
        duration: "1.8s",
        category: "API"
      },
      {
        id: "test-004",
        name: "UI Button Click Handler",
        status: "skipped" as const,
        duration: "0s",
        category: "UI"
      },
      {
        id: "test-005",
        name: "File Upload Functionality",
        status: "passed" as const,
        duration: "3.1s",
        category: "File Operations"
      },
      {
        id: "test-006",
        name: "Email Notification Service",
        status: "failed" as const,
        duration: "10.5s",
        category: "Notifications",
        error: "SMTP server unreachable",
        stackTrace: `Error: SMTP connection failed
  at EmailService.send (email.js:78)
  at NotificationHandler.process (handler.js:34)`
      },
      {
        id: "test-007",
        name: "Shopping Cart Calculation",
        status: "passed" as const,
        duration: "0.9s",
        category: "E-commerce"
      },
      {
        id: "test-008",
        name: "User Profile Update",
        status: "passed" as const,
        duration: "2.2s",
        category: "User Management"
      },
      {
        id: "test-009",
        name: "Search Functionality",
        status: "passed" as const,
        duration: "4.1s",
        category: "Search"
      },
      {
        id: "test-010",
        name: "Payment Processing",
        status: "passed" as const,
        duration: "6.3s",
        category: "Payments"
      }
    ]
  },
  {
    id: "run-002",
    suiteName: "Smoke Tests",
    status: "passed" as const,
    timestamp: "2024-01-15T09:15:00Z",
    duration: "8m 32s",
    author: "Bob Smith",
    summary: {
      total: 32,
      passed: 32,
      failed: 0,
      skipped: 0
    },
    tests: [
      {
        id: "smoke-001",
        name: "Homepage Load Test",
        status: "passed" as const,
        duration: "1.2s",
        category: "UI"
      },
      {
        id: "smoke-002",
        name: "Login Page Accessibility",
        status: "passed" as const,
        duration: "0.8s",
        category: "Authentication"
      },
      {
        id: "smoke-003",
        name: "API Health Check",
        status: "passed" as const,
        duration: "0.5s",
        category: "API"
      }
    ]
  },
  {
    id: "run-003",
    suiteName: "Hotfix Tests",
    status: "passed" as const,
    timestamp: "2024-01-15T08:45:00Z",
    duration: "5m 18s",
    author: "Carol Williams",
    summary: {
      total: 18,
      passed: 18,
      failed: 0,
      skipped: 0
    },
    tests: [
      {
        id: "hotfix-001",
        name: "Critical Bug Fix Validation",
        status: "passed" as const,
        duration: "2.1s",
        category: "Bug Fixes"
      },
      {
        id: "hotfix-002",
        name: "Security Patch Verification",
        status: "passed" as const,
        duration: "1.5s",
        category: "Security"
      }
    ]
  },
  {
    id: "run-004",
    suiteName: "Integration Tests",
    status: "failed" as const,
    timestamp: "2024-01-15T07:30:00Z",
    duration: "15m 45s",
    author: "Alice Johnson",
    summary: {
      total: 56,
      passed: 52,
      failed: 3,
      skipped: 1
    },
    tests: [
      {
        id: "int-001",
        name: "Third Party API Integration",
        status: "failed" as const,
        duration: "8.2s",
        category: "API",
        error: "Rate limit exceeded",
        stackTrace: `Error: 429 Too Many Requests
  at APIClient.request (api.js:156)
  at IntegrationTest.run (test.js:45)`
      },
      {
        id: "int-002",
        name: "Database Migration Test",
        status: "passed" as const,
        duration: "12.5s",
        category: "Database"
      }
    ]
  },
  {
    id: "run-005",
    suiteName: "Performance Tests",
    status: "passed" as const,
    timestamp: "2024-01-14T16:20:00Z",
    duration: "28m 12s",
    author: "David Chen",
    summary: {
      total: 24,
      passed: 24,
      failed: 0,
      skipped: 0
    },
    tests: [
      {
        id: "perf-001",
        name: "Load Testing - 1000 Users",
        status: "passed" as const,
        duration: "25.8s",
        category: "Performance"
      },
      {
        id: "perf-002",
        name: "Memory Usage Analysis",
        status: "passed" as const,
        duration: "18.3s",
        category: "Performance"
      }
    ]
  }
];
