// Every word on the page lives here. Templates only decide layout.

const deployCta = { label: 'Deploy to Azure', disabled: true };

// The seven verbs are the app's own sidebar group titles. The chat types them
// out ("Orchestrating...") while it works; the site reuses that signature.
const verbs = ['Orchestrating', 'Spectating', 'Operating', 'Automating', 'Delegating', 'Facilitating', 'Integrating'];

export const content = {
  site: {
    name: 'Progena AI',
    domain: 'progena.ai',
    url: 'https://progena.ai/',
    title: 'Progena AI · Always Automating your cloud workflows',
    description:
      'Progena AI is an always-on AI agent that automates your cloud workflows. Describe what you need, and it plans, runs, schedules and reports on the work while you stay in control.',
    year: 2026,
  },

  nav: [
    { label: 'Platform', href: '#platform' },
    { label: 'How it works', href: '#how' },
    { label: 'Who it’s for', href: '#who' },
    { label: 'Deploy', href: '#deploy' },
    { label: 'FAQ', href: '#faq' },
  ],

  tagline: { prefix: 'Always', words: verbs, first: 'Automating', suffix: '...' },

  hero: {
    pill: 'Cloud workflow automation · Always on',
    lead:
      'Progena AI automates your cloud workflows. Describe what you need in plain language: it plans the work, runs it on schedule, keeps it running, and shows you every step.',
    primary: deployCta,
    secondary: { label: 'See how it works', href: '#how' },
    note: 'Azure deployment is coming soon. Stay in control of your cloud workflows.',
  },

  demo: {
    nav: [
      { group: 'Orchestrate', items: ['Inbox', 'Chat'], active: 'Chat' },
      { group: 'Spectate', items: ['Dashboard'] },
      { group: 'Operate', items: ['Tasks'] },
      { group: 'Automate', items: ['Workflows', 'Routines'] },
      { group: 'Delegate', items: ['Agents'] },
      { group: 'Facilitate', items: ['Tools', 'Knowledge', 'Schedules'] },
      { group: 'Integrate', items: ['Channels', 'Repositories'] },
    ],
    title: 'Weekday cloud cost digest',
    prompt:
      'Every weekday at 8am, check yesterday’s cloud spend, flag anything unusual, and send me a summary.',
    steps: [
      { label: 'Planned workflow', detail: '4 steps', time: '1.2s' },
      { label: 'Scheduled', detail: 'Weekdays · 08:00', time: '0.3s' },
      { label: 'Delegated to Cost analyst', detail: 'spend review', time: '6.8s' },
      { label: 'Delivered to Inbox', detail: 'Cloud cost digest', time: '0.4s' },
    ],
    reply:
      'Done. Your first digest lands in your Inbox tomorrow at 8:00. If any service jumps more than 20% day on day, I’ll flag it and ask before changing anything.',
    composer: 'What should we automate next?',
  },

  platform: {
    eyebrow: 'The platform',
    title: 'Seven verbs. One agent that never stops.',
    intro:
      'Progena AI is a complete workspace for cloud workflow automation. Everything it does falls under one of seven verbs, and it keeps doing all of them, around the clock.',
    pillars: [
      {
        id: 'orchestrate',
        verb: 'Orchestrate',
        headline: 'One conversation runs your cloud.',
        body:
          'Ask for what you need in plain language. Progena breaks it into steps, coordinates the agents and tools that do them, and delivers the finished result to your inbox, formatted and ready to read.',
        points: ['Plain-language requests, no scripting', 'Polished reports delivered to your inbox', 'Asks you when a decision needs a human'],
        visual: {
          kind: 'orchestrate',
          ask: 'Summarise last night’s deploys and anything that failed.',
          report: {
            title: 'Overnight deploy report',
            meta: 'Inbox · just now',
            rows: [
              { label: 'Deploys', value: '14 succeeded' },
              { label: 'Rolled back', value: '1 · billing-api' },
              { label: 'Action needed', value: 'Approve retry' },
            ],
          },
        },
      },
      {
        id: 'spectate',
        verb: 'Spectate',
        headline: 'Watch every decision as it happens.',
        body:
          'Every step, tool call and result streams live while Progena works. Nothing runs in a black box: inspect any run, see why it took a path, and stop it the moment something looks wrong.',
        points: ['Live, step-by-step activity and reasoning', 'A full history of every run', 'Stop at any time and keep the work so far'],
        visual: {
          kind: 'spectate',
          run: 'Run #2814 · Nightly backup check',
          steps: [
            { label: 'Thinking', detail: 'Which regions changed today?', state: 'done', time: '0.9s' },
            { label: 'Checked backups', detail: '3 regions', state: 'done', time: '2.4s' },
            { label: 'Verified restore', detail: 'eu-west snapshot', state: 'done', time: '11.2s' },
            { label: 'Writing summary', detail: 'streaming', state: 'live', time: '' },
          ],
        },
      },
      {
        id: 'operate',
        verb: 'Operate',
        headline: 'Your backlog keeps moving.',
        body:
          'Work lives on a board you share with Progena. Drop in a task and the workflows you’ve connected pick it up, move it along and report back, so routine operations happen without a hand-off meeting.',
        points: ['A task board you and Progena share', 'Workflows react the moment a card moves', 'Priorities, labels and owners at a glance'],
        visual: {
          kind: 'operate',
          columns: [
            { title: 'To do', cards: [{ title: 'Rotate staging API keys', tag: 'Security' }, { title: 'Clean up unused volumes', tag: 'Cost' }] },
            { title: 'In progress', cards: [{ title: 'Patch base images', tag: 'Progena', live: true }] },
            { title: 'Done', cards: [{ title: 'Review access drift', tag: 'Security' }, { title: 'Renew TLS certificates', tag: 'Ops' }] },
          ],
        },
      },
      {
        id: 'automate',
        verb: 'Automate',
        headline: 'Workflows that never clock off.',
        body:
          'Design a workflow on a visual canvas, or simply describe it. Branch on conditions, run steps in parallel, loop over lists, and put a human approval exactly where it matters. Schedule it once and it runs on time, every time.',
        points: [
          'Visual workflow builder, or describe it in chat',
          'Schedules, triggers, branches and parallel steps',
          'Human approval gates with one-click resume',
          'Retries, timeouts and limits set by policy',
        ],
        visual: { kind: 'automate' },
      },
      {
        id: 'delegate',
        verb: 'Delegate',
        headline: 'A whole team of agents, on demand.',
        body:
          'Progena hands each job to the right specialist: your own custom agents, remote agents on your network, or coding agents like GitHub Copilot. Missing a capability? It builds a new agent or tool and adds it to the team.',
        points: [
          'Create custom agents with their own instructions and tools',
          'Works with the agents you already use, through open standards',
          'Builds new agents and tools when it needs them',
        ],
        visual: {
          kind: 'delegate',
          agents: [
            { name: 'Researcher', role: 'Finds and verifies answers', state: 'Running' },
            { name: 'Code reviewer', role: 'Reviews every pull request', state: 'Ready' },
            { name: 'GitHub Copilot', role: 'Coding agent', state: 'Ready' },
            { name: 'Cost analyst', role: 'New agent', state: 'Building' },
          ],
        },
      },
      {
        id: 'facilitate',
        verb: 'Facilitate',
        headline: 'Knowledge and tools, always at hand.',
        body:
          'Progena keeps a living knowledge base for your team, writing and updating pages as it learns so answers stay current and grounded. Connect the tools you rely on and switch each one on or off in a click.',
        points: [
          'A self-maintaining knowledge base with full version history',
          'Semantic search across everything it knows',
          'Plug in tools and plugins from a marketplace',
        ],
        visual: {
          kind: 'facilitate',
          page: { title: 'Runbook: database failover', meta: 'Version 7 · updated 2h ago by Progena', lines: [92, 78, 85, 60] },
          tools: [
            { name: 'Web search', on: true },
            { name: 'GitHub', on: true },
            { name: 'Cloud console', on: true },
            { name: 'Ticketing', on: false },
          ],
        },
      },
      {
        id: 'integrate',
        verb: 'Integrate',
        headline: 'Works where your team already works.',
        body:
          'Talk to Progena from the apps your team lives in, with every chat and thread keeping its own context. Connect your repositories so it always knows the state of your projects.',
        points: ['Every chat and thread keeps its own history', 'Repositories tracked: branches, changes and recent commits', 'New channels rolling out'],
        visual: {
          kind: 'integrate',
          channels: [
            { name: 'Web app', live: true },
            { name: 'Telegram', live: true },
            { name: 'Git repositories', live: true },
            { name: 'Slack', live: false },
            { name: 'Microsoft Teams', live: false },
            { name: 'Discord', live: false },
            { name: 'WhatsApp', live: false },
            { name: 'Email', live: false },
            { name: 'SMS', live: false },
            { name: 'Webhooks', live: false },
          ],
        },
      },
    ],
  },

  how: {
    eyebrow: 'How it works',
    title: 'Describe it once. It runs from then on.',
    steps: [
      {
        title: 'Describe the outcome',
        body: 'Tell Progena what you want done, in your own words. No scripts, no glue code, no cron files.',
        example: '“Every Monday, review our cloud spend and send the team a summary.”',
      },
      {
        title: 'Progena builds the workflow',
        body: 'It designs the steps, picks the agents and tools, sets the schedule, and lays the plan out on a visual canvas for you to tweak or approve.',
        example: 'Schedule → Analyse spend → Approval → Send summary',
      },
      {
        title: 'It runs. You stay in charge.',
        body: 'The workflow runs on time, every time. Watch it live, approve the decisions that matter, and find the results waiting in your inbox.',
        example: 'Delivered Monday 09:00 · 1 approval requested',
      },
    ],
  },

  audiences: {
    eyebrow: 'Who it’s for',
    title: 'Built for companies. Just as good for one.',
    items: [
      {
        label: 'For companies',
        title: 'Automation your whole team can trust.',
        body: 'Put cloud operations on autopilot without giving up oversight.',
        points: [
          'Approval gates on anything sensitive',
          'A full, inspectable record of every run',
          'Policies for retries, timeouts and concurrency',
          'Runs in your own cloud, so your data stays there',
        ],
      },
      {
        label: 'For individuals',
        title: 'A chief of staff that never sleeps.',
        body: 'Hand off the recurring work and get your evenings back.',
        points: [
          'Reminders and recurring jobs set up in a sentence',
          'Research and daily digests waiting in your inbox',
          'Keeps an eye on your repositories and projects',
          'Runs on a small server or your own machine',
        ],
      },
    ],
  },

  benefits: {
    eyebrow: 'Why Progena',
    title: 'Less busywork. More done.',
    items: [
      { icon: 'clock', title: 'Hours back every week', body: 'Repetitive cloud chores run themselves, so your people work on what moves the business.' },
      { icon: 'pulse', title: 'Nothing slips', body: 'Always on, with every run checkpointed. A restart picks up exactly where it left off.' },
      { icon: 'shield', title: 'You stay in control', body: 'See every step live, approve what matters, and stop anything instantly.' },
      { icon: 'helix', title: 'Grows with you', body: 'It learns your knowledge and builds the new capabilities it needs.' },
      { icon: 'unlock', title: 'Works with your stack', body: 'Open agent standards connect the tools and agents you already rely on.' },
    ],
  },

  selfHost: {
    eyebrow: 'Deploy to Azure',
    title: 'Your cloud. Your data. Your agent.',
    body: 'Bring cloud workflow automation into your Azure environment. A guided deployment is coming soon, with your infrastructure and model keys under your control.',
    previewTitle: 'Azure deployment · coming soon',
    previewSteps: ['Choose your Azure subscription', 'Configure your environment', 'Review and deploy Progena AI'],
    previewNote: 'Deployment is not available yet.',
    points: [
      { title: 'The full platform', body: 'Web app, agent runtime and database in one stack.' },
      { title: 'Your Azure environment', body: 'Planned deployment into your own subscription.' },
      { title: 'Your model keys', body: 'Connect your Azure OpenAI deployment.' },
    ],
    cta: deployCta,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    items: [
      {
        q: 'What is Progena AI?',
        a: 'An always-on AI agent that automates your cloud workflows. You describe what you need; it plans, runs, schedules and reports on the work, and hands parts of it to specialist agents when that helps.',
      },
      {
        q: 'Who is it for?',
        a: 'Companies that want dependable, auditable automation across their cloud operations, and individuals who want a tireless assistant for recurring work.',
      },
      {
        q: 'Do I need to write code?',
        a: 'No. Describe workflows in plain language or build them on the visual canvas. Developers can go further with custom agents and tools.',
      },
      {
        q: 'Where does my data live?',
        a: 'Progena AI stores conversations, workflows, knowledge and run history in its database. The planned Azure deployment will run in your own subscription.',
      },
      {
        q: 'Which AI models does it use?',
        a: 'You bring your own model keys. Progena AI runs on Azure OpenAI today.',
      },
      {
        q: 'Can it work with the agents and tools we already use?',
        a: 'Yes. It speaks open standards (A2A for remote agents, the Agent Client Protocol for coding agents like GitHub Copilot, and MCP for tools), so it slots into what you already have.',
      },
      {
        q: 'What happens when a decision needs a human?',
        a: 'The workflow pauses and asks. Approve or decline from the app or in chat, and it resumes exactly where it stopped.',
      },
      {
        q: 'How much does it cost?',
        a: 'Pricing and deployment details will be shared before launch. Deploy to Azure is coming soon and is not available yet.',
      },
    ],
  },

  finalCta: {
    prefix: 'Start',
    lead: 'Put your cloud workflows on autopilot. Deployment to your Azure environment is coming soon.',
  },

  footer: {
    stats: ['Cloud workflow automation', 'Azure deployment coming soon'],
  },
};
