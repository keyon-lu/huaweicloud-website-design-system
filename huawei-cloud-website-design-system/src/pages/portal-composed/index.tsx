import {React,PortalComposedPage} from "portal-components"
const data={scene:"solution" as const,hero:{title:"官网页面示例",description:"内容示例"},sections:[{kind:"text" as const,id:"overview",title:"概览",paragraphs:["请使用经过确认的业务资料替换示例内容。"]}]}
export default function ComposedPage(){return <PortalComposedPage data={data}/>}
