# num3 地理数据

## 全球 DEM

| 项 | 说明 |
| --- | --- |
| 文件 | `dem-global.webp` |
| 类型 | **placeholder**（程序生成，非真实 ETOPO/SRTM） |
| 来源 / 许可 | 由 `scripts/num3/prepare-dem.mjs` 本地生成；无第三方数据，可自由用于本项目 |
| 投影 | 等距圆柱 equirectangular（u=0 → lon −180°，图像上方为北） |
| 分辨率 | 2160 × 1080 |
| 值域映射 | 灰度 0–255 → 海拔 0–8849 m（海平面≈0，珠峰≈255） |

重新生成：

```bash
node scripts/num3/prepare-dem.mjs
```

## 省界 / 山川矢量（Phase 1）

| 文件 | 说明 |
| --- | --- |
| `features.json` | 手工精选河流 / 山脉（≥15 条河 + ≥15 山），含中国与全球主要山川（尼罗、亚马孙、落基、阿尔卑斯、安第斯、密西西比、恒河等）；坐标为示意折线或峰位点；短卡片用 `summary` / `stats`，不依赖 wiki |
| `admin1/_index.json` | 已有省界文件的 ISO 3166-1 numeric 列表（至少含 `"156"`）。`loadAdmin1` / `loadAdmin1Index` 据此跳过无文件国家，避免无效请求 |
| `admin1/156.json` | 中国省级边界（由 [cn-atlas](https://github.com/BarbarossaWang/cn-atlas) / shengshixian 2023 简化）；属性含 `name` / `nameEn` / `id` / `adcode`。重新生成：`node scripts/num3/prepare-china-admin1.mjs` |

无 admin1 的国家（如安道尔 `020`）：`loadAdmin1` 返回 `null`，详图仅国界高亮环 + 山川短卡片，不报错。
