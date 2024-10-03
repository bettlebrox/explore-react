import { Card, CardActionArea, CardHeader, Link, Typography } from '@mui/material';
interface ActionType {
  display: string;
  domain: string;
  queryURL: string;
  prompt: string;
}
const actionTypesMap: Record<string, ActionType> = {
  claude: {
    display: 'Claude',
    domain: 'www.anthropic.com',
    queryURL: 'https://claude.ai/new?q=',
    prompt: 'Ask Claude: ',
  },
  perplexity: {
    display: 'Perplexity',
    domain: 'www.perplexity.ai',
    queryURL: 'https://www.perplexity.ai/search?q=',
    prompt: 'Search Perplexity: ',
  },
  google: {
    display: 'Google',
    domain: 'www.google.com',
    queryURL: 'https://www.google.com/search?q=',
    prompt: 'Google: ',
  },
};

export function ActionItem({ actionName, query }: { actionName: string; query: string }) {
  return (
    <Card className="theme-item" variant="outlined" sx={{ minWidth: 200, display: 'flex' }}>
      <CardActionArea
        component={Link}
        href={actionTypesMap[actionName].queryURL + query}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardHeader
          title={<Typography>{actionTypesMap[actionName].prompt + query}</Typography>}
          align="left"
          avatar={
            <img
              src={'https://logo.clearbit.com/' + actionTypesMap[actionName].domain + '?size=28'}
              alt={actionTypesMap[actionName].display + ' logo'}
            />
          }
        />
      </CardActionArea>
    </Card>
  );
}
