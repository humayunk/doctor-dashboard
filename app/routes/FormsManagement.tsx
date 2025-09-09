import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Copy,
  Archive,
  Eye,
  Users,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  BarChart3
} from "lucide-react";

interface FormData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived' | 'published';
  patientCount: number;
  completionRate: number;
  lastModified: Date;
  createdDate: Date;
  category: string;
  questions: number;
}

const mockForms: FormData[] = [
  {
    id: '1',
    name: 'Fertility Assessment Form',
    description: 'Comprehensive fertility evaluation questionnaire',
    status: 'active',
    patientCount: 24,
    completionRate: 87,
    lastModified: new Date('2024-01-15'),
    createdDate: new Date('2024-01-01'),
    category: 'Fertility',
    questions: 45
  },
  {
    id: '2',
    name: 'Patient Intake Form',
    description: 'Initial patient registration and medical history',
    status: 'published',
    patientCount: 156,
    completionRate: 92,
    lastModified: new Date('2024-01-14'),
    createdDate: new Date('2023-12-15'),
    category: 'General',
    questions: 32
  },
  {
    id: '3',
    name: 'Treatment Follow-up',
    description: 'Post-treatment monitoring and feedback',
    status: 'draft',
    patientCount: 0,
    completionRate: 0,
    lastModified: new Date('2024-01-16'),
    createdDate: new Date('2024-01-10'),
    category: 'Follow-up',
    questions: 18
  },
  {
    id: '4',
    name: 'Consent Form - IVF',
    description: 'Informed consent for IVF procedures',
    status: 'archived',
    patientCount: 89,
    completionRate: 95,
    lastModified: new Date('2023-11-20'),
    createdDate: new Date('2023-10-01'),
    category: 'Consent',
    questions: 28
  }
];

export default function FormsManagement() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const loadForms = async () => {
      // Simulate loading from API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setForms(mockForms);
      setIsLoading(false);
    };

    loadForms();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'published':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Eye className="h-3 w-3 mr-1" />
            Published
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case 'archived':
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            <Archive className="h-3 w-3 mr-1" />
            Archived
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || form.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    total: forms.length,
    active: forms.filter(f => f.status === 'active').length,
    published: forms.filter(f => f.status === 'published').length,
    draft: forms.filter(f => f.status === 'draft').length,
    archived: forms.filter(f => f.status === 'archived').length,
  };

  const totalPatients = forms.reduce((sum, form) => sum + form.patientCount, 0);
  const avgCompletionRate = forms.length > 0 ? 
    Math.round(forms.reduce((sum, form) => sum + form.completionRate, 0) / forms.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forms Management</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and track your patient forms
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="medical-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create New Form
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>
                Choose a template or start from scratch to create a new patient form.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Blank Form
                    </CardTitle>
                    <CardDescription>
                      Start with an empty form and build from scratch
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Patient Intake
                    </CardTitle>
                    <CardDescription>
                      Pre-built template for patient registration
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Assessment
                    </CardTitle>
                    <CardDescription>
                      Medical assessment and evaluation form
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Consent Form
                    </CardTitle>
                    <CardDescription>
                      Template for informed consent documents
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <p className="text-xs text-muted-foreground">
              {statusCounts.active + statusCounts.published} active
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              Across all forms
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Form completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Forms</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.draft}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.published}</div>
            <p className="text-xs text-muted-foreground">
              Live forms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-lg">Forms Library</CardTitle>
          <CardDescription>
            Manage and organize your patient forms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search forms</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search forms by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter">Status:</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Forms Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-6 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-8 bg-gray-200 rounded animate-pulse"></div></TableCell>
                    </TableRow>
                  ))
                ) : filteredForms.length > 0 ? (
                  filteredForms.map((form) => (
                    <TableRow key={form.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{form.name}</div>
                          <div className="text-sm text-muted-foreground">{form.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {form.category} • {form.questions} questions
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{form.patientCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${form.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{form.completionRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {form.lastModified.toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {searchTerm || statusFilter !== "all" 
                        ? 'No forms found matching your criteria.' 
                        : 'No forms yet. Create your first form to get started.'
                      }
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
