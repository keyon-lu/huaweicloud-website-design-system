const numberFormat=new Intl.NumberFormat('zh-CN',{useGrouping:false,maximumFractionDigits:0});
const dateFormat=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'});
export const formatCount=(value:number)=>numberFormat.format(value);
// Snapshot dates are calendar dates, not timestamps. Preserve YYYY-MM-DD visual form.
export function formatSnapshotDate(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return value;const date=new Date(`${value}T00:00:00+08:00`);if(!Number.isFinite(date.getTime()))return value;const parts=dateFormat.formatToParts(date);const part=(type:string)=>parts.find(p=>p.type===type)?.value??'';return `${part('year')}-${part('month')}-${part('day')}`}
