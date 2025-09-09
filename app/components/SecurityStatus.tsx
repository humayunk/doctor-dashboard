import { Shield, Lock, CheckCircle, AlertTriangle, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SecurityStatusProps {
  variant?: 'full' | 'compact' | 'inline';
  showDetails?: boolean;
}

export function SecurityStatus({ variant = 'full', showDetails = true }: SecurityStatusProps) {
  const securityFeatures = [
    {
      name: "End-to-End Encryption",
      status: "active",
      description: "All data encrypted in transit and at rest"
    },
    {
      name: "Swiss Data Sovereignty",
      status: "active", 
      description: "Data stored in Swiss data centers"
    },
    {
      name: "GDPR Compliant",
      status: "active",
      description: "Full compliance with EU data protection"
    },
    {
      name: "HIPAA Ready",
      status: "active",
      description: "Healthcare data protection standards"
    }
  ];

  if (variant === 'inline') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
        <Shield className="h-3 w-3 text-green-600" />
        <span className="text-xs text-green-700 font-medium">Swiss-Grade Security</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">Security Status</span>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Secure
        </Badge>
      </div>
    );
  }

  return (
    <Card className="medical-card border-green-200 bg-green-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <CardTitle className="text-lg text-green-800">Security & Compliance</CardTitle>
        </div>
        <CardDescription className="text-green-700">
          Your data is protected with Swiss-grade security standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {feature.status === 'active' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-800">
                  {feature.name}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    feature.status === 'active' 
                      ? 'bg-green-100 text-green-700 border-green-200' 
                      : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                  }`}
                >
                  {feature.status}
                </Badge>
              </div>
              {showDetails && (
                <p className="text-xs text-green-600 mt-1">
                  {feature.description}
                </p>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t border-green-200">
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Globe className="h-3 w-3" />
            <span>Data sovereignty guaranteed • Swiss Federal Data Protection Act</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DataEncryptionIndicator() {
  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs">
      <Lock className="h-3 w-3 text-blue-600" />
      <span className="text-blue-700 font-medium">Encrypted</span>
    </div>
  );
}

export function PrivacyConsentStatus({ status }: { status: 'granted' | 'pending' | 'revoked' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'granted':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          label: 'Consent Granted'
        };
      case 'pending':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          label: 'Consent Pending'
        };
      case 'revoked':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          label: 'Consent Revoked'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 ${config.bg} border ${config.border} rounded-full`}>
      <Icon className={`h-3 w-3 ${config.color}`} />
      <span className={`text-xs font-medium ${config.text}`}>
        {config.label}
      </span>
    </div>
  );
}
