import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
          <CardTitle>{t('filterTests')}</CardTitle>
          <CardDescription>{t('searchFilterTests')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('searchTests')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('filterByStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allStatuses')}</SelectItem>
                <SelectItem value="passed">{t('passed')}</SelectItem>
                <SelectItem value="failed">{t('failed')}</SelectItem>
                <SelectItem value="skipped">{t('skipped')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('filterByCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
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
          <CardTitle>{t('testResults_count', { count: filteredTests.length })}</CardTitle>
          <CardDescription>{t('detailedTestResults')}</CardDescription>
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
                          {t(test.status)}
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
                            <h4 className="font-medium text-red-700 mb-2">{t('errorMessage')}</h4>
                            <p className="text-sm text-red-600 bg-red-50 p-3 rounded border">
                              {test.error || t('testAssertionFailed')}
                            </p>
                          </div>
                          
                          {test.stackTrace && (
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">{t('stackTrace')}</h4>
                              <pre className="text-xs text-gray-600 bg-gray-100 p-3 rounded border overflow-x-auto">
                                {test.stackTrace}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {test.status === "passed" && (
                        <div className="text-green-700">
                          <p className="font-medium">{t('testPassedSuccessfully')}</p>
                          <p className="text-sm text-green-600">{t('completedIn', { duration: test.duration })}</p>
                        </div>
                      )}
                      
                      {test.status === "skipped" && (
                        <div className="text-yellow-700">
                          <p className="font-medium">{t('testWasSkipped')}</p>
                          <p className="text-sm text-yellow-600">{t('testExecutionBypassed')}</p>
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
