# PortalAsset source dependency

模板公开入口@/components/portal-asset用于步骤楼层登记的四个数字与箭头SVG；只解析包内五个Asset ID，不接受网络src。它不计为新增基础家族。它替换步骤组件内私有平行图像函数，使组合使用公开依赖。Props为assetId、alt与可选className；装饰图传空alt，布局归宿主。原始素材来源与SHA在process-steps-source中记录。离线HTML继续使用既有公开PortalAsset及完整Asset注册表。
