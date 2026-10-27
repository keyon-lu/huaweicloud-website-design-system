import React from 'react';
import './source-fixed-table.css';
export type SourceFixedTableColumn={id:string;label:string};
export type SourceFixedTableRow={id:string;label:string;cells:readonly React.ReactNode[];group?:false}|{id:string;label:string;group:true;cells?:never};
export type SourceFixedTableProps={designProfile?:'source-6-columns';caption:string;columns:readonly SourceFixedTableColumn[];rows:readonly SourceFixedTableRow[];striped?:boolean;maxHeight?:number};
export function SourceFixedTable({designProfile,caption,columns,rows,striped=true,maxHeight}:SourceFixedTableProps){
 if(!caption.trim()||columns.length<2||new Set(columns.map(c=>c.id)).size!==columns.length||columns.some(c=>!c.id.trim()||!c.label.trim())||new Set(rows.map(r=>r.id)).size!==rows.length||rows.some(r=>!r.id.trim()||!r.label.trim()||!r.group&&r.cells.length!==columns.length-1)||maxHeight!==undefined&&(!Number.isFinite(maxHeight)||maxHeight<=0))throw Error('Fixed table requires a caption, unique labeled columns/rows, matching cells and positive maxHeight');
 if(designProfile&&(designProfile!=='source-6-columns'||columns.length!==6||rows.length!==8||rows.some(row=>row.group)))throw Error('Published six-column design requires six columns and its eight content rows');
 const sourceWidths=[260,267,267,267,267,272],sourceHeights=[114,166,92,64,64,64,64,144];
 const captionId=React.useId();
 return <div className={'source-fixed-table por-fixed-table-container'+(designProfile?' source-design-table-6':'')}><div className="source-fixed-table-scroll por-fixed-table-body" role="region" aria-labelledby={captionId} tabIndex={0} style={{maxHeight}}><table className={'por-fixed-table '+(striped?'por-fixed-table-stripes':'')}>{designProfile&&<colgroup>{sourceWidths.map((width,i)=><col key={i} style={{width}}/>)}</colgroup>}<caption id={captionId}>{caption}</caption><thead><tr>{columns.map(column=><th key={column.id} scope="col"><div className="th-inner">{column.label}</div></th>)}</tr></thead><tbody>{rows.map((row,rowIndex)=>row.group?<tr key={row.id} className="por-compute-tr"><th scope="row" colSpan={columns.length}>{row.label}</th></tr>:<tr key={row.id} style={designProfile?{height:sourceHeights[rowIndex]}:undefined}><th scope="row">{row.label}</th>{row.cells.map((cell,i)=><td key={columns[i+1].id}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
