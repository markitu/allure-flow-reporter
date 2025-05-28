
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, XCircle, AlertCircle, Clock, Search, ChevronDown, ChevronRight } from "lucide-react";

interface Test {
  id: string;
  name: string;
  status: "passed" | "failed" | "skipped";
  duration: string;
  category: string;
  error?: string;
  stackTrace?: string;
}

interface TestDetailsListProps {
  tests: Test[];
}

const TestDetailsList = ({ tests }: TestDetailsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

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

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || test.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || test.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(tests.map(test => test.category)));

  return (
    <div className="space-y-6 mt-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Tests</CardTitle>
          <CardDescription>Search and filter test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results ({filteredTests.length})</CardTitle>
          <CardDescription>Detailed test execution results</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {filteredTests.map((test) => (
                <Collapsible
                  key={test.id}
                  open={expandedTest === test.id}
                  onOpenChange={(open) => setExpandedTest(open ? test.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        {expandedTest === test.id ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                        {getStatusIcon(test.status)}
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-sm text-gray-600">{test.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(test.status)} variant="outline">
                          {test.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          {test.duration}
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="ml-7 mt-2 p-4 bg-gray-50 rounded-lg border">
                      {test.status === "failed" && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-red-700 mb-2">Error Message:</h4>
                            <p className="text-sm text-red-600 bg-red-50 p-3 rounded border">
                              {test.error || "Test assertion failed"}
                            </p>
                          </div>
                          
                          {test.stackTrace && (
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Stack Trace:</h4>
                              <pre className="text-xs text-gray-600 bg-gray-100 p-3 rounded border overflow-x-auto">
                                {test.stackTrace}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {test.status === "passed" && (
                        <div className="text-green-700">
                          <p className="font-medium">✓ Test passed successfully</p>
                          <p className="text-sm text-green-600">Completed in {test.duration}</p>
                        </div>
                      )}
                      
                      {test.status === "skipped" && (
                        <div className="text-yellow-700">
                          <p className="font-medium">⚠ Test was skipped</p>
                          <p className="text-sm text-yellow-600">Test execution was bypassed</p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestDetailsList;
