import React from 'react';
import { cn } from '../lib/utils';
import { Info } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
}

interface InfoPanelProps {
  title?: string;
  notes?: string[];
  tableData?: any[];
  tableColumns?: Column[];
  className?: string;
  icon?: boolean;
}

export function InfoPanel({ title, notes, tableData, tableColumns, className, icon = true }: InfoPanelProps) {
  return (
    <div className={cn("bg-secondary/50 rounded-2xl p-6 border border-border overflow-hidden", className)} data-testid={`infopanel-${title?.replace(/\s+/g, '-').toLowerCase()}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <Info className="h-5 w-5 text-primary" />}
          <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        </div>
      )}
      
      {tableData && tableColumns && tableData.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card mb-5">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/80 border-b border-border">
              <tr>
                {tableColumns.map((col, i) => (
                  <th key={i} className="px-4 py-3 font-medium tracking-wider">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className={cn("border-b border-border last:border-0", i % 2 === 0 ? "bg-card" : "bg-secondary/20")}>
                  {tableColumns.map((col, j) => (
                    <td key={j} className="px-4 py-3 align-top text-foreground leading-relaxed">
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {notes && notes.length > 0 && (
        <ul className="space-y-2.5">
          {notes.map((note, idx) => (
            <li key={idx} className="flex items-start text-sm text-muted-foreground leading-relaxed">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
