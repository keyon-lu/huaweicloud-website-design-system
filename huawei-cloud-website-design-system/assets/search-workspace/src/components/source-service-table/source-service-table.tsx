import React from 'react';
import {SourceFixedTable} from '@/components/source-fixed-table';
export type SourceServiceTableColumn={id:string;label:string};
export type SourceServiceTableRow={id:string;label:string;cells:readonly React.ReactNode[]};
export type SourceServiceTableProps={label:string;rowHeading:string;columns:readonly SourceServiceTableColumn[];rows:readonly SourceServiceTableRow[]};
/** Compatibility adapter only. New pages use SourceFixedTable. */
export function SourceServiceTable({label,rowHeading,columns,rows}:SourceServiceTableProps){
 return <SourceFixedTable caption={label} columns={[{id:'row-heading',label:rowHeading},...columns]} rows={rows} striped={false}/>;
}
