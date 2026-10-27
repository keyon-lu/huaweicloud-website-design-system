# 九份优先来源的使用

2026-10-17用户提供的九份文件见[导入目录](pixso-priority-import.json)。八份在线文件已确认文档名、入口节点和页面目录；ONLINE-06在线接口持续报Internal server error，先保留PIX-012本地快照。规范正文已进一步核对：8份在线文件的223个公开页面完成规范文字检查，其中181页与本地ID/正文指纹匹配，42页直接读取在线正文，补入2093个此前未展开的实例文字节点；未发现已有节点正文被修改或移除。另3页仍为ONLINE-06本地来源。合计6298条去重规范说明。该检查不证明整份在线文件的样式、图片或字节一致。

## 检索入口

先找内容关系和准确场景，再读取对应页说明，避免一次加载全部原始节点。命令从Skill目录运行：

```text
node scripts/find-pixso-norms.mjs "场景&案例展示" --source ONLINE-01 --details
node scripts/find-pixso-norms.mjs "步骤" --limit 20
node scripts/find-pixso-norms.mjs "26:3660" --source ONLINE-01 --details
node scripts/find-pixso-variants.mjs "基础标签" --property 尺寸=Medium --property 颜色=灰
node scripts/test-pixso-import.mjs
```

`--source`接受ONLINE编号或PIX编号，`--page`接受页ID或精确页名；`--limit`为1～50。按名称匹配返回整页说明，按正文或节点匹配仅返回对应说明。每条说明保留原始节点ID。检索器核验来源包SHA256，检索结果不等于实现完成。实现状态继续查[模式目录](pixso-pattern-catalog.json)、[独立家族](source-family-registry.json)和[发布档案](expanded-release-profile.json)。

## 来源采用与冲突处理

用户要求本批问题集中到构建和验证结束后提交。发现差异时记录文件、节点、场景、相互冲突的数值和影响范围；继续明确分支。待确认的变体不设为默认、不纳入验收通过，也不据此暂停其它组件。已经确认的按钮颜色、浅绿色标签、按原组件保留行高及学习与使用2～4组直接执行，见[采用记录](pixso-design-adoption.md)。

在线MCP可用时，转换前读取目标页的原始文字、布局和截图；遵循Pixso正常设计转代码工具，再将结果转换成语义结构、Token、公开入口、受控数据和响应式实现。生成工具返回的绝对定位代码仅作取证输入，不直接当作已验收楼层。保留原稿只读。

## 发布条件

导入记录、执行规范、运行实现、工程检查、浏览器交互、响应式、视觉和无障碍分别登记。完整发布仍要求24家族及必选楼层的实际证据通过；本批增加规范索引不会自动完成这些检查。原始文本中的按钮蓝色不覆盖用户规则；旧手机16px页边距不覆盖用户最新栅格；不要修改原始记录以掩盖差异。

## 组件状态来源

[组件集目录](pixso-priority/components.json)包含Cloud UI库131个组件集、950个实际直接变体及22个独立组件，按包分块检索。属性轴只描述设计选项，不能按笛卡尔积声称全部组合已存在；选择具体状态时以实际variants节点为准。暗色、国际站等记录只作为来源保留，不改变用户暂缓这些实现的范围。Medium标签22px已按1013:13674接入原型，角标、其它标签、标签组仍需独立建模验收。
