import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

interface TestOverviewChartsProps {
  testResults: any;
}

const TestOverviewCharts = ({ testResults }: TestOverviewChartsProps) => {
  const { t } = useTranslation();
  
  const statusData = [
    { name: t('passed'), value: testResults.summary.passed, color: "#22c55e" },
    { name: t('failed'), value: testResults.summary.failed, color: "#ef4444" },
    { name: t('skipped'), value: testResults.summary.skipped, color: "#eab308" },
  ];

  const categoryData = testResults.tests.reduce((acc: any, test: any) => {
    const category = test.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const timelineData = [
    { time: "0-5min", passed: 45, failed: 2 },
    { time: "5-10min", passed: 38, failed: 5 },
    { time: "10-15min", passed: 42, failed: 1 },
    { time: "15-20min", passed: 35, failed: 3 },
    { time: "20-25min", passed: 28, failed: 2 },
  ];

  const durationData = testResults.tests.map((test: any, index: number) => ({
    name: test.name.substring(0, 20) + "...",
    duration: parseFloat(test.duration.replace('s', '')),
  })).sort((a: any, b: any) => b.duration - a.duration).slice(0, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Status Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('testStatusDistribution')}</CardTitle>
          <CardDescription>{t('overallTestResults')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('testsByCategory')}</CardTitle>
          <CardDescription>{t('distributionAcrossCategories')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Execution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>{t('executionTimeline')}</CardTitle>
          <CardDescription>{t('testResultsOverTime')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="passed" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Longest Running Tests */}
      <Card>
        <CardHeader>
          <CardTitle>{t('longestRunningTests')}</CardTitle>
          <CardDescription>{t('highestExecutionDuration')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={durationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="duration" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestOverviewCharts;
