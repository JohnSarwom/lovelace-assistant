
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  FileUp, 
  Link2, 
  Trash2, 
  Search, 
  Tag, 
  File, 
  FileText, 
  FileCode, 
  Filter, 
  Info,
  Loader2,
  Clock,
  Upload,
  Database,
  Folder
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv' | 'json' | 'url';
  size: string;
  tags: string[];
  date: Date;
  status: 'processing' | 'complete' | 'error';
}

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Company Handbook.pdf',
      type: 'pdf',
      size: '2.4 MB',
      tags: ['HR', 'Guidelines'],
      date: new Date('2023-09-15'),
      status: 'complete'
    },
    {
      id: '2',
      name: 'Q3 Financial Report.docx',
      type: 'docx',
      size: '1.7 MB',
      tags: ['Finance', 'Reports'],
      date: new Date('2023-10-05'),
      status: 'complete'
    },
    {
      id: '3',
      name: 'Technical Documentation.txt',
      type: 'txt',
      size: '356 KB',
      tags: ['Technical', 'Documentation'],
      date: new Date('2023-10-10'),
      status: 'processing'
    },
    {
      id: '4',
      name: 'Customer Feedback.csv',
      type: 'csv',
      size: '890 KB',
      tags: ['Feedback', 'Data'],
      date: new Date('2023-10-12'),
      status: 'error'
    }
  ]);
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return <FileText size={18} className="text-red-500" />;
      case 'docx':
        return <FileText size={18} className="text-blue-500" />;
      case 'txt':
        return <File size={18} className="text-gray-500" />;
      case 'csv':
        return <FileCode size={18} className="text-green-500" />;
      case 'json':
        return <FileCode size={18} className="text-amber-500" />;
      case 'url':
        return <Link2 size={18} className="text-purple-500" />;
      default:
        return <File size={18} />;
    }
  };
  
  const handleFileUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: 'New Upload.pdf',
        type: 'pdf',
        size: '1.2 MB',
        tags: ['New'],
        date: new Date(),
        status: 'processing'
      };
      setDocuments(prev => [newDoc, ...prev]);
      setUploading(false);
    }, 2000);
  };
  
  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  return (
    <div className="container mx-auto px-4 py-6 animate-in">
      <Card className="glass-card w-full max-w-5xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Database className="text-primary" size={20} />
                Knowledge Base
              </CardTitle>
              <CardDescription className="mt-2">
                Upload documents and websites to train your AI assistant
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleFileUpload}
                disabled={uploading}
                className="gap-1"
              >
                {uploading ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <FileUp size={16} className="mr-2" />
                )}
                Upload
              </Button>
              <Button variant="outline" className="gap-1">
                <Link2 size={16} className="mr-2" />
                Add URL
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="documents" className="flex items-center gap-1">
                  <Folder size={14} />
                  <span>Documents</span>
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-1">
                  <Tag size={14} />
                  <span>Categories</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-1">
                  <Info size={14} />
                  <span>Stats</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[250px]"
                />
              </div>
            </div>
            
            <TabsContent value="documents" className="mt-0">
              <div className="border rounded-lg border-border">
                <div className="flex items-center justify-between p-3 bg-muted/40 text-sm font-medium text-muted-foreground border-b border-border">
                  <div className="flex items-center gap-2">
                    <Filter size={14} />
                    <span>Filter by:</span>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      All
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      PDFs
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      Documents
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      URLs
                    </Badge>
                  </div>
                  <span className="text-xs">{filteredDocuments.length} documents</span>
                </div>
                
                <ScrollArea className="h-[400px]">
                  {filteredDocuments.length > 0 ? (
                    <div className="divide-y divide-border">
                      {filteredDocuments.map((doc) => (
                        <div key={doc.id} className="p-3 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(doc.type)}
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    {doc.date.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {doc.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              <Badge 
                                variant={doc.status === 'complete' ? "default" : doc.status === 'processing' ? "outline" : "destructive"}
                                className="ml-2 text-xs"
                              >
                                {doc.status === 'processing' && <Loader2 size={10} className="mr-1 animate-spin" />}
                                {doc.status === 'complete' ? 'Indexed' : doc.status === 'processing' ? 'Processing' : 'Failed'}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => deleteDocument(doc.id)}
                              >
                                <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                      <FileUp size={48} className="text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium">No documents found</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        {searchQuery
                          ? `No documents matching "${searchQuery}"`
                          : "Upload documents or add URLs to build your knowledge base"}
                      </p>
                      {searchQuery && (
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => setSearchQuery('')}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="mt-0">
              <div className="border rounded-lg border-border h-[400px] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Tag size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">Categories</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Organize your knowledge base with categories and tags
                  </p>
                  <Button variant="outline" className="mt-4">
                    Create categories
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <div className="border rounded-lg border-border h-[400px] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Info size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">Knowledge Base Stats</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track usage, performance, and insights about your knowledge base
                  </p>
                  <Button variant="outline" className="mt-4">
                    View analytics
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground border-t border-border pt-4">
          <div className="flex items-center">
            <Upload size={14} className="mr-2" />
            <span>Drag and drop files to upload</span>
          </div>
          <div>
            <span>Max file size: 50 MB</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
