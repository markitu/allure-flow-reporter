
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCount: number;
  estimatedDuration: string;
  priority: "high" | "medium" | "low";
  tags: string[];
}

const testSuites: TestSuite[] = [
  {
    id: "regression",
    name: "Regression Tests",
    description: "Complete regression test suite covering all major functionalities",
    testCount: 245,
    estimatedDuration: "45 min",
    priority: "high",
    tags: ["regression", "full-coverage", "critical"]
  },
  {
    id: "smoke",
    name: "Smoke Tests",
    description: "Basic functionality tests to verify core features",
    testCount: 32,
    estimatedDuration: "8 min",
    priority: "high",
    tags: ["smoke", "quick", "essential"]
  },
  {
    id: "hotfix",
    name: "Hotfix Tests",
    description: "Critical path tests for emergency deployments",
    testCount: 18,
    estimatedDuration: "5 min",
    priority: "high",
    tags: ["hotfix", "critical", "deployment"]
  },
  {
    id: "integration",
    name: "Integration Tests",
    description: "API and service integration validation tests",
    testCount: 67,
    estimatedDuration: "20 min",
    priority: "medium",
    tags: ["integration", "api", "services"]
  },
  {
    id: "ui",
    name: "UI Tests",
    description: "User interface and visual regression tests",
    testCount: 89,
    estimatedDuration: "15 min",
    priority: "medium",
    tags: ["ui", "visual", "frontend"]
  },
  {
    id: "performance",
    name: "Performance Tests",
    description: "Load testing and performance benchmarks",
    testCount: 25,
    estimatedDuration: "30 min",
    priority: "low",
    tags: ["performance", "load", "benchmarks"]
  }
];

const TestExecution = () => {
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const runTestSuite = async (suiteId: string) => {
    setRunningTests(prev => new Set([...prev, suiteId]));
    setProgress(prev => ({ ...prev, [suiteId]: 0 }));

    toast({
      title: "Test Execution Started",
      description: `Running ${testSuites.find(s => s.id === suiteId)?.name}...`,
    });

    // Simulate test execution with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const currentProgress = prev[suiteId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setRunningTests(prevRunning => {
            const newRunning = new Set(prevRunning);
            newRunning.delete(suiteId);
            return newRunning;
          });
          
          toast({
            title: "Test Execution Complete",
            description: `${testSuites.find(s => s.id === suiteId)?.name} finished successfully!`,
          });
          
          return prev;
        }
        return { ...prev, [suiteId]: currentProgress + Math.random() * 15 };
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testSuites.map((suite) => (
          <Card key={suite.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{suite.name}</CardTitle>
                  <CardDescription className="mt-2">{suite.description}</CardDescription>
                </div>
                <Badge className={getPriorityColor(suite.priority)} variant="outline">
                  {suite.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {suite.testCount} tests
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {suite.estimatedDuration}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {suite.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {runningTests.has(suite.id) && (
                  <div className="space-y-2">
                    <Progress value={progress[suite.id] || 0} className="w-full" />
                    <p className="text-sm text-slate-600">
                      Running... {Math.round(progress[suite.id] || 0)}%
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => runTestSuite(suite.id)}
                  disabled={runningTests.has(suite.id)}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {runningTests.has(suite.id) ? "Running..." : "Run Tests"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestExecution;
