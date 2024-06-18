import { useState } from "react";
import { DassieItem, Theme } from "../interfaces/Theme";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getFormattedDate } from "../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconThemeTypeMap } from "../utils/map";
import { RelSummary } from "./RelSummary";
import { ThemeGroup } from "./ThemeList";
import { ArticleGroup } from "./ArticleList";

interface ThemeDetail extends Theme {
  related: Article[];
  recurrent: Theme[];
  sporadic: Theme[];
}
interface Article extends DassieItem {
  url: string;
  logged_at: string;
  text: string;
  image: string | null;
  themes: string[];
}
export function ThemeDetail() {
  const [theme] = useState<ThemeDetail>({
    id: "a86b7d0b-e1af-4d0d-8231-e5ea4cb433c3",
    title: "download+and+sync+options",
    original_title: "Download And Sync Options",
    summary:
      "Download and sync options are available for various platforms and devices.",
    created_at: "2024-06-17T14:21:22.330206",
    updated_at: "2024-06-17T14:21:22.330241",
    source: "top",
    related: [
      {
        id: "20976471-7135-4797-b35c-6e9819fbf068",
        title: "Download+-+Obsidian",
        original_title: "Download - Obsidian",
        summary:
          "Download the latest version of Obsidian for various platforms including macOS, iOS, Android, Windows, Linux, and more. Explore pricing options and join the Obsidian community for support and updates.",
        created_at: "2024-06-06T15:43:48.720906",
        url: "https://obsidian.md/download",
        logged_at: "2024-04-17T09:04:20.125141",
        updated_at: "2024-06-06T15:43:48.720942",
        text: "Download\nPricing\nSync\nPublish\nCommunity Account\nDownload for macOS\nLast updated March\u00a031,\u00a02024\nMore platforms\niOS\nApp Store\nAndroid\nGoogle Play\nAPK\nWindows\nStandard\n(64-bit)\nARM\n(64-bit)\nLegacy\n(32-bit)\nMac\nUniversal (Apple Silicon and\u00a0Intel)\nLinux\nAppImage\nSnap\nDeb\nAppImage\n(AArch64/ARM64)\nFlatpak (Community\u00a0maintained)\nGet started\nDownload\nPricing\nAccount\nObsidian\nOverview\nSync\nPublish\nCanvas\nMobile\nPlugins\nLearn\nHelp\nDevelopers\nChangelog\nAbout\nRoadmap\nBlog\nLegal\nLicense overview\nTerms of service\nPrivacy / Security\nCommunity\nJoin the community\nBrand guidelines\nMerch store\nDiscord\nForum / \u4e2d\u6587\u8bba\u575b\nFollow us\nTwitter\nMastodon\nYouTube\nGitHub\n\u00a9 2024 Obsidian",
        source: "0ce88eaf81c54e498ff5c1946ec183c6",
        image: null,
        themes: [
          "Community Features",
          "Software Download",
          "Pricing Options",
          "Download And Sync Options",
        ],
      },
    ],
    recurrent: [
      {
        id: "e6409a0f-f8f3-4e5e-8b62-a6e5bda39c71",
        title: "syncing+data+across+devices",
        original_title: "Syncing Data Across Devices",
        summary: "Similar to download+and+sync+options",
        created_at: "2024-06-17T14:21:22.330206",
        updated_at: "2024-06-17T14:21:22.330241",
        source: "recurrent",
      },
      {
        id: "4afd0812-431b-489e-8052-2e3c096a1224",
        title: "download+options+for+multiple+platforms",
        original_title: "Download Options For Multiple Platforms",
        summary: "Similar to download+and+sync+options",
        created_at: "2024-06-17T14:21:22.330206",
        updated_at: "2024-06-17T14:21:22.330241",
        source: "recurrent",
      },
    ],
    sporadic: [
      {
        id: "4f1fe060-baef-400c-b343-eae0a1ea0a22",
        title: "availability+of+platforms+or+devices",
        original_title: "Availability Of Platforms Or Devices",
        summary: "Dissimilar to download+and+sync+options",
        created_at: "2024-06-17T14:21:22.330206",
        updated_at: "2024-06-17T14:21:22.330241",
        source: "sporadic",
      },
    ],
  });
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h5">
                {theme.original_title}
                </Typography>
            }
              align="left"
              subheader={
                <>
                  <div>{getFormattedDate(theme.updated_at)}</div>
                  <RelSummary count={theme.related.length} type="related" />
                  <RelSummary count={theme.recurrent.length} type="recurrent" />
                  <RelSummary count={theme.sporadic.length} type="sporadic" />
                </>
              }
              avatar={
                <IconButton>
                  <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
                </IconButton>
              }
            >
              <RelSummary count={theme.related.length} type="related" />
            </CardHeader>
            <CardContent>
              <Typography variant="body2" align="left">
                {theme.summary}
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid item={true} xs={6}>
          <Card>
            <CardContent>
              <ThemeGroup  themes={theme.recurrent} title="Agreements"></ThemeGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} xs={6}>
          <Card>
            <CardContent>
              <ThemeGroup  themes={theme.sporadic} title="Disagreements"></ThemeGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} xs={12}>
            <Card>
                <CardContent>
                    <ArticleGroup articles={theme.related} title={"Related Articles"} expanded></ArticleGroup>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </>
  );
}
