
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, AlertCircle, TrendingUp, Calendar, User } from "lucide-react";
import TestOverviewCharts from "@/components/TestOverviewCharts";
import TestDetailsList from "@/components/TestDetailsList";
import { mockTestResults } from "@/lib/mockData";

const TestResults = () => {
  const [selectedExecution, setSelectedExecution] = useState(mockTestResults[0]);
  const [authorFilter, setAuthorFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed": return <XCircle className="w-4 h-4 text-red-500" />;
      case "skipped": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "bg-green-100 text-green-800 border-green-200";
      case "failed": return "bg-red-100 text-red-800 border-red-200";
      case "skipped": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Filter executions by author
  const filteredExecutions = mockTestResults.filter(execution => 
    authorFilter === "all" || execution.author === authorFilter
  );

  // Get unique authors for filter dropdown
  const authors = Array.from(new Set(mockTestResults.map(execution => execution.author)));

  return (
    <div className="space-y-6">
      {/* Author Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter by Author</CardTitle>
          <CardDescription>View test executions by specific team members</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={authorFilter} onValueChange={setAuthorFilter}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map(author => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Execution History Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Executions</CardTitle>
            <CardDescription>Test run history ({filteredExecutions.length} results)</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {filteredExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedExecution.id === execution.id 
                        ? "bg-blue-50 border-blue-200" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedExecution(execution)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{execution.suiteName}</span>
                      <Badge className={getStatusColor(execution.status)} variant="outline">
                        {execution.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <User className="w-3 h-3" />
                      {execution.author}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {new Date(execution.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <Clock className="w-3 h-3" />
                      {execution.duration}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedExecution.suiteName}</CardTitle>
                  <CardDescription>
                    Executed on {new Date(selectedExecution.timestamp).toLocaleString()} by {selectedExecution.author}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedExecution.status)}
                  <Badge className={getStatusColor(selectedExecution.status)} variant="outline">
                    {selectedExecution.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
                  <TabsTrigger value="details">Test Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              {selectedExecution.summary.passed}
                            </p>
                            <p className="text-sm text-gray-600">Passed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-2xl font-bold text-red-600">
                              {selectedExecution.summary.failed}
                            </p>
                            <p className="text-sm text-gray-600">Failed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="text-2xl font-bold text-yellow-600">
                              {selectedExecution.summary.skipped}
                            </p>
                            <p className="text-sm text-gray-600">Skipped</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold text-blue-600">
                              {selectedExecution.duration}
                            </p>
                            <p className="text-sm text-gray-600">Duration</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="charts">
                  <TestOverviewCharts testResults={selectedExecution} />
                </TabsContent>
                
                <TabsContent value="details">
                  <TestDetailsList tests={selectedExecution.tests} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
