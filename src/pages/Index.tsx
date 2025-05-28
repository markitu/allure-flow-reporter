
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestExecution from "@/components/TestExecution";
import TestResults from "@/components/TestResults";
import { Play, BarChart3 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("execution");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{t('title')}</h1>
          <p className="text-slate-600 text-lg">{t('subtitle')}</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="execution" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              {t('testExecution')}
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {t('results')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="execution">
            <TestExecution />
          </TabsContent>
          
          <TabsContent value="results">
            <TestResults />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
