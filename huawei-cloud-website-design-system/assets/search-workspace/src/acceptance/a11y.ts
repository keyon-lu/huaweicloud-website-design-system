import axe from 'axe-core';
export async function auditAccessibility(root:HTMLElement,label:string){
 await root.ownerDocument.fonts.ready;
 const result=await axe.run(root,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
 const summarize=(items:typeof result.violations)=>items.map(item=>({id:item.id,impact:item.impact,description:item.description,nodes:item.nodes.map(node=>({target:node.target,summary:node.failureSummary}))}));
 const report={label,engine:result.testEngine,at:result.timestamp,scope:'rendered widget WCAG rules only; screen-reader/manual keyboard/usability reviews remain separate',violations:summarize(result.violations),incomplete:summarize(result.incomplete),passedRules:result.passes.map(item=>item.id)};
 const evidence=root.ownerDocument.createElement('script');evidence.type='application/json';evidence.dataset.a11yEvidence=label;evidence.textContent=JSON.stringify(report);root.append(evidence);
 if(report.violations.length)throw Error('Accessibility violations: '+JSON.stringify(report.violations));
 return report;
}
