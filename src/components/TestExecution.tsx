
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

const TestExecution = () => {
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { t } = useTranslation();

  const testSuites: TestSuite[] = [
    {
      id: "regression",
      name: t('testSuites.regression.name'),
      description: t('testSuites.regression.description'),
      testCount: 245,
      estimatedDuration: "45 min",
      priority: "high",
      tags: ["regression", "full-coverage", "critical"]
    },
    {
      id: "smoke",
      name: t('testSuites.smoke.name'),
      description: t('testSuites.smoke.description'),
      testCount: 32,
      estimatedDuration: "8 min",
      priority: "high",
      tags: ["smoke", "quick", "essential"]
    },
    {
      id: "hotfix",
      name: t('testSuites.hotfix.name'),
      description: t('testSuites.hotfix.description'),
      testCount: 18,
      estimatedDuration: "5 min",
      priority: "high",
      tags: ["hotfix", "critical", "deployment"]
    },
    {
      id: "integration",
      name: t('testSuites.integration.name'),
      description: t('testSuites.integration.description'),
      testCount: 67,
      estimatedDuration: "20 min",
      priority: "medium",
      tags: ["integration", "api", "services"]
    },
    {
      id: "ui",
      name: t('testSuites.ui.name'),
      description: t('testSuites.ui.description'),
      testCount: 89,
      estimatedDuration: "15 min",
      priority: "medium",
      tags: ["ui", "visual", "frontend"]
    },
    {
      id: "performance",
      name: t('testSuites.performance.name'),
      description: t('testSuites.performance.description'),
      testCount: 25,
      estimatedDuration: "30 min",
      priority: "low",
      tags: ["performance", "load", "benchmarks"]
    }
  ];

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
      title: t('testExecutionStarted'),
      description: `${t('running')} ${testSuites.find(s => s.id === suiteId)?.name}...`,
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
            title: t('testExecutionComplete'),
            description: `${testSuites.find(s => s.id === suiteId)?.name} ${t('finishedSuccessfully')}`,
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
                  {t(`priority.${suite.priority}`)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {suite.testCount} {t('tests')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {t('estimatedTime', { time: suite.estimatedDuration })}
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
                      {t('running')} {Math.round(progress[suite.id] || 0)}%
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => runTestSuite(suite.id)}
                  disabled={runningTests.has(suite.id)}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {runningTests.has(suite.id) ? t('running') : t('runTests')}
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
