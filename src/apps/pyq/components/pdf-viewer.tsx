"use client";

import { Download, FileText, Beaker } from "lucide-react";
import { Subject } from "@/apps/pyq/lib/types";
import { getEmbedUrl, getDownloadUrl } from "@/lib/utils";

interface PDFViewerProps {
  subject: Subject & { code: string };
  type: 'pyq' | 'lab';
}

export function PDFViewer({ subject, type }: PDFViewerProps) {
  const embedUrl = getEmbedUrl(subject?.link);
  const downloadUrl = getDownloadUrl(subject?.link);

  if (!subject || !subject.link) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        {type === 'pyq' ? (
          <FileText className="h-24 w-24 mb-6 opacity-50" />
        ) : (
          <Beaker className="h-24 w-24 mb-6 opacity-50" />
        )}
        <p className="text-xl">No {type === 'pyq' ? 'PYQ' : 'lab manual'} available</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="flex-grow bg-background rounded-lg overflow-hidden border">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title={`${subject.name} PDF`}
            allow="autoplay"
            loading="lazy"
            sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
          ></iframe>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Unable to load PDF viewer
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg bg-secondary text-secondary-foreground">
        <div className="flex items-start gap-3">
          {type === 'pyq' ? (
            <FileText className="h-5 w-5 mt-1 text-primary" />
          ) : (
            <Beaker className="h-5 w-5 mt-1 text-primary" />
          )}
          <div>
            <h3 className="font-semibold">{subject.name}</h3>
            {type === 'pyq' && subject.cutoff && (
              <p className="text-sm text-muted-foreground">Cutoff: {subject.cutoff}</p>
            )}
            {type === 'lab' && subject.type && (
              <p className="text-sm text-muted-foreground">Type: {subject.type}</p>
            )}
          </div>
        </div>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}