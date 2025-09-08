import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { QuestionnaryLayout } from "@/routes/layouts/QuestionnaryLayout";
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
  Plus, 
  Mail, 
  Copy, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Ban,
  Search,
  Filter,
  Download
} from "lucide-react";
import type Collector from "hds-lib-js/types/appTemplates/Collector";
import type CollectorInvite from "hds-lib-js/types/appTemplates/CollectorInvite";

function ModernPatientsTable({ collector }: { collector: Collector }) {
  const [patientsList, setPatientList] = useState<CollectorInvite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPatients = async () => {
      try {
        // check inbox for new incoming accepted requests
        console.log("Patient table use effects", { collector });
        const newCollectorInvites = await collector.checkInbox();
        console.log("## new patients inbox ", newCollectorInvites);

        // get all patients
        const invites = await collector.getInvites();
        invites.sort(
          (a, b) => b.dateCreation.getTime() - a.dateCreation.getTime(),
        ); // sort by creation date reverse
        setPatientList(invites);
      } catch (error) {
        console.error('Error loading patients:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPatients();
  }, [collector]);

  const filteredPatients = patientsList.filter(patient =>
    patient.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    active: patientsList.filter(p => p.status === 'active').length,
    pending: patientsList.filter(p => p.status === 'pending').length,
    refused: patientsList.filter(p => p.status === 'refused').length,
    revoked: patientsList.filter(p => p.status === 'revoked').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Data</h2>
          <p className="text-muted-foreground mt-1">
            Manage and track patient form submissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="medical-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientsList.length}</div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {statusCounts.active + statusCounts.pending}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-lg">Patient Management</CardTitle>
          <CardDescription>
            Search and manage patient form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search patients</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search patients by name or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Patients Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Patient Reference</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><div className="h-6 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse"></div></TableCell>
                      <TableCell><div className="h-8 bg-gray-200 rounded animate-pulse"></div></TableCell>
                    </TableRow>
                  ))
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <PatientRow key={patient.key} patient={patient} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No patients found matching your search.' : 'No patients yet.'}
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

function PatientRow({ patient }: { patient: CollectorInvite }) {
  const { t } = useTranslation();
  const [sharingLink, setSharingLink] = useState<string | null>(null);

  useEffect(() => {
    const loadLink = async () => {
      if (patient.status !== "pending") return;
      try {
        const inviteSharingData = await patient.getSharingData();
        const patientURL = "https://demo-forms.datasafe.dev/patient.html";
        setSharingLink(
          `${patientURL}?apiEndpoint=${inviteSharingData.apiEndpoint}&eventId=${inviteSharingData.eventId}`,
        );
      } catch (error) {
        console.error('Error loading sharing link:', error);
      }
    };
    loadLink();
  }, [patient]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t("active")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            {t("pending")}
          </Badge>
        );
      case "refused":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            {t("refused")}
          </Badge>
        );
      case "revoked":
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            <Ban className="h-3 w-3 mr-1" />
            {t("revoked")}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  const handleEmailLink = (link: string) => {
    const subject = t("emailSubject");
    const body = t("emailBody", { link });
    const href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.open(href);
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>{getStatusBadge(patient.status)}</TableCell>
      <TableCell className="font-medium">{patient.displayName}</TableCell>
      <TableCell className="text-muted-foreground">
        {patient.dateCreation.toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {patient.status === "active" ? (
            <Button variant="outline" size="sm" asChild>
              <a href={`/patients/${patient.collector.id}/${patient.key}`}>
                <Eye className="h-4 w-4 mr-1" />
                {t("viewData")}
              </a>
            </Button>
          ) : patient.status === "pending" ? (
            <>
              {sharingLink ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEmailLink(sharingLink)}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    {t("sendByEmail")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink(sharingLink)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {t("copyToClipboard")}
                  </Button>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">{t("loading")}</span>
              )}
            </>
          ) : (
            <span className="text-sm text-muted-foreground">No actions available</span>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function PatientsTab() {
  return (
    <QuestionnaryLayout
      render={(collector: Collector) => {
        return <ModernPatientsTable collector={collector} />;
      }}
    />
  );
}
